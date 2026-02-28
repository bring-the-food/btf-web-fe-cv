/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from "react";

interface Transaction {
  id: string;
  type: "payment" | "deposit" | "withdrawal";
  payment?: {
    status: "success" | "pending" | "failed";
  };
  summary: {
    bill: {
      amount: number;
    };
  };
}

interface WebSocketMessage {
  type: string;
  data?: any;
}

const SOCKET_URLS = {
  development: "wss://test-socket.bringthisfood.com",
  production: "wss://socket.bringthisfood.com",
};

const HEARTBEAT_INTERVAL = 9 * 60 * 1000; // 9 minutes (documentation recommends < 10 minutes)
const INITIAL_RECONNECT_DELAY = 1000;
const MAX_RECONNECT_DELAY = 30000;

export const usePaymentListener = (
  accessToken: string | null,
  onSuccess: () => void,
  onUpdate?: (transaction: Transaction) => void,
) => {
  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const heartbeatIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectDelayRef = useRef(INITIAL_RECONNECT_DELAY);

  // Stabilize props with refs
  const tokenRef = useRef(accessToken);
  const onSuccessRef = useRef(onSuccess);
  const onUpdateRef = useRef(onUpdate);
  const manualCloseRef = useRef(false);
  const processedTransactions = useRef<Set<string>>(new Set());

  const [isConnected, setIsConnected] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<
    "connecting" | "connected" | "disconnected" | "error"
  >("disconnected");
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Keep refs in sync
  useEffect(() => {
    onSuccessRef.current = onSuccess;
    onUpdateRef.current = onUpdate;
  }, [onSuccess, onUpdate]);

  const startHeartbeat = useCallback(() => {
    if (heartbeatIntervalRef.current)
      clearInterval(heartbeatIntervalRef.current);

    heartbeatIntervalRef.current = setInterval(() => {
      if (ws.current?.readyState === WebSocket.OPEN) {
        console.log("💓 [WS] Sending heartbeat ping...");
        ws.current.send(JSON.stringify({ action: "ping" }));
      }
    }, HEARTBEAT_INTERVAL);
  }, []);

  const stopHeartbeat = useCallback(() => {
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current);
      heartbeatIntervalRef.current = null;
    }
  }, []);

  const connectWebSocket = useCallback(() => {
    const token = tokenRef.current;
    if (!token) {
      console.log("❌ No access token available for WebSocket");
      return;
    }

    // Avoid multiple connections
    if (
      ws.current &&
      (ws.current.readyState === WebSocket.OPEN ||
        ws.current.readyState === WebSocket.CONNECTING)
    ) {
      return;
    }

    manualCloseRef.current = false;
    const socketUrl =
      process.env.NEXT_PUBLIC_SOCKET_URL ||
      (process.env.NODE_ENV === "production"
        ? SOCKET_URLS.production
        : SOCKET_URLS.development);

    console.log("🚀 [WS] Connecting to:", socketUrl);
    setConnectionStatus("connecting");

    const socket = new WebSocket(socketUrl);
    ws.current = socket;

    socket.onopen = () => {
      console.log("✅ [WS] Connected");
      setIsConnected(true);
      setConnectionStatus("connected");
      reconnectDelayRef.current = INITIAL_RECONNECT_DELAY;

      // Perform handshake
      const authMessage = {
        action: "authenticate",
        "x-platform-client-type": "web",
        token,
      };

      console.log("🔐 [WS] Sending handshake...");
      socket.send(JSON.stringify(authMessage));
      startHeartbeat();
    };

    socket.onmessage = (event) => {
      try {
        const message: WebSocketMessage = JSON.parse(event.data);
        console.log(`📩 Received [${message.type}]:`, message.data);

        switch (message.type) {
          case "authenticate":
            if (message.data) {
              setIsAuthenticated(true);
              console.log("🔑 [WS] Auth Success");
            } else {
              console.error("❌ [WS] Auth Fail");
              setError("Authentication failed");
            }
            break;

          case "transaction.update":
            if (message.data?.transaction) {
              const tx = message.data.transaction;
              setTransaction(tx);
              onUpdateRef.current?.(tx);
              if (
                tx.payment?.status === "success" &&
                !processedTransactions.current.has(tx.id)
              ) {
                processedTransactions.current.add(tx.id);
                onSuccessRef.current();
              }
            }
            break;

          case "error":
            console.error("⚠️ [WS] Server Error:", message.data);
            setError(message.data?.message || "WebSocket error");
            break;

          case "pong":
            console.log("💓 [WS] Pong received");
            break;

          default:
            // Silence unknown messages or log for debugging
            break;
        }
      } catch (err) {
        console.error("❌ Failed to parse WebSocket message:", err);
      }
    };

    socket.onerror = (err) => {
      console.error("❌ WebSocket error:", err);
      setConnectionStatus("error");
    };

    socket.onclose = (event) => {
      console.log("🔴 [WS] Closed:", event.code, event.reason);
      setIsConnected(false);
      setIsAuthenticated(false);
      setConnectionStatus("disconnected");
      stopHeartbeat();

      // Only reconnect if it wasn't a manual close and we have a token
      if (!manualCloseRef.current && tokenRef.current) {
        console.log(
          `🔄 [WS] Reconnecting in ${reconnectDelayRef.current}ms...`,
        );
        if (reconnectTimeoutRef.current)
          clearTimeout(reconnectTimeoutRef.current);

        reconnectTimeoutRef.current = setTimeout(() => {
          reconnectDelayRef.current = Math.min(
            reconnectDelayRef.current * 2,
            MAX_RECONNECT_DELAY,
          );
          connectWebSocket();
        }, reconnectDelayRef.current);
      }
    };
  }, [startHeartbeat, stopHeartbeat]);

  const disconnectWebSocket = useCallback(() => {
    console.log("🛑 [WS] Disconnecting...");
    manualCloseRef.current = true;

    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    stopHeartbeat();

    if (ws.current) {
      ws.current.close(1000, "Manual disconnect");
      ws.current = null;
    }
  }, [stopHeartbeat]);

  // Handle accessToken lifecycle
  useEffect(() => {
    // If token cleared, disconnect
    if (!accessToken) {
      disconnectWebSocket();
      tokenRef.current = null;
      return;
    }

    // If token actually changed, disconnect and reconnect
    if (accessToken !== tokenRef.current) {
      console.log("🎫 [WS] Token changed, re-initializing...");
      disconnectWebSocket();
      tokenRef.current = accessToken;
      // Small delay to allow cleanup before new connection
      const t = setTimeout(() => connectWebSocket(), 300);
      return () => clearTimeout(t);
    }

    // First time connect if token exists
    if (!ws.current && accessToken) {
      connectWebSocket();
    }
  }, [accessToken, connectWebSocket, disconnectWebSocket]);

  // Final cleanup on unmount
  useEffect(() => {
    return () => disconnectWebSocket();
  }, [disconnectWebSocket]);

  const reconnect = useCallback(() => {
    disconnectWebSocket();
    reconnectDelayRef.current = INITIAL_RECONNECT_DELAY;
    setTimeout(connectWebSocket, 100);
  }, [connectWebSocket, disconnectWebSocket]);

  return {
    isConnected,
    isAuthenticated,
    connectionStatus,
    transaction,
    error,
    reconnect,
    disconnect: disconnectWebSocket,
  };
};

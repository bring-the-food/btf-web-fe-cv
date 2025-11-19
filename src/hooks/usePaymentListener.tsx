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

export const usePaymentListener = (
  accessToken: string | null,
  onSuccess: () => void
) => {
  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);
  const tokenRef = useRef(accessToken);

  const [isConnected, setIsConnected] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<
    "connecting" | "connected" | "disconnected" | "error"
  >("disconnected");
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Keep token updated without rebuilding callbacks
  useEffect(() => {
    tokenRef.current = accessToken;
  }, [accessToken]);

  const connectWebSocket = useCallback(() => {
    const token = tokenRef.current;
    if (!token) {
      console.log("❌ No access token available");
      return;
    }

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      console.log("⚡ WebSocket already connected");
      return;
    }

    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL as string;

    console.log("🚀 Starting WebSocket connection to:", socketUrl);
    setConnectionStatus("connecting");
    setError(null);

    const socket = new WebSocket(socketUrl);
    ws.current = socket;

    socket.onopen = () => {
      console.log("✅ WebSocket connected");
      setIsConnected(true);
      setConnectionStatus("connected");

      const authMessage = {
        action: "authenticate",
        token,
      };
      console.log("🔐 Sending authentication...");
      socket.send(JSON.stringify(authMessage));
    };

    socket.onmessage = (event) => {
      try {
        const message: WebSocketMessage = JSON.parse(event.data);

        switch (message.type) {
          case "authenticate":
            console.log("🔑 Auth response received");
            if (message.data) {
              setIsAuthenticated(true);
              console.log("✅ Auth success");
            } else {
              console.log("❌ Auth failed");
              setError("Authentication failed");
            }
            break;

          case "transaction.update":
            console.log("💰 Transaction update:", message.data);
            if (message.data?.transaction) {
              const tx = message.data.transaction;
              setTransaction(tx);

              // Respecting user's request to keep this exact condition
              if (tx.payment?.status === "success") {
                onSuccess();
              }
            }
            break;

          case "error":
            console.error("⚠️ WS Error:", message.data);
            setError(message.data?.message || "WebSocket error");
            break;

          default:
            console.log("📨 Unknown message type:", message.type);
        }
      } catch (err) {
        console.error("❌ Failed to parse message:", err);
        setError("Failed to parse WebSocket message");
      }
    };

    socket.onerror = (err) => {
      console.error("❌ WebSocket error:", err);
      setConnectionStatus("error");
      // setError("WebSocket connection error");
    };

    socket.onclose = (event) => {
      console.log("🔴 WebSocket closed:", event.code, event.reason);

      setIsConnected(false);
      setIsAuthenticated(false);
      setConnectionStatus("disconnected");

      // Auto-reconnect unless clean (1000)
      if (event.code !== 1000) {
        console.log("🔄 Scheduling reconnect...");
        // setError("Connection lost. Reconnecting...");

        reconnectTimeout.current = setTimeout(() => {
          connectWebSocket(); // stable reference
        }, 3000);
      }
    };
  }, []);

  const disconnectWebSocket = useCallback(() => {
    console.log("🛑 Disconnect requested");

    if (reconnectTimeout.current) {
      clearTimeout(reconnectTimeout.current);
    }

    if (ws.current) {
      ws.current.close(1000, "Manual disconnect");
      ws.current = null;
    }
  }, []);

  // Run only once on mount
  useEffect(() => {
    connectWebSocket();
    return () => disconnectWebSocket();
  }, [connectWebSocket, disconnectWebSocket]);

  const reconnect = useCallback(() => {
    console.log("🔄 Manual reconnect");
    disconnectWebSocket();
    setError(null);
    setTransaction(null);
    setTimeout(() => connectWebSocket(), 150);
  }, [disconnectWebSocket, connectWebSocket]);

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

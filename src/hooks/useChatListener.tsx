/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from "react";

interface WebSocketMessage {
  type: string;
  data?: any;
}

const SOCKET_URLS = {
  development: "wss://test-socket.bringthisfood.com",
  production: "wss://socket.bringthisfood.com",
};

const HEARTBEAT_INTERVAL = 9 * 60 * 1000;
const INITIAL_RECONNECT_DELAY = 1000;
const MAX_RECONNECT_DELAY = 30000;

export const useChatListener = (accessToken: string | null) => {
  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const heartbeatIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectDelayRef = useRef(INITIAL_RECONNECT_DELAY);
  const manualCloseRef = useRef(false);

  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [latestData, setLatestData] = useState<any>(null);

  const startHeartbeat = useCallback(() => {
    if (heartbeatIntervalRef.current)
      clearInterval(heartbeatIntervalRef.current);

    heartbeatIntervalRef.current = setInterval(() => {
      if (ws.current?.readyState === WebSocket.OPEN) {
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
    if (!accessToken) return;

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

    const socket = new WebSocket(socketUrl);
    ws.current = socket;

    socket.onopen = () => {
      reconnectDelayRef.current = INITIAL_RECONNECT_DELAY;

      const authMessage = {
        action: "authenticate",
        "x-platform-client-type": "web",
        token: accessToken,
      };

      socket.send(JSON.stringify(authMessage));
      startHeartbeat();
    };

    socket.onmessage = (event) => {
      try {
        const message: WebSocketMessage = JSON.parse(event.data);
        if (message.type === "chat.message.new") {
          setHasNewMessage(true);
          setLatestData(message.data);
        }
      } catch (err) {
        console.error("❌ Failed to parse WebSocket message:", err);
      }
    };

    socket.onclose = () => {
      stopHeartbeat();
      if (!manualCloseRef.current && accessToken) {
        if (reconnectTimeoutRef.current)
          clearTimeout(reconnectTimeoutRef.current);

        reconnectTimeoutRef.current = setTimeout(() => {
          reconnectDelayRef.current = Math.min(
            reconnectDelayRef.current * 2,
            MAX_RECONNECT_DELAY
          );
          connectWebSocket();
        }, reconnectDelayRef.current);
      }
    };
  }, [accessToken, startHeartbeat, stopHeartbeat]);

  const disconnectWebSocket = useCallback(() => {
    manualCloseRef.current = true;
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    stopHeartbeat();
    if (ws.current) {
      ws.current.close();
      ws.current = null;
    }
  }, [stopHeartbeat]);

  useEffect(() => {
    if (accessToken) {
      connectWebSocket();
    } else {
      disconnectWebSocket();
    }
    return () => disconnectWebSocket();
  }, [accessToken, connectWebSocket, disconnectWebSocket]);

  return {
    hasNewMessage,
    setHasNewMessage,
    latestData,
  };
};

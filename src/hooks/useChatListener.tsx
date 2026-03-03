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

/** Request notification permission once on first call */
function requestNotificationPermission() {
  if (typeof window === "undefined") return;
  if (!("Notification" in window)) return;
  if (Notification.permission === "default") {
    Notification.requestPermission();
  }
}

/**
 * Show a native browser notification and focus the tab when clicked.
 * Only fires when the tab is hidden so we don't double-alert visible users.
 */
function showBrowserNotification(title: string, body: string) {
  if (typeof window === "undefined") return;
  if (!("Notification" in window)) return;
  if (Notification.permission !== "granted") return;
  if (document.visibilityState === "visible") return;

  const notification = new Notification(title, {
    body,
    icon: "/svg/logo.svg",
    badge: "/svg/logo.svg",
    tag: "btf-chat-message", // replaces previous notification with same tag
  });

  notification.onclick = () => {
    window.focus();
    notification.close();
  };
}

let titleBlinkInterval: ReturnType<typeof setInterval> | null = null;

/** Blink the browser tab title as a fallback when notifications are blocked */
function startTitleBlink() {
  if (typeof window === "undefined") return;
  if (document.visibilityState === "visible") return;
  if (titleBlinkInterval) return; // already blinking

  const originalTitle = document.title;
  let toggle = false;

  titleBlinkInterval = setInterval(() => {
    document.title = toggle ? "🔔 New message!" : originalTitle;
    toggle = !toggle;
  }, 1000);

  // Stop blinking when user comes back to the tab
  const stopOnFocus = () => {
    if (titleBlinkInterval) {
      clearInterval(titleBlinkInterval);
      titleBlinkInterval = null;
    }
    document.title = originalTitle;
    document.removeEventListener("visibilitychange", stopOnFocus);
  };

  document.addEventListener("visibilitychange", stopOnFocus);
}

export const useChatListener = (accessToken: string | null) => {
  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const heartbeatIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectDelayRef = useRef(INITIAL_RECONNECT_DELAY);
  const manualCloseRef = useRef(false);

  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [latestData, setLatestData] = useState<any>(null);

  // Ask notification permission as soon as the hook mounts
  useEffect(() => {
    requestNotificationPermission();
  }, []);

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

          // Fire a native OS notification when the tab is in the background
          const storeName =
            message.data?.chat?.vendor?.store?.name ?? "the vendor";
          showBrowserNotification(
            "New message from " + storeName,
            "You have a new message. Tap to view.",
          );
          // Fallback: blink the tab title if notifications are not permitted
          startTitleBlink();
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
            MAX_RECONNECT_DELAY,
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

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && accessToken) {
        // Reconnect if the socket closed while the tab was hidden
        if (
          !ws.current ||
          ws.current.readyState === WebSocket.CLOSED ||
          ws.current.readyState === WebSocket.CLOSING
        ) {
          connectWebSocket();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      disconnectWebSocket();
    };
  }, [accessToken, connectWebSocket, disconnectWebSocket]);

  return {
    hasNewMessage,
    setHasNewMessage,
    latestData,
  };
};

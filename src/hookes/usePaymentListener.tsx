/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from "react";

interface Transaction {
  id: string;
  status: "success" | "pending" | "failed";
  amount: number;
  type: "payment" | "deposit" | "withdrawal";
  // other transaction properties
}

interface WebSocketMessage {
  type: string;
  data?: any;
}

export const usePaymentListener = (
  accessToken: string | null,
  onSuccess: () => void
) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<
    "connecting" | "connected" | "disconnected" | "error"
  >("disconnected");
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [error, setError] = useState<string | null>(null);

  const ws = useRef<WebSocket | null>(null);

  const connectWebSocket = useCallback(() => {
    if (!accessToken) {
      console.log("❌ No access token provided");
      return;
    }

    if (ws.current?.readyState === WebSocket.OPEN) {
      console.log("✅ WebSocket already connected");
      return;
    }

    setError(null);
    setTransaction(null);

    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL as string;

    console.log("🚀 Connecting to WebSocket...", socketUrl);
    setConnectionStatus("connecting");

    try {
      ws.current = new WebSocket(socketUrl);

      ws.current.onopen = () => {
        console.log("✅ WebSocket connected successfully");
        setIsConnected(true);
        setConnectionStatus("connected");
        setError(null);

        // Send authentication immediately after connection
        console.log("🔐 Sending authentication...");
        const authMessage = {
          action: "authenticate",
          token: accessToken,
        };
        ws.current?.send(JSON.stringify(authMessage));
        console.log("📤 Authentication message sent");
      };

      ws.current.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          console.log(
            "📨 Received message type:",
            message.type,
            "data:",
            message.data
          );

          switch (message.type) {
            case "authenticate":
              console.log("🔑 Authentication response received");
              if (message.data) {
                setIsAuthenticated(true);
                console.log("✅ WebSocket authenticated successfully");
              } else {
                console.error("❌ WebSocket authentication failed");
                setError("Authentication failed");
              }
              break;

            case "transaction.update":
              console.log("💰 Transaction update received");
              if (message.data?.transaction) {
                const transaction = message.data.transaction;
                setTransaction(transaction);
                console.log("💾 Transaction data stored:", transaction);

                // Check if this is a successful payment transaction
                if (
                  transaction.status === "success" &&
                  (transaction.type === "payment" ||
                    transaction.type === "deposit")
                ) {
                  onPaymentSuccess(transaction);
                }
              }
              break;

            case "error":
              console.error("❌ WebSocket error message:", message);
              setError(message.data?.message || "WebSocket error occurred");
              break;

            default:
              console.log("📨 Received message type:", message.type);
          }
        } catch (error) {
          console.error(
            "❌ Error parsing WebSocket message:",
            error,
            event.data
          );
          setError("Failed to parse WebSocket message");
        }
      };

      ws.current.onerror = (error) => {
        console.error("❌ WebSocket error:", error);
        setConnectionStatus("error");
        setError("WebSocket connection error");
      };

      ws.current.onclose = (event) => {
        console.log("🔴 WebSocket closed:", event.code, event.reason);
        setIsConnected(false);
        setIsAuthenticated(false);
        setConnectionStatus("disconnected");

        // Auto-reconnect after delay if not closed normally
        if (event.code !== 1000) {
          setError("Connection lost. Reconnecting...");
          setTimeout(() => {
            console.log("🔄 Attempting to reconnect...");
            connectWebSocket();
          }, 3000);
        }
      };
    } catch (error) {
      console.error("❌ Error creating WebSocket:", error);
      setConnectionStatus("error");
      setError("Failed to create WebSocket connection");
    }
  }, [accessToken]);

  const disconnectWebSocket = useCallback(() => {
    if (ws.current) {
      console.log("🛑 Disconnecting WebSocket...");
      ws.current.close(1000, "Manual disconnect");
      ws.current = null;
    }
  }, []);

  const onPaymentSuccess = (transaction: Transaction) => {
    // Implement your success page logic here
    console.log("Show success page for transaction:", transaction);

    onSuccess();
  };

  // Connect when accessToken is available
  useEffect(() => {
    if (accessToken) {
      connectWebSocket();
    }

    return () => {
      disconnectWebSocket();
    };
  }, [accessToken, connectWebSocket, disconnectWebSocket]);

  // Manual reconnect function
  const reconnect = useCallback(() => {
    disconnectWebSocket();
    setError(null);
    setTransaction(null);
    setTimeout(() => connectWebSocket(), 100);
  }, [connectWebSocket, disconnectWebSocket]);

  return {
    isConnected,
    isAuthenticated,
    connectionStatus,
    reconnect,
    disconnect: disconnectWebSocket,
    transaction,
    error,
  };
};

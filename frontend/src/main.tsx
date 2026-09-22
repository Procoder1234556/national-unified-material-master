import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class RootErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("NUMM Uncaught UI Exception:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            backgroundColor: "#F5F5F5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            fontFamily: "Inter, -apple-system, sans-serif",
          }}
        >
          <div
            style={{
              maxWidth: "600px",
              width: "100%",
              backgroundColor: "#FFFFFF",
              borderRadius: "12px",
              padding: "32px",
              border: "1px solid #E2E8F0",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.08)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  backgroundColor: "#9B121E",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "18px",
                }}
              >
                !
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#0F172A" }}>
                  NUMM Platform Error Encountered
                </h2>
                <span style={{ fontSize: "12px", color: "#64748B" }}>
                  Deterministic Safety & Runtime Catch
                </span>
              </div>
            </div>

            <p style={{ fontSize: "14px", color: "#334155", lineHeight: "1.5", marginBottom: "16px" }}>
              An unexpected client error occurred while rendering the workspace:
            </p>

            <pre
              style={{
                backgroundColor: "#F8FAFC",
                border: "1px solid #E2E8F0",
                borderRadius: "6px",
                padding: "12px",
                fontSize: "12px",
                fontFamily: "JetBrains Mono, monospace",
                color: "#9B121E",
                overflowX: "auto",
                whiteSpace: "pre-wrap",
                marginBottom: "20px",
              }}
            >
              {this.state.error?.toString()}
            </pre>

            <button
              onClick={() => window.location.reload()}
              style={{
                backgroundColor: "#E94344",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "6px",
                padding: "10px 18px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Reload Platform
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>
  </React.StrictMode>
);

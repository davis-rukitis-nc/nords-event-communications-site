"use client"

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div style={{ maxWidth: "600px", textAlign: "center" }}>
            <h1 style={{ fontSize: "48px", fontWeight: "bold", marginBottom: "16px" }}>Application Error</h1>
            <p style={{ fontSize: "18px", marginBottom: "24px", color: "#666" }}>
              A critical error occurred. Please try refreshing the page.
            </p>
            <button
              onClick={reset}
              style={{
                padding: "12px 24px",
                fontSize: "16px",
                background: "#000",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}

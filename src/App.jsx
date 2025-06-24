"use client"

import { useState } from "react"

function App() {
  const [options, setOptions] = useState([])
  const [input, setInput] = useState("")
  const [selected, setSelected] = useState(null)
  const [spinning, setSpinning] = useState(false)
  const [highlightIdx, setHighlightIdx] = useState(null)

  const handleAddOption = () => {
    // Split input by numbered list or line breaks
    const items = input
      .split(/\d+\.\s*|\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean)

    // Filter out duplicates and already existing options
    const newOptions = items.filter((opt) => opt && !options.includes(opt))

    if (newOptions.length > 0) {
      setOptions([...options, ...newOptions])
      setInput("")
    }
  }

  const handleSpin = () => {
    if (options.length > 0) {
      setSpinning(true)
      setSelected(null)
      let steps = Math.floor(Math.random() * 10) + options.length * 2 + 5 // random steps for animation
      let idx = 0
      setHighlightIdx(0)

      const interval = setInterval(() => {
        idx = (idx + 1) % options.length
        setHighlightIdx(idx)
        steps--
        if (steps <= 0) {
          clearInterval(interval)
          setTimeout(() => {
            setSelected(options[idx])
            setSpinning(false)
            setHighlightIdx(null)
            // Remove selected option from options
            setOptions((prev) => prev.filter((_, i) => i !== idx))
          }, 300)
        }
      }, 100)
    }
  }

  // Animation keyframes
  const spinAnimation = {
    animation: spinning ? "spin 1s linear infinite" : "none",
  }

  const pulseAnimation = {
    animation: spinning ? "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" : "none",
  }

  const bounceAnimation = {
    animation: selected && !spinning ? "bounce 1s ease-in-out" : "none",
  }

  const scaleHover = {
    transition: "all 0.2s ease-in-out",
    cursor: "pointer",
  }

  return (
    <>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
            transform: translate3d(0, 0, 0);
          }
          40%, 43% {
            animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
            transform: translate3d(0, -30px, 0);
          }
          70% {
            animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
            transform: translate3d(0, -15px, 0);
          }
          90% {
            transform: translate3d(0, -4px, 0);
          }
        }
        
        @keyframes glow {
          0% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.6); }
          100% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.5); }
        }
        
        .hover-scale:hover {
          transform: scale(1.05);
        }
        
        .hover-scale:active {
          transform: scale(0.95);
        }
        
        .glow-effect {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>

      <div
        style={{
          width: "80vw",
          height: "70vw",
          minHeight: "100vh",
          minWidth: "100vw",
          overflowX: "hidden",
          background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 50%, #ddd6fe 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          margin: 0,
          fontFamily: "system-ui, -apple-system, sans-serif",
          boxSizing: "border-box"
        }}
      >
        <div style={{
          width: "100%",
          maxWidth: "1024px",
          height: "100%",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <h1
              style={{
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: "bold",
                background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: "8px",
                margin: 0,
              }}
            >
              Random Line Spinner
            </h1>
            <p style={{ color: "#64748b", fontSize: "18px", margin: 0 }}>Add your options and let fate decide!</p>
          </div>

          {/* Input Section */}
          <div
            style={{
              background: "white",
              borderRadius: "16px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              padding: "24px",
              marginBottom: "32px",
              border: "1px solid #e2e8f0",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter options as a numbered list or line by line..."
                rows={4}
                style={{
                  width: "100%",
                  resize: "none",
                  borderRadius: "12px",
                  border: "2px solid #e2e8f0",
                  padding: "16px",
                  color: "#374151",
                  backgroundColor: "#f8fafc",
                  outline: "none",
                  fontSize: "16px",
                  fontFamily: "inherit",
                  transition: "all 0.2s ease-in-out",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#3b82f6"
                  e.target.style.backgroundColor = "white"
                  e.target.style.boxShadow = "0 0 0 4px rgba(59, 130, 246, 0.1)"
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e2e8f0"
                  e.target.style.backgroundColor = "#f8fafc"
                  e.target.style.boxShadow = "none"
                }}
              />
              <button
                onClick={handleAddOption}
                disabled={spinning || !input.trim()}
                className="hover-scale"
                style={{
                  width: "fit-content",
                  padding: "12px 32px",
                  background:
                    options.length === 0 || spinning || !input.trim()
                      ? "linear-gradient(to right, #cbd5e1, #94a3b8)"
                      : "linear-gradient(to right, #3b82f6, #8b5cf6)",
                  color: "white",
                  fontWeight: "600",
                  borderRadius: "12px",
                  border: "none",
                  cursor: spinning || !input.trim() ? "not-allowed" : "pointer",
                  boxShadow: spinning || !input.trim() ? "none" : "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
                  transition: "all 0.2s ease-in-out",
                  fontSize: "16px",
                }}
              >
                Add Options
              </button>
            </div>
          </div>

          {/* Options Display */}
          <div
            style={{
              background: "white",
              borderRadius: "16px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              padding: "24px",
              marginBottom: "32px",
              border: "1px solid #e2e8f0",
              minHeight: "200px",
              width: "100%",
              maxWidth: "100%",
              boxSizing: "border-box"
            }}
          >
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "16px",
                textAlign: "center",
                margin: "0 0 16px 0",
              }}
            >
              {options.length === 0
                ? "Your Options"
                : `${options.length} Option${options.length !== 1 ? "s" : ""} Ready`}
            </h3>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "120px",
                width: "100%",
                maxWidth: "100%",
                boxSizing: "border-box"
              }}
            >
              {options.length === 0 ? (
                <div style={{ textAlign: "center", padding: "32px 0" }}>
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      margin: "0 auto 16px",
                      background: "#f1f5f9",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      style={{ width: "32px", height: "32px", color: "#94a3b8" }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                  <p style={{ color: "#64748b", fontSize: "18px", margin: 0 }}>Add some options to get started</p>
                </div>
              ) : (
                options.map((opt, i) => (
                  <div
                    key={opt}
                    className={highlightIdx === i ? "glow-effect" : ""}
                    style={{
                      padding: "12px 24px",
                      borderRadius: "25px",
                      fontWeight: "500",
                      textAlign: "center",
                      transition: "all 0.2s ease-in-out",
                      transform: highlightIdx === i ? "scale(1.1)" : selected === opt ? "scale(1.05)" : "scale(1)",
                      background:
                        highlightIdx === i
                          ? "linear-gradient(to right, #3b82f6, #8b5cf6)"
                          : selected === opt
                            ? "linear-gradient(to right, #10b981, #059669)"
                            : "#f1f5f9",
                      color: highlightIdx === i || selected === opt ? "white" : "#374151",
                      cursor: "pointer",
                      userSelect: "none",
                      border: "2px solid",
                      borderColor: highlightIdx === i ? "#60a5fa" : "transparent",
                      boxShadow:
                        highlightIdx === i
                          ? "0 20px 25px -5px rgba(59, 130, 246, 0.4)"
                          : selected === opt
                            ? "0 10px 15px -3px rgba(16, 185, 129, 0.4)"
                            : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      fontSize: "16px",
                    }}
                    onMouseEnter={(e) => {
                      if (highlightIdx !== i && selected !== opt) {
                        e.target.style.backgroundColor = "#e2e8f0"
                        e.target.style.transform = "scale(1.05)"
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (highlightIdx !== i && selected !== opt) {
                        e.target.style.backgroundColor = "#f1f5f9"
                        e.target.style.transform = "scale(1)"
                      }
                    }}
                  >
                    {opt}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Spin Button */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <button
              onClick={handleSpin}
              disabled={options.length === 0 || spinning}
              className="hover-scale"
              style={{
                padding: "16px 48px",
                fontSize: "20px",
                fontWeight: "bold",
                borderRadius: "16px",
                border: "none",
                cursor: options.length === 0 || spinning ? "not-allowed" : "pointer",
                background:
                  options.length === 0 || spinning
                    ? "linear-gradient(to right, #cbd5e1, #94a3b8)"
                    : "linear-gradient(to right, #f97316, #ec4899)",
                color: "white",
                boxShadow: options.length === 0 || spinning ? "none" : "0 25px 50px -12px rgba(249, 115, 22, 0.5)",
                transition: "all 0.3s ease-in-out",
                ...pulseAnimation,
              }}
            >
              {spinning ? (
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <svg style={{ width: "24px", height: "24px", ...spinAnimation }} fill="none" viewBox="0 0 24 24">
                    <circle
                      style={{ opacity: 0.25 }}
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      style={{ opacity: 0.75 }}
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Spinning...
                </div>
              ) : (
                "🎲 Spin the Wheel!"
              )}
            </button>
          </div>

          {/* Result Display */}
          {selected && !spinning && (
            <div
              style={{
                background: "linear-gradient(to right, #ecfdf5, #d1fae5)",
                borderRadius: "16px",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                padding: "32px",
                border: "2px solid #10b981",
                textAlign: "center",
                ...bounceAnimation,
                boxSizing: "border-box"
              }}
            >
              <div style={{ marginBottom: "16px" }}>
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    margin: "0 auto 16px",
                    background: "linear-gradient(to right, #10b981, #059669)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    style={{ width: "32px", height: "32px", color: "white" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#374151",
                    marginBottom: "8px",
                    margin: "0 0 8px 0",
                  }}
                >
                  🎉 Winner!
                </h3>
                <div
                  style={{
                    fontSize: "28px",
                    fontWeight: "bold",
                    background: "linear-gradient(to right, #059669, #047857)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    margin: 0,
                  }}
                >
                  {selected}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
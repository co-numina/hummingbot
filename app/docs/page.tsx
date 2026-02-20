import Nav from "../components/Nav";

const strategies = [
  {
    name: "pure_market_making",
    desc: "Places symmetric bid/ask orders around a mid-price. Earns spread as profit. Configurable order levels, spread, and refresh intervals.",
    params: ["bid_spread", "ask_spread", "order_amount", "order_levels", "order_refresh_time"],
    risk: "Inventory risk in trending markets. Use with inventory skew.",
  },
  {
    name: "avellaneda_stoikov",
    desc: "Academic market-making model that dynamically adjusts spreads based on inventory risk and volatility. Optimal for volatile pairs.",
    params: ["risk_factor", "order_amount", "vol_to_spread_multiplier", "inventory_target_base_pct"],
    risk: "Sensitive to parameter tuning. Requires backtesting.",
  },
  {
    name: "cross_exchange_market_making",
    desc: "Makes markets on one exchange while hedging on another. Captures spread differential between venues.",
    params: ["maker_market", "taker_market", "min_profitability", "order_amount"],
    risk: "Execution latency between exchanges. Transfer delays.",
  },
  {
    name: "grid_trading",
    desc: "Places orders at fixed price intervals within a range. Profits from mean-reverting price action within the grid.",
    params: ["upper_price", "lower_price", "n_levels", "order_amount"],
    risk: "Breakout beyond grid range causes unrealized loss.",
  },
  {
    name: "twap",
    desc: "Time-Weighted Average Price execution. Splits large orders into smaller chunks over a time period to minimize market impact.",
    params: ["target_asset_amount", "order_step_size", "time_delay"],
    risk: "Minimal. Execution-focused strategy.",
  },
];

const apiEndpoints = [
  { method: "GET", path: "/api/v1/strategies", desc: "List available strategy configurations" },
  { method: "GET", path: "/api/v1/strategies/:id", desc: "Get strategy config with parameters" },
  { method: "POST", path: "/api/v1/strategies/:id/backtest", desc: "Run backtest with custom parameters" },
  { method: "GET", path: "/api/v1/performance", desc: "Get live performance metrics for active strategies" },
  { method: "POST", path: "/api/v1/subscribe", desc: "Subscribe to strategy signals (requires $HBOT)" },
  { method: "GET", path: "/api/v1/orderbook/:pair", desc: "Real-time order book snapshot" },
];

export default function Docs() {
  return (
    <main>
      <Nav />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px" }}>
        <h1 style={{ fontSize: "20px", fontWeight: 700, color: "var(--text-bright)", marginBottom: "8px" }}>
          Documentation
        </h1>
        <p style={{ fontSize: "12px", color: "var(--gray)", marginBottom: "48px", lineHeight: "1.7" }}>
          Strategy types, parameters, and API reference for the $HBOT premium strategy layer.
          All strategies are built on the{" "}
          <a href="https://github.com/hummingbot/hummingbot" target="_blank" rel="noopener noreferrer" style={{ color: "var(--green)", textDecoration: "none" }}>
            Hummingbot open-source framework
          </a>.
        </p>

        {/* Strategy Types */}
        <section style={{ marginBottom: "60px" }}>
          <h2 style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--gray)", marginBottom: "24px" }}>
            Strategy Types
          </h2>
          {strategies.map((s) => (
            <div
              key={s.name}
              style={{
                border: "1px solid var(--gray-border)",
                padding: "20px",
                marginBottom: "12px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                <code style={{ fontSize: "13px", color: "var(--green)" }}>{s.name}</code>
              </div>
              <p style={{ fontSize: "12px", color: "var(--gray)", lineHeight: "1.7", margin: "0 0 14px 0" }}>
                {s.desc}
              </p>
              <div style={{ marginBottom: "10px" }}>
                <span style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--gray-dim)" }}>
                  Parameters
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "6px" }}>
                  {s.params.map((p) => (
                    <code
                      key={p}
                      style={{
                        fontSize: "10px",
                        padding: "3px 8px",
                        background: "#111",
                        border: "1px solid var(--gray-border)",
                        color: "var(--text)",
                      }}
                    >
                      {p}
                    </code>
                  ))}
                </div>
              </div>
              <div style={{ fontSize: "10px", color: "var(--red)", opacity: 0.7 }}>
                Risk: {s.risk}
              </div>
            </div>
          ))}
        </section>

        {/* API Reference */}
        <section style={{ marginBottom: "60px" }}>
          <h2 style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--gray)", marginBottom: "24px" }}>
            API Reference
          </h2>
          <div style={{ border: "1px solid var(--gray-border)" }}>
            {apiEndpoints.map((ep, i) => (
              <div
                key={ep.path}
                style={{
                  display: "grid",
                  gridTemplateColumns: "60px 1fr 2fr",
                  gap: "12px",
                  padding: "12px 16px",
                  fontSize: "12px",
                  borderBottom: i < apiEndpoints.length - 1 ? "1px solid var(--gray-border)" : "none",
                  alignItems: "center",
                }}
              >
                <code
                  style={{
                    fontSize: "10px",
                    color: ep.method === "GET" ? "var(--green)" : "#f0a030",
                    fontWeight: 600,
                  }}
                >
                  {ep.method}
                </code>
                <code style={{ fontSize: "11px", color: "var(--text)" }}>{ep.path}</code>
                <span style={{ color: "var(--gray)", fontSize: "11px" }}>{ep.desc}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: "10px", color: "var(--gray-dim)", marginTop: "12px" }}>
            All endpoints require authentication via $HBOT token balance verification.
            Rate limits: 100 req/min (free tier), 1000 req/min (stakers).
          </p>
        </section>

        {/* Integration */}
        <section>
          <h2 style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--gray)", marginBottom: "24px" }}>
            Quick Start
          </h2>
          <pre
            style={{
              background: "#111",
              border: "1px solid var(--gray-border)",
              padding: "20px",
              fontSize: "11px",
              lineHeight: "1.8",
              overflow: "auto",
              color: "var(--text)",
            }}
          >
{`# Install hummingbot
git clone https://github.com/hummingbot/hummingbot.git
cd hummingbot && ./install

# Load premium strategy config (requires $HBOT)
hummingbot connect --token $HBOT_WALLET
hummingbot load-config pure_market_making --premium

# Run with optimized parameters
hummingbot start --strategy pure_market_making \\
  --config premium_pmm_sol_usdc.yml`}
          </pre>
        </section>
      </div>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";

const strategies = [
  { name: "pure_market_making", pair: "SOL/USDC", status: "active", pnl: "+4.2%", trades: 1847, uptime: "99.7%" },
  { name: "cross_exchange_mm", pair: "ETH/USDT", status: "active", pnl: "+7.1%", trades: 3201, uptime: "98.9%" },
  { name: "avellaneda_stoikov", pair: "HBOT/USDC", status: "active", pnl: "+12.8%", trades: 892, uptime: "99.2%" },
  { name: "twap", pair: "BTC/USDC", status: "idle", pnl: "+2.1%", trades: 445, uptime: "100%" },
  { name: "grid_trading", pair: "ARB/USDC", status: "active", pnl: "+5.6%", trades: 2103, uptime: "97.8%" },
];

export default function StrategyMetrics() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="panel">
      <div className="panel-header">Active Strategies</div>
      <div style={{ fontSize: "11px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
            color: "var(--gray-dim)",
            fontSize: "9px",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "8px",
            paddingBottom: "6px",
            borderBottom: "1px solid var(--gray-border)",
          }}
        >
          <span>Strategy</span>
          <span>Pair</span>
          <span style={{ textAlign: "right" }}>PnL</span>
          <span style={{ textAlign: "right" }}>Trades</span>
          <span style={{ textAlign: "right" }}>Uptime</span>
        </div>
        {strategies.map((s) => {
          const jitter = Math.floor(Math.random() * 20) - 5;
          return (
            <div
              key={s.name}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
                padding: "4px 0",
                borderBottom: "1px solid var(--gray-border)",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span
                  style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: s.status === "active" ? "var(--green)" : "var(--gray-dim)",
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                {s.name}
              </span>
              <span style={{ color: "var(--gray)" }}>{s.pair}</span>
              <span style={{ textAlign: "right", color: "var(--green)" }}>{s.pnl}</span>
              <span style={{ textAlign: "right", color: "var(--gray)" }}>{(s.trades + jitter).toLocaleString()}</span>
              <span style={{ textAlign: "right", color: "var(--gray-dim)" }}>{s.uptime}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

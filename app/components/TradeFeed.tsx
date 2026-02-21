"use client";

import { useEffect, useState, useRef } from "react";

interface Trade {
  id: number;
  time: string;
  pair: string;
  side: "BUY" | "SELL";
  price: string;
  size: string;
  strategy: string;
  pnl: string;
}

const PAIRS = ["SOL/USDC", "ETH/USDT", "HBOT/USDC", "BTC/USDC", "ARB/USDC"];
const STRATEGIES = ["pmm", "avellaneda", "grid", "xemm", "twap"];

function generateTrade(id: number): Trade {
  const now = new Date();
  const pair = PAIRS[Math.floor(Math.random() * PAIRS.length)];
  const side = Math.random() > 0.48 ? "BUY" : "SELL";
  const strategy = STRATEGIES[Math.floor(Math.random() * STRATEGIES.length)];

  let price: number;
  let size: number;
  switch (pair) {
    case "SOL/USDC": price = 85 + Math.random() * 10; size = 5 + Math.random() * 50; break;
    case "ETH/USDT": price = 2700 + Math.random() * 200; size = 0.1 + Math.random() * 2; break;
    case "BTC/USDC": price = 95000 + Math.random() * 5000; size = 0.001 + Math.random() * 0.05; break;
    case "HBOT/USDC": price = 1.2 + Math.random() * 0.3; size = 500 + Math.random() * 5000; break;
    default: price = 1 + Math.random() * 5; size = 100 + Math.random() * 2000;
  }

  const pnlVal = (Math.random() - 0.4) * price * size * 0.002;

  return {
    id,
    time: now.toLocaleTimeString("en-US", { hour12: false }),
    pair,
    side,
    price: price > 100 ? price.toFixed(2) : price.toFixed(4),
    size: size > 10 ? size.toFixed(2) : size.toFixed(4),
    strategy,
    pnl: (pnlVal >= 0 ? "+" : "") + pnlVal.toFixed(2),
  };
}

export default function TradeFeed() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    // Initial batch
    const initial: Trade[] = [];
    for (let i = 0; i < 6; i++) {
      initial.push(generateTrade(idRef.current++));
    }
    setTrades(initial);

    const interval = setInterval(() => {
      setTrades((prev) => {
        const next = [generateTrade(idRef.current++), ...prev];
        return next.slice(0, 12);
      });
    }, 2200 + Math.random() * 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="panel" style={{ gridColumn: "1 / -1" }}>
      <div className="panel-header">
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{
            width: "6px", height: "6px", borderRadius: "50%",
            background: "var(--green)", display: "inline-block",
            animation: "pulse 2s infinite"
          }} />
          Live Execution Feed
        </span>
        <span style={{ fontSize: "10px", color: "var(--gray-dim)" }}>cluster-us-east-1</span>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", fontSize: "11px", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ color: "var(--gray-dim)", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              <th style={{ textAlign: "left", padding: "4px 8px", fontWeight: 400 }}>Time</th>
              <th style={{ textAlign: "left", padding: "4px 8px", fontWeight: 400 }}>Pair</th>
              <th style={{ textAlign: "left", padding: "4px 8px", fontWeight: 400 }}>Side</th>
              <th style={{ textAlign: "right", padding: "4px 8px", fontWeight: 400 }}>Price</th>
              <th style={{ textAlign: "right", padding: "4px 8px", fontWeight: 400 }}>Size</th>
              <th style={{ textAlign: "left", padding: "4px 8px", fontWeight: 400 }}>Strategy</th>
              <th style={{ textAlign: "right", padding: "4px 8px", fontWeight: 400 }}>P&L</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((t) => (
              <tr key={t.id} style={{
                borderTop: "1px solid var(--gray-border)",
                animation: "fadeInUp 0.3s ease-out",
              }}>
                <td style={{ padding: "5px 8px", color: "var(--gray-dim)", fontFamily: "var(--font-mono)" }}>{t.time}</td>
                <td style={{ padding: "5px 8px", color: "var(--text-bright)", fontFamily: "var(--font-mono)", fontWeight: 500 }}>{t.pair}</td>
                <td style={{ padding: "5px 8px" }}>
                  <span style={{
                    color: t.side === "BUY" ? "var(--green)" : "var(--red)",
                    fontFamily: "var(--font-mono)", fontWeight: 600
                  }}>{t.side}</span>
                </td>
                <td style={{ padding: "5px 8px", color: "var(--gray)", fontFamily: "var(--font-mono)", textAlign: "right" }}>{t.price}</td>
                <td style={{ padding: "5px 8px", color: "var(--gray)", fontFamily: "var(--font-mono)", textAlign: "right" }}>{t.size}</td>
                <td style={{ padding: "5px 8px", color: "var(--gray-dim)", fontFamily: "var(--font-mono)" }}>{t.strategy}</td>
                <td style={{
                  padding: "5px 8px", textAlign: "right", fontFamily: "var(--font-mono)", fontWeight: 500,
                  color: t.pnl.startsWith("+") ? "var(--green)" : "var(--red)"
                }}>{t.pnl}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

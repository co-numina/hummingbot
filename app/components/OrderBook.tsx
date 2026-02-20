"use client";

import { useEffect, useState, useRef } from "react";

interface Level {
  price: number;
  size: number;
  total: number;
}

function generateLevels(mid: number, side: "bid" | "ask", count: number): Level[] {
  const levels: Level[] = [];
  let cumulative = 0;
  for (let i = 0; i < count; i++) {
    const offset = (i + 1) * (0.01 + Math.random() * 0.02);
    const price = side === "bid" ? mid - offset : mid + offset;
    const size = 500 + Math.random() * 8000;
    cumulative += size;
    levels.push({ price: +price.toFixed(4), size: Math.round(size), total: Math.round(cumulative) });
  }
  return levels;
}

export default function OrderBook() {
  const [mid, setMid] = useState(1.2847);
  const [bids, setBids] = useState<Level[]>([]);
  const [asks, setAsks] = useState<Level[]>([]);
  const maxTotal = useRef(1);

  useEffect(() => {
    const update = () => {
      const drift = (Math.random() - 0.5) * 0.003;
      setMid((prev) => {
        const next = +(prev + drift).toFixed(4);
        const newBids = generateLevels(next, "bid", 12);
        const newAsks = generateLevels(next, "ask", 12);
        maxTotal.current = Math.max(
          newBids[newBids.length - 1]?.total || 1,
          newAsks[newAsks.length - 1]?.total || 1
        );
        setBids(newBids);
        setAsks(newAsks);
        return next;
      });
    };
    update();
    const id = setInterval(update, 1200);
    return () => clearInterval(id);
  }, []);

  const renderLevel = (level: Level, side: "bid" | "ask") => {
    const pct = (level.total / maxTotal.current) * 100;
    const color = side === "bid" ? "var(--green)" : "var(--red)";
    return (
      <div
        key={`${side}-${level.price}`}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          fontSize: "11px",
          padding: "2px 0",
          position: "relative",
          lineHeight: "18px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            [side === "bid" ? "left" : "right"]: 0,
            width: `${pct}%`,
            background: color,
            opacity: 0.07,
            transition: "width 0.8s ease",
          }}
        />
        <span style={{ color, textAlign: side === "bid" ? "left" : "right", order: side === "ask" ? 3 : 1 }}>
          {level.price.toFixed(4)}
        </span>
        <span style={{ textAlign: "center", color: "var(--gray)", order: 2 }}>
          {level.size.toLocaleString()}
        </span>
        <span style={{ textAlign: side === "bid" ? "right" : "left", color: "var(--gray-dim)", order: side === "ask" ? 1 : 3 }}>
          {level.total.toLocaleString()}
        </span>
      </div>
    );
  };

  return (
    <div className="panel" style={{ gridRow: "1 / 3" }}>
      <div className="panel-header">Order Book — HBOT/USDC</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", fontSize: "9px", color: "var(--gray-dim)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
        <span>Price</span>
        <span style={{ textAlign: "center" }}>Size</span>
        <span style={{ textAlign: "right" }}>Total</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column-reverse" }}>
        {asks.map((l) => renderLevel(l, "ask"))}
      </div>
      <div
        style={{
          textAlign: "center",
          padding: "8px 0",
          fontSize: "16px",
          fontWeight: 700,
          color: "var(--green)",
          borderTop: "1px solid var(--gray-border)",
          borderBottom: "1px solid var(--gray-border)",
          margin: "6px 0",
        }}
      >
        {mid.toFixed(4)}
        <span style={{ fontSize: "10px", color: "var(--gray)", marginLeft: "8px" }}>USDC</span>
      </div>
      <div>
        {bids.map((l) => renderLevel(l, "bid"))}
      </div>
    </div>
  );
}

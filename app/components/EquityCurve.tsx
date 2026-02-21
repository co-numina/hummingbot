"use client";

import { useEffect, useRef, useState } from "react";

// Generate a realistic equity curve with drawdowns, sideways, and recovery
function generateRealisticCurve(length: number): number[] {
  const points: number[] = [];
  let equity = 10000;
  let regime = "trending"; // trending | choppy | drawdown
  let regimeLen = 0;

  for (let i = 0; i < length; i++) {
    regimeLen++;

    // Switch regime periodically
    if (regimeLen > 15 + Math.random() * 30) {
      const r = Math.random();
      if (r < 0.45) regime = "trending";
      else if (r < 0.75) regime = "choppy";
      else regime = "drawdown";
      regimeLen = 0;
    }

    let change: number;
    switch (regime) {
      case "trending":
        // Steady upward with small noise
        change = equity * (0.001 + Math.random() * 0.003);
        if (Math.random() < 0.15) change = -change * 0.3; // minor pullbacks
        break;
      case "choppy":
        // Sideways, mean reverting
        change = equity * (Math.random() - 0.5) * 0.004;
        break;
      case "drawdown":
        // Down with occasional dead cat bounces
        change = equity * -(0.002 + Math.random() * 0.005);
        if (Math.random() < 0.25) change = -change * 0.4; // dead cat bounce
        break;
      default:
        change = 0;
    }

    equity += change;
    equity = Math.max(equity, 6000); // hard floor
    points.push(equity);
  }
  return points;
}

export default function EquityCurve() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dataRef = useRef<number[]>([]);
  const [currentVal, setCurrentVal] = useState(0);
  const [pnlPct, setPnlPct] = useState(0);

  useEffect(() => {
    dataRef.current = generateRealisticCurve(250);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * 2;
      canvas.height = height * 2;
      ctx.scale(2, 2);

      const data = dataRef.current;
      if (!data.length) return;

      const min = Math.min(...data) * 0.995;
      const max = Math.max(...data) * 1.005;
      const range = max - min || 1;
      const start = data[0];
      const current = data[data.length - 1];

      setCurrentVal(current);
      setPnlPct(((current - start) / start) * 100);

      ctx.clearRect(0, 0, width, height);

      // Grid
      ctx.strokeStyle = "#1a2540";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 5; i++) {
        const y = (i / 4) * height;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Breakeven line
      const beY = height - ((start - min) / range) * height;
      ctx.strokeStyle = "#334155";
      ctx.lineWidth = 0.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, beY);
      ctx.lineTo(width, beY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw segments colored by above/below breakeven
      for (let i = 1; i < data.length; i++) {
        const x0 = ((i - 1) / (data.length - 1)) * width;
        const y0 = height - ((data[i - 1] - min) / range) * height;
        const x1 = (i / (data.length - 1)) * width;
        const y1 = height - ((data[i] - min) / range) * height;

        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.strokeStyle = data[i] >= start ? "#00e676" : "#ef4444";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Fill under curve
      ctx.beginPath();
      ctx.moveTo(0, height - ((data[0] - min) / range) * height);
      data.forEach((val, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((val - min) / range) * height;
        ctx.lineTo(x, y);
      });
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      const isUp = current >= start;
      grad.addColorStop(0, isUp ? "rgba(0,230,118,0.08)" : "rgba(239,68,68,0.08)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fill();

      // Current price dot
      const lastX = width;
      const lastY = height - ((current - min) / range) * height;
      ctx.beginPath();
      ctx.arc(lastX - 2, lastY, 3, 0, Math.PI * 2);
      ctx.fillStyle = isUp ? "#00e676" : "#ef4444";
      ctx.fill();

      // Max drawdown indicator
      let peak = data[0];
      let maxDD = 0;
      let ddStart = 0;
      let ddEnd = 0;
      for (let i = 0; i < data.length; i++) {
        if (data[i] > peak) peak = data[i];
        const dd = (peak - data[i]) / peak;
        if (dd > maxDD) {
          maxDD = dd;
          ddEnd = i;
        }
      }
      if (maxDD > 0.02) {
        // find peak before ddEnd
        peak = data[0];
        for (let i = 0; i <= ddEnd; i++) {
          if (data[i] > peak) { peak = data[i]; ddStart = i; }
        }
        const sx = (ddStart / (data.length - 1)) * width;
        const ex = (ddEnd / (data.length - 1)) * width;
        const sy = height - ((data[ddStart] - min) / range) * height;
        const ey = height - ((data[ddEnd] - min) / range) * height;

        // shaded drawdown region
        ctx.fillStyle = "rgba(239,68,68,0.04)";
        ctx.fillRect(sx, sy, ex - sx, ey - sy);

        // label
        ctx.fillStyle = "#ef4444";
        ctx.font = "9px ui-monospace, monospace";
        ctx.textAlign = "center";
        ctx.fillText(`-${(maxDD * 100).toFixed(1)}%`, (sx + ex) / 2, ey + 12);
      }
    };

    draw();

    // Animate: add new realistic point every 3s
    let regime = "trending";
    let regimeCount = 0;
    const interval = setInterval(() => {
      const data = dataRef.current;
      const last = data[data.length - 1];

      regimeCount++;
      if (regimeCount > 8 + Math.random() * 12) {
        const r = Math.random();
        if (r < 0.5) regime = "trending";
        else if (r < 0.8) regime = "choppy";
        else regime = "drawdown";
        regimeCount = 0;
      }

      let change: number;
      if (regime === "trending") {
        change = last * (0.0008 + Math.random() * 0.002);
        if (Math.random() < 0.15) change = -change * 0.3;
      } else if (regime === "choppy") {
        change = last * (Math.random() - 0.5) * 0.003;
      } else {
        change = last * -(0.001 + Math.random() * 0.004);
        if (Math.random() < 0.25) change = -change * 0.4;
      }

      data.push(Math.max(last + change, 6000));
      if (data.length > 350) data.shift();
      draw();
    }, 3000);

    window.addEventListener("resize", draw);
    return () => { clearInterval(interval); window.removeEventListener("resize", draw); };
  }, []);

  const isUp = pnlPct >= 0;

  return (
    <div className="panel">
      <div className="panel-header">
        <span>P&L Equity Curve — Market Making Composite</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
        <span style={{ fontSize: "18px", fontWeight: 700, color: "var(--text-bright)", fontFamily: "var(--font-mono)" }}>
          ${currentVal.toFixed(0)}
        </span>
        <span style={{ fontSize: "12px", fontWeight: 600, color: isUp ? "var(--green)" : "var(--red)", fontFamily: "var(--font-mono)" }}>
          {isUp ? "+" : ""}{pnlPct.toFixed(1)}%
        </span>
      </div>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "200px", display: "block" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", fontSize: "10px", color: "var(--gray-dim)" }}>
        <span>30d rolling · 5 strategies</span>
        <span style={{ color: "var(--gray)" }}>breakeven — — —</span>
      </div>
    </div>
  );
}

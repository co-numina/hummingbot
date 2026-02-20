"use client";

import { useEffect, useRef } from "react";

export default function EquityCurve() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dataRef = useRef<number[]>([]);

  useEffect(() => {
    // Generate initial equity curve
    let equity = 10000;
    const points: number[] = [];
    for (let i = 0; i < 200; i++) {
      equity += (Math.random() - 0.42) * 80; // slight upward bias
      equity = Math.max(equity, 5000);
      points.push(equity);
    }
    dataRef.current = points;

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
      const min = Math.min(...data) * 0.98;
      const max = Math.max(...data) * 1.02;
      const range = max - min || 1;

      // Clear
      ctx.clearRect(0, 0, width, height);

      // Grid lines
      ctx.strokeStyle = "#1a2540";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 5; i++) {
        const y = (i / 4) * height;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Equity line
      ctx.beginPath();
      ctx.strokeStyle = "#00e676";
      ctx.lineWidth = 1.5;
      data.forEach((val, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((val - min) / range) * height;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Fill under curve
      const lastX = width;
      const lastY = height - ((data[data.length - 1] - min) / range) * height;
      ctx.lineTo(lastX, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, "rgba(0, 230, 118, 0.12)");
      grad.addColorStop(1, "rgba(0, 230, 118, 0)");
      ctx.fillStyle = grad;
      ctx.fill();

      // Current value label
      const current = data[data.length - 1];
      ctx.fillStyle = "#00e676";
      ctx.font = "bold 11px ui-monospace, monospace";
      ctx.textAlign = "right";
      ctx.fillText(`$${current.toFixed(0)}`, width - 4, lastY - 6);
    };

    draw();

    // Animate: add new point every 2s
    const interval = setInterval(() => {
      const data = dataRef.current;
      const last = data[data.length - 1];
      const next = last + (Math.random() - 0.42) * 80;
      data.push(Math.max(next, 5000));
      if (data.length > 300) data.shift();
      draw();
    }, 2000);

    const handleResize = () => draw();
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="panel">
      <div className="panel-header">P&L Equity Curve — Market Making Strategy</div>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "200px", display: "block" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", fontSize: "10px", color: "var(--gray-dim)" }}>
        <span>30d rolling</span>
        <span style={{ color: "var(--green)" }}>+18.4% return</span>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";

const CA = "PASTE_CA_HERE";

export default function Nav() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(CA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 20px",
        borderBottom: "1px solid var(--gray-border)",
        fontSize: "13px",
        position: "sticky",
        top: 0,
        background: "var(--bg)",
        zIndex: 100,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Link href="/" style={{ color: "var(--green)", textDecoration: "none", fontWeight: 700, fontSize: "15px" }}>
          $HBOT
        </Link>
        <Link href="/docs" style={{ color: "var(--gray)", textDecoration: "none" }}>
          docs
        </Link>
        <a
          href="https://github.com/hummingbot/hummingbot"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--gray)", textDecoration: "none" }}
        >
          github
        </a>
      </div>

      <button
        onClick={copy}
        style={{
          background: "none",
          border: "1px solid var(--gray-dim)",
          color: copied ? "var(--green)" : "var(--gray)",
          padding: "6px 14px",
          borderRadius: "4px",
          cursor: "pointer",
          fontFamily: "inherit",
          fontSize: "12px",
          letterSpacing: "0.05em",
          transition: "all 0.2s",
        }}
        title="Copy contract address"
      >
        {copied ? "copied" : CA}
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <span style={{ color: "var(--gray-dim)", fontSize: "11px" }}>
          solana
        </span>
      </div>
    </nav>
  );
}

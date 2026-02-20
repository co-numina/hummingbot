"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Why is this a token?",
    a: "Hummingbot is open-source — anyone can run it. What you can't get for free is optimized strategy parameters, backtested configurations, and priority execution infrastructure. $HBOT gates access to the alpha layer on top of the open-source bot. The token aligns incentives: strategy creators earn when their configs perform, and holders get access proportional to their stake.",
  },
  {
    q: "Is this affiliated with the Hummingbot Foundation?",
    a: "No. $HBOT is a community token. Hummingbot is an open-source project maintained by the Hummingbot Foundation. We build on their framework and credit them prominently. The bot stays open-source — we tokenize the strategy layer, not the software.",
  },
  {
    q: "What strategies are available?",
    a: "Pure market making, Avellaneda-Stoikov, cross-exchange market making, grid trading, and TWAP. Each comes with backtested parameters optimized for specific pairs and market conditions. New strategies are added by the community through the Strategy Vault.",
  },
  {
    q: "How do tiers work?",
    a: "Hold more $HBOT, unlock more. Scout tier gets you basic strategy configs. Operator tier adds advanced strategies and faster refresh rates. Whale tier includes priority execution, custom parameter tuning, and Strategy Vault submissions.",
  },
  {
    q: "What chain is $HBOT on?",
    a: "Solana. Token verification is on-chain — connect your wallet and your tier is determined by your $HBOT balance. No KYC, no accounts, no middlemen.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section style={{ padding: "56px 20px", maxWidth: "720px", margin: "0 auto" }}>
      <h2
        style={{
          fontSize: "12px",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          color: "var(--gray)",
          marginBottom: "32px",
          textAlign: "center",
        }}
      >
        Frequently Asked
      </h2>
      <div>
        {faqs.map((faq, i) => (
          <div
            key={i}
            style={{
              borderBottom: "1px solid var(--gray-border)",
            }}
          >
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              style={{
                width: "100%",
                background: "none",
                border: "none",
                padding: "20px 0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "13px",
                color: open === i ? "var(--text-bright)" : "var(--text)",
                textAlign: "left",
              }}
            >
              {faq.q}
              <span
                style={{
                  color: "var(--gray-dim)",
                  fontSize: "14px",
                  marginLeft: "16px",
                  flexShrink: 0,
                  transform: open === i ? "rotate(45deg)" : "none",
                  transition: "transform 0.2s",
                }}
              >
                +
              </span>
            </button>
            {open === i && (
              <p
                style={{
                  fontSize: "12px",
                  lineHeight: "1.8",
                  color: "var(--gray)",
                  margin: "0 0 20px 0",
                  paddingRight: "32px",
                }}
              >
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

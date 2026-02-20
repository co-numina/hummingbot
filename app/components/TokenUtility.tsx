export default function TokenUtility() {
  const tiers = [
    {
      name: "Scout",
      requirement: "1,000 $HBOT",
      features: [
        "Basic strategy configs (PMM, grid)",
        "Community backtests",
        "API access — 100 req/min",
        "Public strategy vault",
      ],
    },
    {
      name: "Operator",
      requirement: "10,000 $HBOT",
      features: [
        "All Scout features",
        "Advanced strategies (Avellaneda-Stoikov, cross-exchange)",
        "Priority parameter refresh (5min vs 30min)",
        "API access — 500 req/min",
        "Private Discord channel",
      ],
      highlight: true,
    },
    {
      name: "Whale",
      requirement: "100,000 $HBOT",
      features: [
        "All Operator features",
        "Priority execution queue",
        "Custom parameter tuning requests",
        "Submit to Strategy Vault (earn per download)",
        "API access — 2,000 req/min",
        "Direct strategy consultation",
      ],
    },
  ];

  return (
    <section style={{ padding: "56px 20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h2
        style={{
          fontSize: "12px",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          color: "var(--gray)",
          marginBottom: "12px",
          textAlign: "center",
        }}
      >
        Token Utility
      </h2>
      <p
        style={{
          fontSize: "12px",
          color: "var(--gray-dim)",
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        Hold $HBOT to unlock strategy tiers. More tokens, more alpha.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px",
          background: "var(--gray-border)",
          border: "1px solid var(--gray-border)",
        }}
      >
        {tiers.map((tier) => (
          <div
            key={tier.name}
            style={{
              background: tier.highlight ? "var(--bg-panel)" : "var(--bg)",
              padding: "32px 24px",
              borderTop: tier.highlight ? "2px solid var(--green)" : "2px solid transparent",
            }}
          >
            <div
              style={{
                fontSize: "15px",
                color: "var(--text-bright)",
                fontWeight: 600,
                marginBottom: "6px",
              }}
            >
              {tier.name}
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "var(--green)",
                marginBottom: "20px",
                letterSpacing: "0.05em",
              }}
            >
              {tier.requirement}
            </div>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                fontSize: "11px",
                lineHeight: "2",
                color: "var(--gray)",
              }}
            >
              {tier.features.map((f, i) => (
                <li key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                  <span style={{ color: "var(--green)", flexShrink: 0 }}>-</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

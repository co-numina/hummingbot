export default function TokenUtility() {
  return (
    <section style={{ padding: "60px 20px", maxWidth: "900px", margin: "0 auto" }}>
      <h2
        style={{
          fontSize: "12px",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          color: "var(--gray)",
          marginBottom: "40px",
          textAlign: "center",
        }}
      >
        Why $HBOT exists
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px",
          background: "var(--gray-border)",
          border: "1px solid var(--gray-border)",
        }}
      >
        {[
          {
            title: "Strategy Access",
            desc: "Pay $HBOT to unlock premium strategy configurations. Backtested parameters for market making, arbitrage, and grid trading — optimized on Hummingbot's open-source framework.",
            detail: "100 $HBOT / config",
          },
          {
            title: "Priority Execution",
            desc: "Stake $HBOT for priority queue placement. Your strategies execute first when network congestion spikes. Time advantage in high-frequency trading is everything.",
            detail: "Stake 10K+ $HBOT",
          },
          {
            title: "Strategy Vault",
            desc: "Community-built strategies, peer-reviewed and audited. Contributors earn $HBOT when their configs are used. Aligns incentives between builders and traders.",
            detail: "Earn per download",
          },
        ].map((item) => (
          <div
            key={item.title}
            style={{
              background: "var(--bg)",
              padding: "28px 24px",
            }}
          >
            <div
              style={{
                fontSize: "13px",
                color: "var(--text-bright)",
                fontWeight: 600,
                marginBottom: "12px",
              }}
            >
              {item.title}
            </div>
            <p
              style={{
                fontSize: "12px",
                lineHeight: "1.7",
                color: "var(--gray)",
                margin: "0 0 16px 0",
              }}
            >
              {item.desc}
            </p>
            <div
              style={{
                fontSize: "10px",
                color: "var(--green)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              {item.detail}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

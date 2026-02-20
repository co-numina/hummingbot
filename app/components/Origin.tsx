export default function Origin() {
  return (
    <section
      style={{
        padding: "48px 20px",
        borderBottom: "1px solid var(--gray-border)",
        textAlign: "center",
      }}
    >
      <p style={{ fontSize: "11px", color: "var(--gray)", lineHeight: "1.8", maxWidth: "640px", margin: "0 auto" }}>
        Built on{" "}
        <a
          href="https://github.com/hummingbot/hummingbot"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--green)", textDecoration: "none" }}
        >
          Hummingbot
        </a>{" "}
        — the open-source framework for building high-frequency crypto trading bots.
        8,000+ GitHub stars. Maintained by the Hummingbot Foundation and a global community
        of quant traders and developers since 2019.
      </p>
      <p style={{ fontSize: "11px", color: "var(--gray-dim)", marginTop: "16px" }}>
        $HBOT tokenizes access to optimized strategies, not the framework itself.
        The bot stays open-source. The alpha is what you pay for.
      </p>
    </section>
  );
}

import Nav from "./components/Nav";
import OrderBook from "./components/OrderBook";
import EquityCurve from "./components/EquityCurve";
import StrategyMetrics from "./components/StrategyMetrics";
import TradeFeed from "./components/TradeFeed";
import Origin from "./components/Origin";
import TokenUtility from "./components/TokenUtility";
import FAQ from "./components/FAQ";

export default function Home() {
  return (
    <main>
      <Nav />

      {/* Hero */}
      <section
        style={{
          padding: "72px 24px 56px",
          textAlign: "center",
          borderBottom: "1px solid var(--gray-border)",
        }}
      >
        <h1
          style={{
            fontSize: "34px",
            fontWeight: 700,
            color: "var(--text-bright)",
            margin: "0 0 16px 0",
            letterSpacing: "-0.02em",
          }}
        >
          The bot is open-source.
          <br />
          <span style={{ color: "var(--green)" }}>The alpha is ours.</span>
        </h1>
        <p
          style={{
            fontSize: "14px",
            color: "var(--gray)",
            maxWidth: "540px",
            margin: "0 auto",
            lineHeight: "1.8",
          }}
        >
          $HBOT tokenizes access to optimized trading strategies built on
          Hummingbot — the open-source HFT framework with 8K+ GitHub stars.
          Premium configs. Backtested parameters. Priority execution.
        </p>
      </section>

      {/* Origin/Attribution */}
      <Origin />

      {/* Terminal Grid */}
      <section style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
        <div className="grid-terminal">
          <OrderBook />
          <EquityCurve />
          <StrategyMetrics />
          <TradeFeed />
        </div>
      </section>

      {/* Token Utility / Tiers */}
      <TokenUtility />

      {/* FAQ */}
      <FAQ />

      {/* Footer */}
      <footer
        style={{
          padding: "40px 24px",
          borderTop: "1px solid var(--gray-border)",
          textAlign: "center",
          fontSize: "11px",
          color: "var(--gray-dim)",
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          $HBOT is a community token. Not affiliated with the Hummingbot Foundation.
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px" }}>
          <a
            href="https://github.com/hummingbot/hummingbot"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--gray)", textDecoration: "none" }}
          >
            Hummingbot GitHub
          </a>
          <a
            href="https://hummingbot.org"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--gray)", textDecoration: "none" }}
          >
            hummingbot.org
          </a>
        </div>
      </footer>
    </main>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "$HBOT — The bot is open-source. The alpha is ours.",
  description: "Tokenized access to optimized trading strategies built on Hummingbot. Pay $HBOT for premium strategy configs, backtested parameters, and priority execution.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

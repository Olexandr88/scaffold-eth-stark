import "@rainbow-me/rainbowkit/styles.css";
import type { Metadata } from "next";
import { ScaffoldAppWithProviders } from "~~/components/ScaffoldAppWithProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";
import "~~/styles/globals.css";

export const metadata: Metadata = {
  title: "ETH - STRK - Cross Chain Template",
  description: "Seamlessly interact with Starknet and Ethereum!",
  icons: "/logo.ico",
};

const ScaffoldStarkApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider forcedTheme="light">
          <ScaffoldAppWithProviders>{children}</ScaffoldAppWithProviders>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default ScaffoldStarkApp;
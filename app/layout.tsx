import type { Metadata } from "next";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { LanguageProvider } from "../components/language-provider";
import "./globals.css";
import "./academic.css";

export const metadata: Metadata = {
  title: { default: "Yingyou Ma — Scientific Computing & Software", template: "%s | Yingyou Ma" },
  description: "Selected engineering software projects in scientific computing, data analysis, and 3D visualization."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <div className="site-shell">
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter year={new Date().getFullYear()} />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}

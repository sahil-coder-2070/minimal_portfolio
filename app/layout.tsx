import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "../src/index.css";
import { ThemeProvider } from "../src/components/landing/theme-provider";
import Container from "../src/components/layouts/Container";
import Layout from "../src/components/common/Layout";
import TopBanner from "../src/components/ui/top-banner";
import { Quote } from "../src/components/common/Quote";
import Footer from "../src/components/common/Footer";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["sans"],
});

export const metadata: Metadata = {
  title: "Sahil | Portfolio",
  description: "Web developer portfolio, showing blogs, experience, and custom tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="theme-custom" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var key = "vite-ui-theme";
                  var theme = localStorage.getItem(key);
                  if (theme === "dark" || (!theme && "dark" === "dark")) {
                    document.documentElement.classList.add("dark");
                  } else if (theme === "light") {
                    document.documentElement.classList.add("light");
                  } else if (theme === "system") {
                    var dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                    document.documentElement.classList.add(dark ? "dark" : "light");
                  }
                } catch (e) {}
              })()
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} font-sans antialiased min-h-screen`}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <div className="min-h-screen">
            <Container>
              <Layout>
                <TopBanner />
                {children}
                <Quote />
                <Footer />
              </Layout>
            </Container>
            <div className="from-background pointer-events-none fixed inset-x-0 bottom-0 z-40 h-10 bg-linear-to-t to-transparent [mask-image:linear-gradient(to_top,black_10%,transparent)] opacity-100 backdrop-blur-[5px] select-none dark:[mask-image:linear-gradient(to_top,black_20%,transparent)]" />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

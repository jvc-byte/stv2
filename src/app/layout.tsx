import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "./components/nav";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Sealed Trust",
  description: "Trustless deal making on the blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="lemonade">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-50`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Navigation wrapper with full width background */}
          <div className="mx-[-1rem] sm:mx-[-1.5rem] lg:mx-[-2rem]">
            {/* Your Nav component will go here */}
            <Nav />
          </div>
          
          {/* Main content container */}
          <main className="py-6">
            {children}
          </main>

          {/* Footer wrapper with full width background */}
          <div className="mx-[-1rem] sm:mx-[-1.5rem] lg:mx-[-2rem]">
            {/* Your Footer component will go here */}
          </div>
        </div>
      </body>
    </html>
  );
}
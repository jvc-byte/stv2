import Image from "next/image";
import LogoCloud from "./components/LogoCloud";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-screen">
      <Nav />
      <Header />
      <LogoCloud />
      <Footer />
    </div>
  );
}

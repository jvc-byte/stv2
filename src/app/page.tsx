import Image from "next/image";
import LogoCloud from "./components/logo-cloud";
import Header from "./components/header";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <Header />
      <LogoCloud />
    </div>
  );
}

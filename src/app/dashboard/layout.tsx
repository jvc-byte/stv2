// import "@/app/globals.css";

import { AuthGuard } from "../components/AuthGuard";
import DashNav from "../components/dashboard/DashNav";
import Footer from "../components/Footer";

export default function DashLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AuthGuard>
            <div className="mx-auto max-w-9xl px-4 sm:px-6 lg:px-8">
                {/* Navigation wrapper with full width background */}
                <div className="">
                    {/* Nav component here */}
                    <DashNav />

                </div>

                {/* Main content container */}
                <main className="">
                    {children}
                </main>

                {/* Footer wrapper with full width background */}
                <div className="">
                    {/* Footer component here */}
                    <Footer />
                </div>
            </div>
        </AuthGuard>
    );
}
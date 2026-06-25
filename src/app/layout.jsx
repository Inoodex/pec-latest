import Footer from "@/components/footer";
import "./globals.css";
import Header from "@/components/header";
import { Chivo } from "next/font/google";
import ThemeProvider from "@/components/themeProvider";
import ToggleButton from "@/components/toggleButton";
import LiveChat from "@/components/liveChat";

const chivo = Chivo({
    subsets: ["latin"],
    variable: "--font-chivo",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata = {
    title: "PECEDU Global",
    description:
        "PECEDU Gloabl discover a few simple steps to realize your aspirations of studying abroad. These steps are proven to work 100% and can transform your life.",
};

export default function RootLayout({ children }) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={`${chivo.className} h-full antialiased`}
        >
            <body
                suppressHydrationWarning
                className={`min-h-full flex flex-col ${chivo.variable}`}
            >
                <ThemeProvider>
                    <ToggleButton />
                    <div className="z-9999">
                        <LiveChat />
                    </div>
                    <header className="sticky top-0 z-50">
                        <Header />
                    </header>
                    <main>{children}</main>
                    <footer>
                        <Footer />
                    </footer>
                </ThemeProvider>
            </body>
        </html>
    );
}

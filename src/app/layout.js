import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const hindsiliguri = Hind_Siliguri({
    subsets: ["latin", "bengali"],
    weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
    title: "বাজার দর | BazarDor",
    description: "প্রতিদিনের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর জানুন।",
};

export default function RootLayout({ children }) {
    return (
        <html
            lang="bn"
            data-theme="light"
            className={`${ hindsiliguri.className } h-full antialiased`}
        >
            <body className="flex min-h-screen flex-col">
                <Navbar></Navbar>

                <main className="flex-1">
                    {children}
                </main>

                <Footer></Footer>

                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
            </body>
        </html>
    );
}

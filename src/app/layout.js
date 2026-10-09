import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";

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
      className={`${hindsiliguri.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar></Navbar>
        {children}</body>
    </html>
  );
}

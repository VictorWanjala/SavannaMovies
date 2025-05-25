import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "../components/layout/Navbar"
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "SAVANNAMOVIES",
  description: "Browse unlimited movies and TV shows",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient from-[#000000] to-[#1a1a1a]`}
      >
        <div className="bg-gradient from-[#000000] to-[#1a1a1a]">
          <Navbar />
        </div>
        {children}
      </body>
    </html>
  );
}

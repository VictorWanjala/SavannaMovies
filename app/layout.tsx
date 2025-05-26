
import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "../components/layout/Navbar"
import { Inter } from "next/font/google";
import Footer from "../components/layout/Footer"
import Provider from "@/components/Provider";

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
        className={`${inter.className} bg-gradient from-[#000000]/50 to-[#1a1a1a]/50`}
      >
        <Provider>
          <div className="">
          <Navbar />

          <div className="min-h-screen">
          {children}  
          </div>

          <Footer />
        
        

        </div>
        </Provider>
        
      </body>
    </html>
   
    
  );
}

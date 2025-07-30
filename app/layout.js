import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers"; // ✅ import Providers

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Rashtra Prabha",
  description: "Newspaper Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1481167001425305"
     crossorigin="anonymous"></script>
      <!-- 
<script
  data-ad-client="ca-pub-1481167001425305"
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
></script>
-->
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers> {/* ✅ wrap children in SessionProvider here */}
          {children}
        </Providers>
      </body>
    </html>
  );
}

import { Inter, Playfair_Display, Alex_Brush } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "./components/LayoutWrapper";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

const alexBrush = Alex_Brush({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${alexBrush.variable} overflow-x-clip`}>
      <body
        className={`${poppins.className} min-h-screen flex flex-col antialiased text-black bg-[#A52A2A] transition-colors duration-300 relative overflow-x-clip`}
      >
        {/* Animated Background Glow Blobs for Luxury Aesthetic */}
        <div className="absolute top-[55%] right-[-15%] w-[50vw] h-[50vw] rounded-full bg-brand-radishblack bg-glow-blob-secondary pointer-events-none z-0"></div>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
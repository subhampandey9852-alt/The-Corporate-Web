import {
  Inter,
  Cormorant_Garamond,
  Bricolage_Grotesque,
  Playball,
} from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/lenis-provider";
import LayoutWrapper from "./components/LayoutWrapper";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
});
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});
const playball = Playball({
  subsets: ["latin"],
  variable: "--font-playball",
  weight: ["400"],
});

export const metadata = {
  title: "Corporate House | Luxury Hotel",
  description:
    "Premium luxury hotel website for Corporate House with refined suites, dining, meetings, and wellness experiences.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${bricolage.variable} ${playball.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LenisProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </LenisProvider>
      </body>
    </html>
  );
}
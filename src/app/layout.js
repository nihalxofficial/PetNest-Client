// app/layout.js
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ToastContainer } from "react-toastify";

// Initialize the font
const josefin = Josefin_Sans({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "PetNest - Adopt & Love",
  description: "Premium pet adoption platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={josefin.className}>
        <Providers>
          {children}
          <ToastContainer/>
        </Providers>
      </body>
    </html>
  );
}
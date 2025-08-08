import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Import your components (just like in your original App.js)
import NavBar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { AuthProvider } from '../context/AuthContext';
import CartContext from '../context/CartContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MERN Store",
  description: "Tu tienda de mates y termos favorita",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Replicate your App.js structure exactly */}
        <AuthProvider>
          <CartContext>
            <NavBar />
            <main>{children}</main>
            <Footer />
          </CartContext>
        </AuthProvider>
      </body>
    </html>
  );
}

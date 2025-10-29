import type { Metadata } from "next";
import { Kanit} from "next/font/google";
import "./globals.css";

// Import your components (just like in your original App.js)
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { AuthProvider } from '../context/AuthContext';
import CartProvider from '../context/CartContext';

const kanit = Kanit({
      subsets: ['latin'],
      weight: ['400', '700'], // Specify the weights you need
      display: 'swap',
});



export const metadata: Metadata = {
  title: "Matecitos | MERN store",
  description: "Tu tienda de mates y termos favorita",
  icons: {
    icon: [
      { url: '/MatecitoIcon.png', sizes: '32x32', type: 'image/png' },
      { url: '/MatecitoIcon.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/MatecitoIcon.png',
    apple: '/MatecitoIcon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${kanit.className} antialiased min-h-screen flex flex-col`}>
        {/* Replicate your App.js structure exactly */}
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

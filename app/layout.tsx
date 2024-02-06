import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { getCategories } from "@/actions/get-categories";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import { PreviewProvider } from "@/context/preview-context";
import { CartContextProvider } from "@/context/cart-context";
import ToastProvider from "@/components/ToastProvider";
import ProductPreviewProvider from "@/components/ProductPreviewProvider";

const lato = Lato({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Knit Boutique",
  description: "Explore my knitting world",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategories();
  return (
    <html lang="en">
      <body className={lato.className}>
        <Container>
          <CartContextProvider>
            <PreviewProvider>
              <ToastProvider />
              <Navbar categories={categories} />
              {children}
              <Footer />
            </PreviewProvider>
          </CartContextProvider>
        </Container>
      </body>
    </html>
  );
}

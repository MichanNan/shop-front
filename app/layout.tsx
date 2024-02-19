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
import { NextAuthProvider } from "@/components/SessionProvider";
import getUser from "@/actions/get-user";

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

  const user = await getUser();

  return (
    <html lang="en">
      <body className={lato.className}>
        <Container>
          <CartContextProvider>
            {" "}
            <PreviewProvider>
              <ToastProvider />
              <NextAuthProvider>
                <Navbar categories={categories} userId={user?.id} />
                {children}
                <Footer />{" "}
              </NextAuthProvider>
            </PreviewProvider>{" "}
          </CartContextProvider>
        </Container>
      </body>
    </html>
  );
}

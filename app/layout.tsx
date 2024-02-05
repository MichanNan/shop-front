import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { getCategories } from "@/actions/get-categories";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import { PreviewProvider } from "@/hooks/usePreview";

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
        <PreviewProvider>
          <Container>
            <Navbar categories={categories} />
            {children}
          </Container>{" "}
          <Footer />
        </PreviewProvider>
      </body>
    </html>
  );
}

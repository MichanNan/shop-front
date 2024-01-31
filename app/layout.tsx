import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { getCategories } from "@/actions/get-categories";

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
        {" "}
        <Navbar categories={categories} />
        {children}
      </body>
    </html>
  );
}

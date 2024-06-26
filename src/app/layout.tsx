import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LoadingProvider } from "@/components/Context/Loading";
import { RoadProvider } from "@/components/Context/Road";
import { AddressProvider } from "@/components/Context/Address";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Taxi App",
  description: "Taxi 1950",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        {" "}
        <LoadingProvider>
          <RoadProvider>
            <AddressProvider>{children}</AddressProvider>
          </RoadProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}

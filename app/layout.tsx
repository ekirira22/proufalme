import { Providers } from "@/redux/provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Searchbar, Sidebar, MusicPlayer, TopPlay, ClientSideWrapper, Header } from '@/components';

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Melos™️ Music",
  description: "Music Meets Heaven",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body className={font.className}>
          <div className="relative flex">
            <Sidebar />
            <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
              <Header />
              <Searchbar />
              <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
                <div className="flex-1 h-fit pb-40">
                  { children }
                </div>
                <div className="xl:sticky relative top-0 h-fit">
                  <TopPlay />
                </div>
              </div>
            </div>
            <ClientSideWrapper />
          </div>
        </body>
      </html>
    </Providers>
  );
}

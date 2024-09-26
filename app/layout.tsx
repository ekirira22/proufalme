import { Providers } from "@/redux/provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { Searchbar, Sidebar, MusicPlayer, TopPlay, ClientSideWrapper, Header } from '@/components';
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Proufalme™️ Music",
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
          <SupabaseProvider>
            <UserProvider>
              {/* <ModalProvider> */}
                <div className="relative flex bg-[#000000]">
                  <Sidebar />
                  <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#333333] my-2 rounded-lg">
                    <Header />
                    {/* <Searchbar /> */}
                    <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
                      <div className="flex-1 h-fit pb-40">
                        { children }
                      </div>
                      <div className="xl:sticky relative top-0 h-fit">
                        {/* <TopPlay /> */}
                      </div>
                    </div>
                  </div>
                  <ClientSideWrapper />
                </div>
              {/* </ModalProvider> */}
            </UserProvider>
          </SupabaseProvider>
        </body>
      </html>
    </Providers>
  );
}

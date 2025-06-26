import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css"; 
import { Sidebar, Header, Player } from '@/components';
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getSongsByUserId from "@/actions/getSongsByUserId";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Proufalme™️ Music",
  description: "Music Meets Heaven",
};

export const revalidate = 0; // For making this layout non-cacheable

export default async function RootLayout({
  children,
}:{
  children: React.ReactNode;
}) {
  //const userSongs = await getSongsByUserId();

  return (
      <html lang="en">
        <body className={font.className}>
          <ToasterProvider />
          <SupabaseProvider>
            <UserProvider>
              <ModalProvider />
                <Sidebar>
                  { children }
                </Sidebar>
                <Player />
            </UserProvider>
          </SupabaseProvider>
        </body>
      </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { Sidebar, Header } from '@/components';
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
}:{
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
        <body className={font.className}>
          <SupabaseProvider>
            <UserProvider>
              <ModalProvider />
                <Sidebar>
                  { children }
                </Sidebar>
            </UserProvider>
          </SupabaseProvider>
        </body>
      </html>
  );
}

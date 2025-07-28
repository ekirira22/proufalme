"use client";

import Head from "next/head"; 
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUserAlt } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { twMerge } from "tailwind-merge";
import toast from "react-hot-toast";

import { Button } from "@/components";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useSidebarToggle } from "@/hooks/useSidebarToggle";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const authModal = useAuthModal();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const { toggle } = useSidebarToggle();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    router.refresh();
    if (error) toast.error(error.message);
    else toast.success("Logged out!");
  };

  return (
    <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <div
      className={twMerge(
        `mt-2 bg-gradient-to-b from-orange-300 to-orange-700 p-4 md:p-6 rounded-b-2xl shadow-lg`,
        className
      )}
    >
      <div className="relative flex items-center justify-between w-full md:pt-8">
        {/* Left: Hamburger (mobile only) */}
        <div className="w-1/3 flex md:hidden">
          <button
            onClick={toggle}
            className="p-2 bg-white rounded-full hover:opacity-80 transition"
          >
            <HiMenuAlt3 size={20} className="text-black" />
          </button>
        </div>

        {/* Center: Branding */}
        <div
          className="
            flex justify-center
            md:absolute md:left-1/2 md:transform md:-translate-x-1/2
            z-10
          "
        >
          <Link
            href="/"
            className="text-lg md:text-2xl font-bold text-black tracking-wide hover:opacity-80 transition text-center"
          >
            Proufalme
            <span className="text-sm md:text-lg text-blue-700">™</span> Music
          </Link>
        </div>

        {/* Right: Auth Buttons */}
        <div
          className="
            w-1/3 flex justify-end items-center gap-3
            md:absolute md:right-6 md:top-4 md:w-auto z-10
          "
        >
          {!user ? (
            <>
              <button
                onClick={authModal.onOpen}
                className="text-sm md:text-base font-medium text-black hover:underline whitespace-nowrap"
              >
                Sign up
              </button>
              <Button
                onClick={authModal.onOpen}
                className="bg-white text-black px-3 py-1 text-sm md:text-base rounded-full font-semibold"
              >
                Log in
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={handleLogout}
                className="bg-white text-black px-3 py-1 text-sm md:text-base rounded-full font-semibold"
              >
                Logout
              </Button>
              <button
                onClick={() => router.push("/account")}
                className="p-2 bg-white rounded-full hover:opacity-80 transition"
              >
                <FaUserAlt size={18} className="text-black" />
              </button>
            </>
          )}

        </div>
      </div>
      {/* Page content slot */}
      <div className="mt-6">{children}</div>
    </div>
    </>

  );
};

export default Header;

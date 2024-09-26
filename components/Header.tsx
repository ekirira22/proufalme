"use client";

import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { Button } from "@/components";
import React from "react";
import { twMerge } from "tailwind-merge";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header:React.FC<HeaderProps> = ({
  children,
  className
}) => {

  const router = useRouter()

  const handleLogout = () => {
    // Handle logout in the future
  }

  return (
    <div className={twMerge(`h-fit bg-gradient-to-b from-orange-300 p-6 rounded-lg`)}>
      <div className="w-full mb-4 flex items-center justify-between">
        {/* Large Devices  */}
        <div className="hidden md:flex gap-x-2 items-center">
          <button onClick={() => router.back()} className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition">
            <RxCaretLeft size={35} className="text-white" />
          </button>
          <button onClick={() => router.forward()} className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition">
            <RxCaretRight size={35} className="text-white" />
          </button>
        </div>
        {/* Small Devices  */}
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <HiHome className="text-black" size={20} />
          </button>
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        {/* Login Button  */}
        <div className="flex justify-between items-center gap-x-4">
          {/* Empty fragment to make content dynamic depending on whether user is logged in or not  */}
          <>
            <div>
              <Button onClick={() => {}} className="bg-transparent text-neutral-300 font-medium">
                Sign up
              </Button>
            </div>
            <div>
              <Button onClick={() => {}} className="bg-white px-6 py-2 font-medium">
                Log in
              </Button>
            </div>
          </>
        </div>
      </div>
      { children }
    </div>
  );
}

export default Header
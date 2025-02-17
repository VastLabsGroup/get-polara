"use client";

import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const pathname = usePathname();
  const session = useSession();
  const navbarLinks = [
    { name: "Home", url: "/" },
    { name: "Try", url: "/create" },
    // { name: "Profile", url: "/profile" },
  ];

  return (
    <div className="px-8 py-2">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between">
        <Link href="/">
          <Image
            src="/assets/images/logo.jpg"
            alt="logo"
            width={100}
            height={100}
            className="object-scale-cover h-12 w-28 p-2"
          />
        </Link>
        <div className="flex items-center gap-4">
          <ul className="mr-16 flex items-center gap-4 font-sans">
            {navbarLinks.map((link, indx) => (
              <Link
                href={link.url}
                key={indx}
                className={cn(
                  "relative flex h-full items-center justify-center rounded-lg px-6 py-1 hover:cursor-pointer",
                  pathname === link.url && "bg-blue-500 text-white",
                  pathname !== link.url && "hover:bg-blue-500 hover:text-white",
                )}
              >
                {link.name}
                {pathname === link.url && (
                  // <div className="absolute bottom-0 mx-auto w-10/12 border-t border-black"></div>
                  <></>
                )}
              </Link>
            ))}
          </ul>
          {session.status === "authenticated" && (
            <Avatar>
              <AvatarImage src={session.data.user?.image!} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

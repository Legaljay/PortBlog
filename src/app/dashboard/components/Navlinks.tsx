"use client"

import { cn } from "@/lib/utils";
import { PersonIcon, ReaderIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navlinks = () => {
  const pathname = usePathname();
  const links = [
    {
      href: "/dashboard",
      text: "dashboard",
      Icon: ReaderIcon,
    },
    {
      href: "/dashboard/user",
      text: "user",
      Icon: PersonIcon,
    },
  ];
  return (
    <nav className="flex items-center gap-5 border-b pb-2">
      {links.map(({ href, text, Icon }) => {
        return (
          <Link
            key={text}
            href={href}
            className={cn(
              "flex items-center gap-1 hover:underline transition-all",
              { "text-accent underline font-semibold" : pathname === href }
            )}
          >
            <Icon className="h-4 w-4" />/{text}{" "}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navlinks;

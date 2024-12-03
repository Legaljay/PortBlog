"use client";

import Link from "next/link";
import LoginForm from "./LoginForm";
import { useUserStore } from "@/lib/store/user";
import Profile from "./Profile";
import ThemeButton from "../ui/ThemeButton";

const Navbar = () => {
  const user = useUserStore((state) => state.user);
  console.log(user);
  return (
    <header>
      <nav className="flex items-center justify-between">
        <div className="group">
          <Link href="/" className="text-2xl font-bold">
            Legalev
          </Link>
          <div className="h-1 w-0 group-hover:w-full transition-all bg-accent" />
        </div>
        <div className="flex items-center gap-4">
          <Link href="/blog" className="text-sm font-bold">
            blog
          </Link>
          <ThemeButton />
          {user ? <Profile /> : <LoginForm />}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

"use client";

import { useUserStore } from "@/lib/store/user";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Link from "next/link";
import { Button } from "../ui/button";
import { DashboardIcon, LockOpen1Icon } from "@radix-ui/react-icons";
import { createBrowserClient } from "@supabase/ssr";
import { usePathname } from "next/navigation";

const Profile = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const pathname = usePathname();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(undefined);
  };

  const isAdmin = user?.user_metadata?.role === "admin";

  return (
    <Popover key={pathname}>
      <PopoverTrigger>
        <Image
          src={user?.user_metadata?.avatar_url}
          alt={user?.user_metadata?.user_name}
          width={50}
          height={50}
          className="rounded-full ring-2 ring-accent"
        />
      </PopoverTrigger>
      <PopoverContent className="p-2 space-y-3">
        <div className="px-4 text-sm">
          <p>{user?.user_metadata?.user_name}</p>
          <p className="text-gray-500">{user?.user_metadata?.email}</p>
        </div>
        {isAdmin && (
          <Link href="/dashboard" className="block">
            <Button
              variant="ghost"
              className="w-full flex items-center justify-between"
            >
              Dashboard <DashboardIcon />
            </Button>
          </Link>
        )}
        <Button
          variant="ghost"
          className="w-full flex items-center justify-between"
          onClick={handleLogout}
        >
          Logout <LockOpen1Icon />
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default Profile;

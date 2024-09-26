"use client"

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { DotsVerticalIcon, EyeOpenIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import React from "react";

const BlogTable = () => {
    const { resolvedTheme } = useTheme();
  return (
    <div className="overflow-x-auto">
      <div className={cn("border rounded-md w-[800px] md:w-full  bg-gradient-light", { "bg-gradient-dark":  resolvedTheme === "dark" })}>
        <div className="grid grid-cols-5 p-5 text-gray-500 border-b">
          <h1 className="col-span-2">Title</h1>
          <h1>Premium</h1>
          <h1>Publish</h1>
        </div>
        <div className="grid grid-cols-5 p-5">
          <h1 className="col-span-2">Blog title</h1>
          <Switch checked/>
          <Switch/>
          <Actions />
        </div>
      </div>
    </div>
  );
};

const Actions = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <DotsVerticalIcon/>
      </PopoverTrigger>
      <PopoverContent className="w-fit space-y-2">
        <Button variant="ghost" className="flex items-center gap-2 w-full pr-7"><EyeOpenIcon/> View</Button>
        <Button variant="ghost" className="flex items-center gap-2 w-full pr-8"><Pencil1Icon/> Edit</Button>
        <Button variant="destructive" className="flex items-center gap-2"><TrashIcon/> Delete</Button>
      </PopoverContent>
    </Popover>
  );
};
export default BlogTable;

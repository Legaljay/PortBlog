"use client"

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { DotsVerticalIcon, EyeOpenIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { IBlog } from "@/lib/types";
import { useRouter } from "next/navigation";
import DeleteAlertButton from "./DeleteAlertButton";
import SwitchForm from "./SwitchForm";
import { updateBlogById } from "@/lib/actions/blog";


type BlogWithoutContent = Omit<IBlog, 'content'>;

export default function Table({ blogs = [] }:{ blogs: BlogWithoutContent[] }) {
    const { resolvedTheme } = useTheme();
  return (
    <div className="overflow-x-auto">
      <div className={cn("border rounded-md w-[800px] md:w-full  bg-gradient-light", { "bg-gradient-dark":  resolvedTheme === "dark" })}>
        <div className="grid grid-cols-5 p-5 text-gray-500 border-b">
          <h1 className="col-span-2">Title</h1>
          <h1>Premium</h1>
          <h1>Publish</h1>
        </div>
        {blogs?.map((blog, index) => { 
            const updatePremium = updateBlogById.bind(null, blog.id, { ...blog, is_premium: !blog.is_premium} as IBlog);
            const updatePublished = updateBlogById.bind(null, blog.id, {...blog, is_published: !blog.is_published} as IBlog);
            return (
            <div key={index} className="grid grid-cols-5 p-5">
                <h1 className="col-span-2">{blog?.title}</h1>
                <SwitchForm checked={blog?.is_premium} onToggle={updatePremium} name="premium"/>
                <SwitchForm checked={blog?.is_published} onToggle={updatePublished} name="published"/>
                <Actions id={blog?.id}/>
            </div>
        )})}
      </div>
    </div>
  );
};

const Actions = ({ id }:{ id: string }) => {
    
    const { push } = useRouter();
    const handleEdit = () => { push(`/dashboard/blog/edit/${id}`) };
    const handleView = () => { push(`blog/${id}`) };

    return (
      <Popover>
        <PopoverTrigger>
          <DotsVerticalIcon/>
        </PopoverTrigger>
        <PopoverContent className="w-fit space-y-2">
          <Button onClick={handleView} variant="ghost" className="flex items-center gap-2 w-full pr-7"><EyeOpenIcon/> View</Button>
          <Button onClick={handleEdit} variant="ghost" className="flex items-center gap-2 w-full pr-8"><Pencil1Icon/> Edit</Button>
          <DeleteAlertButton blogId={id}/>
        </PopoverContent>
      </Popover>
    );
};
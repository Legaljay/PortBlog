"use client";
import React from "react";

import { toast } from "@/hooks/use-toast"
import { defaultCreateBlog } from "@/lib/data";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

import { useRouter } from "next/navigation";
import { BlogFormSchemaType } from "../blog/schema";
import BLogForm from "./BlogForm";
import { IBlogDetail } from "@/lib/types";
import { updateBlogDetail } from "@/lib/actions/blog";

export default function EditForm({ blog }:{ blog: IBlogDetail}) {
	const router = useRouter();

	const handleEdit = async (data: BlogFormSchemaType) => {
        if (!blog?.id) {
			toast({
				title: "Blog ID is missing",
				description: "Cannot update blog without a valid ID.",
			});
			return;
		}

		const result = JSON.parse(await updateBlogDetail(blog.id, data));

		const { error } = result as PostgrestSingleResponse<null>;
		if (error?.message) {
			toast({
				title: "Fail to edited the post 😢",
				description: (
					<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
						<code className="text-white">{error.message}</code>
					</pre>
				),
			});
		} else {
			toast({
				title: "Successfully edited the post 🎉",
				description: data.title,
			});
			router.push("/dashboard");
		}
	};

	return (
		<BLogForm
			onHandleSubmit={handleEdit}
			defaultBlog={blog ?? defaultCreateBlog}
		/>
	);
}
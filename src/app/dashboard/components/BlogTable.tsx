import { readBlogAdmin } from "@/lib/actions/blog";
import Table from "./Table";

export default async function BlogTable() {
    const { data: blogs } = await readBlogAdmin();
    const blogList = blogs ?? [];
    console.log(blogs);
  return (
    <Table blogs={blogList}/>
  );
};


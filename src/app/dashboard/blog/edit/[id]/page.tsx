import EditForm from "@/app/dashboard/components/EditForm"
import { readBlogDetailById } from "@/lib/actions/blog"

export default async function EditPage({ params }: { params: { id: string} }){
    const { data: blog } = await readBlogDetailById(params?.id)

    return(
        <EditForm blog={blog!}/>
    )
}
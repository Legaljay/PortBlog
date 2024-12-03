"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  DownloadIcon,
  EyeOpenIcon,
  Pencil1Icon,
  RocketIcon,
  StarIcon,
  ValueIcon,
} from "@radix-ui/react-icons";
import { useState, useTransition } from "react";
import { BlogFormSchema, BlogFormSchemaType } from "../blog/schema";
import { IBlogDetail } from "@/lib/types";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import MarkdownPreview from "@/components/markdown/MarkdownPreview";

export type BlogFormProps = {
  defaultBlog: IBlogDetail;
  onHandleSubmit: (data: BlogFormSchemaType) => void;
};

export default function BLogForm({
  onHandleSubmit,
  defaultBlog,
}: BlogFormProps) {
  const [isPending, startTransition] = useTransition();
  const [isPreview, setPreivew] = useState(false);

  const form = useForm<z.infer<typeof BlogFormSchema>>({
    mode: "all",
    resolver: zodResolver(BlogFormSchema),
    defaultValues: {
      title: defaultBlog?.title,
      content: defaultBlog?.blog_content?.content ?? "",
      image_url: defaultBlog?.image_url,
      is_premium: defaultBlog?.is_premium,
      is_published: defaultBlog?.is_published,
    },
  });

  const onSubmit = (data: z.infer<typeof BlogFormSchema>) => {
    startTransition(() => {
      onHandleSubmit(data);
    });
  };


  return (
    <Form {...form}>
      <div className="p-5 border-b flex gap-5 items-center flex-wrap justify-between">
        <div className="flex gap-5 items-center flex-wrap">
          <Button
            type="button"
            variant="outline"
            tabIndex={0}
            className="flex items-center gap-1 p-2 rounded-md hover:ring-2 hover:ring-zinc-400 transition-all"
            onClick={() => setPreivew(!isPreview && !form.getFieldState("image_url").invalid)}
          >
            {isPreview ? (
              <>
                <Pencil1Icon /> Edit
              </>
            ) : (
              <>
                <EyeOpenIcon />
                Preview
              </>
            )}
          </Button>
          <FormField
            control={form.control}
            name="is_premium"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center gap-1 border p-2 rounded-md">
                    <StarIcon />
                    <span className="text-sm">Premium</span>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="is_published"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center gap-1 border p-2 rounded-md">
                    <RocketIcon />
                    <span className="text-sm">Publish</span>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className={cn("flex items-center gap-2")}
          disabled={!form.formState.isValid}
        >
          {!isPending ? <><DownloadIcon /> Save</> : <><ValueIcon className={isPending && "animate-spin"}/></>}
        </Button>
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full border rounded-md space-y-6 pb-10"
      >
        {/* title field */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div
                  className={cn(
                    "p-2 w-full flex break-words gap-2",
                    isPreview ? "divide-x-0" : "divide-x"
                  )}
                >
                  <Input
                    placeholder="title"
                    {...field}
                    className={cn(
                      "text-sm bg-inherit font-medium leading-relaxed placeholder:text-sm",
                      isPreview ? "w-0 p-0" : "w-full lg:w-1/2"
                    )}
                  />
                  <div
                    className={cn(
                      "lg:px-10",
                      isPreview
                        ? "mx-auto w-full lg:w-4/5"
                        : "w-1/2 lg:block hidden"
                    )}
                  >
                    <h1 className="text-3xl font-medium">
                      {form.getValues().title}
                    </h1>
                  </div>
                </div>
              </FormControl>
              {form.getFieldState("title").invalid &&
                form.getValues().title && <FormMessage className="p-2" />}
            </FormItem>
          )}
        />
        {/* image field */}
        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div
                  className={cn(
                    "p-2 w-full flex break-words gap-2",
                    isPreview ? "divide-x-0" : "divide-x"
                  )}
                >
                  <Input
                    placeholder="image_url"
                    {...field}
                    className={cn(
                      "text-sm font-medium leading-relaxed placeholder:text-sm",
                      isPreview ? "w-0 p-0" : "w-full lg:w-1/2"
                    )}
                  />
                  <div
                    className={cn(
                      "lg:px-10",
                      isPreview
                        ? "mx-auto w-full lg:w-4/5"
                        : "w-1/2 lg:block hidden"
                    )}
                  >
                    {!isPreview ? (
                      <p>Click on Preview to see image</p>
                    ) : (
                      <div className="relative h-80 mt-5 border rounded-md">
                        <Image
                          src={form.getValues().image_url}
                          alt="preview"
                          fill
                          className="object-cover object-center rounded-md"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </FormControl>
              {form.getFieldState("image_url").invalid &&
                form.getValues().image_url && <FormMessage className="p-2" />}
            </FormItem>
          )}
        />
        {/* content field */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div
                  className={cn(
                    "p-2 w-full flex break-words gap-2",
                    isPreview ? "divide-x-0" : "divide-x h-70vh"
                  )}
                >
                  <Textarea
                    placeholder="content"
                    {...field}
                    className={cn(
                      "text-sm font-medium leading-relaxed resize-none h-full placeholder:text-sm",
                      isPreview ? "w-0 p-0" : "w-full lg:w-1/2"
                    )}
                  />
                  <div
                    className={cn(
                      "lg:px-10 overflow-y-auto",
                      isPreview
                        ? "mx-auto w-full lg:w-4/5"
                        : "w-1/2 lg:block hidden"
                    )}
                  >
                    <MarkdownPreview content= {form.getValues().content} />
                  </div>
                </div>
              </FormControl>
              {form.getFieldState("content").invalid &&
                form.getValues().content && <FormMessage className="p-2" />}
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={!form.formState.isValid}
          className="m-2"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}

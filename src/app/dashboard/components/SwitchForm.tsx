"use client";

import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import React from "react";

const SwitchForm = ({
  checked,
  onToggle,
  name,
}: {
  checked: boolean;
  onToggle: () => Promise<string>;
  name: string;
}) => {
  const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //toggle premium or published
    const { error } = JSON.parse(await onToggle());

    if(error?.message) {
        toast({
            title: "Fail to update " + name,
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{error.message}</code>
              </pre>
            ),
        });
    } else {
        toast({
            title: "Successfully deleted " + name,
        });
    }

 };

  return (
    <form onSubmit={onSubmit}>
      <Switch checked={checked} type="submit" />
    </form>
  );
};

export default SwitchForm;

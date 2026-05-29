"use client";

import { Button } from "@/components/ui/button";
import { Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton({ text = "Go Back" }) {
  const router = useRouter();

  return (
    <div className="mt-20 mb-10 flex items-center px-5">
      <Button
        variant="outline"
        onClick={() => router.back()}
        className="flex items-center gap-2"
      >
        <Undo2 className="size-4" />
        {text}
      </Button>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Undo2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function BackButton({ text = "Go Back" }) {
  const navigate = useNavigate();

  return (
    <div className="mt-20 mb-10 flex items-center">
      <Button
        variant="outline"
        onClick={() => navigate(-1)}
        className="flex items-center gap-2"
      >
        <Undo2 className="size-4" />
        {text}
      </Button>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const Icon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      strokeWidth="1"
      stroke="currentColor"
      className={cn("text-foreground absolute size-6", className)}
    >
      <title>Icon</title>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};

const Icons = () => (
  <>
    <Icon className="-top-3 -left-3" />
    <Icon className="-top-3 -right-3" />
    <Icon className="-bottom-3 -left-3" />
    <Icon className="-right-3 -bottom-3" />
  </>
);

export const CardCta = ({ title, children }) => {
  return (
    <Card className="relative rounded-none shadow-none bg-linear-to-br from-neutral-100/60 via-white to-neutral-200/30 dark:bg-linear-to-br dark:from-black/40 dark:via-neutral-950 dark:to-black/50  mx-3 ">
      
      <Icons />
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export const CardCta = ({ title, children }) => {
  return (
    <Card className="relative rounded-none shadow-none bg-linear-to-br from-neutral-100/60 via-white to-neutral-200/30 dark:bg-linear-to-br dark:from-black/40 p-0 m-0 dark:via-neutral-950 dark:to-black/50  mx-3 ">
      
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

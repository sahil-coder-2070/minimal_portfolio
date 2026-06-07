import type { Metadata } from "next";
import GearsPage from "@/components/gear/Gear";

export const metadata: Metadata = {
  title: "Gears & Software Setup",
  description: "A detailed list of the devices, software, and web extensions I use to get my work done.",
  alternates: {
    canonical: "/gear",
  },
  openGraph: {
    title: "Gears & Software Setup",
    description: "A detailed list of the devices, software, and web extensions I use to get my work done.",
    url: "/gear",
  },
};

export default function GearPage() {
  return <GearsPage />;
}

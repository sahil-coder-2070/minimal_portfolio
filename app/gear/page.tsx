import type { Metadata } from "next";
import GearsPage from "@/app/gear/Gear";

export const metadata: Metadata = {
  title: "Gears & Software Setup",
  description: "A detailed list of the devices, software, and web extensions I use to get my work done.",
};

export default function GearPage() {
  return <GearsPage />;
}

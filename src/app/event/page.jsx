export const runtime = "edge";
import { redirect } from "next/navigation";

export default function EventIndex() {
  redirect("/event/0");
}

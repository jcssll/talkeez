import { AudiencePage } from "@/components/site/AudiencePage";
import { audiences } from "@/config/site";

export default function ForEducators() {
  return <AudiencePage cfg={audiences.find((a) => a.slug === "educators")!} />;
}

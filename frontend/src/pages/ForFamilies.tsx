import { AudiencePage } from "@/components/site/AudiencePage";
import { audiences } from "@/config/site";

export default function ForFamilies() {
  return <AudiencePage cfg={audiences.find((a) => a.slug === "families")!} />;
}

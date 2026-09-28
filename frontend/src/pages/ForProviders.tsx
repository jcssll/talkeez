import { AudiencePage } from "@/components/site/AudiencePage";
import { audiences } from "@/config/site";

export default function ForProviders() {
  return <AudiencePage cfg={audiences.find((a) => a.slug === "providers")!} />;
}

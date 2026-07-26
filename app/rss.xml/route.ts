import { generateResearchRss } from "@/lib/content/generated";
import { getPublicResearch } from "@/lib/content/research";

export const dynamic = "force-static";

export async function GET() {
  const research = await getPublicResearch();
  return new Response(generateResearchRss(research), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}

import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { revalidatePrismicPages } from "@prismicio/next";
import { PRISMIC_CACHE_TAG } from "@/lib/content";

/**
 * Called by a Prismic webhook when content is published or unpublished.
 * If PRISMIC_WEBHOOK_SECRET is set, the webhook's secret must match it.
 */
export async function POST(request: Request) {
  const body = await request.json();

  const secret = process.env.PRISMIC_WEBHOOK_SECRET;
  if (secret && body.secret !== secret) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  if (body.type === "api-update") {
    revalidatePrismicPages(body.documents ?? []);
    revalidateTag(PRISMIC_CACHE_TAG, { expire: 0 });
  }

  return NextResponse.json({ revalidated: true, now: Date.now() });
}

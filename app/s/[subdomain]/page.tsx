import { ComponentRenderer } from "@/components/ComponentRenderer";
import { getBusiness } from "@/lib/business";
import { SiteLayoutSchema } from "@/schema";
import { notFound } from "next/navigation";

export default async function HomePage({
  params,
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;
  const business = await getBusiness("slug", subdomain);
  if (!business) notFound();

  const siteLayout = SiteLayoutSchema.parse(business.layout ?? {});
  const homeLayout = siteLayout.home.filter((component) => component.isVisible);
  return <ComponentRenderer layout={homeLayout} business={business} />;
}

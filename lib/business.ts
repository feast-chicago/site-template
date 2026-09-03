import { Business } from "@/schema";
import { unstable_cache } from "next/cache";
import { supabase } from "./supabase";

async function fetchFromSupabase(
  field: "id" | "slug",
  value: string,
): Promise<Business> {
  const { data, error } = await supabase()
    .from("businesses")
    .select("*")
    .eq(field, value)
    .single();

  if (error) throw new Error(`Failed to fetch business: ${error.message}`);
  if (!data) throw new Error("Business not found");

  return data as Business;
}

const fetchBusinessCached = unstable_cache(fetchFromSupabase, ["business"], {
  revalidate: 3600,
  tags: ["business"],
});

export async function getBusiness(
  field: "id" | "slug",
  value: string,
): Promise<Business> {
  // In development, skip the cache entirely so changes show up immediately.
  if (process.env.NODE_ENV === "development") {
    return fetchFromSupabase(field, value);
  }
  return fetchBusinessCached(field, value);
}

import config from "@/feast.config";
import { Business } from "@/schema";
import { unstable_cache } from "next/cache";
import { supabase } from "./supabase";

const fetchBusiness =
  // TODO: Fix this.
  // unstable_cache(
  async (id: string): Promise<Business> => {
    const { data, error } = await supabase()
      .from("businesses")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(`Failed to fetch business: ${error.message}`);
    if (!data) throw new Error("Business not found");

    return data as Business;
  };
// ["business"],
// {
//   revalidate: process.env.NODE_ENV === "development" ? 0 : 3600,
//   tags: ["business"],
// },
// );

export async function getBusiness(): Promise<Business> {
  return fetchBusiness(config.id);
}

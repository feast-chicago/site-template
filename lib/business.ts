import config from "@/feast.config";
import { Business } from "@/schema";
import { supabase } from "./supabase";

export async function getBusiness() {
  const { data, error } = await supabase()
    .from("businesses")
    .select("*")
    .eq("id", config.id)
    .single();

  if (error) throw new Error(`Failed to fetch business: ${error.message}`);
  if (!data) throw new Error("Business not found.");
  return data as Business;
}

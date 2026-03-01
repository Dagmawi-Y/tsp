import { get } from "@vercel/edge-config";
import { supabase } from "./supabase";

export async function getApplicationStatus() {
  try {
    // 1. Try to get from Supabase first (controlled by dashboard)
    const { data: dbSetting, error } = await supabase
      .from("settings")
      .select("value")
      .eq("key", "isApplicationOpen")
      .single();

    if (!error && dbSetting) {
      return dbSetting.value === "true" || dbSetting.value === true;
    }

    // 2. Fallback to Edge Config (Vercel)
    if (!process.env.EDGE_CONFIG) {
      return false;
    }

    const isOpen = await get<boolean>("isApplicationOpen");
    return isOpen ?? false;
  } catch (error) {
    console.error("Config fetch error:", error);
    return false;
  }
}

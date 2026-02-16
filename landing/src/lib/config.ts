import { get } from "@vercel/edge-config";

export async function getApplicationStatus() {
  // If we are in local development without EDGE_CONFIG set up,
  // return false as a default to avoid errors.
  if (!process.env.EDGE_CONFIG) {
    return false;
  }

  try {
    const isOpen = await get<boolean>("isApplicationOpen");
    return isOpen ?? false;
  } catch (error) {
    console.error("Edge Config error:", error);
    return false;
  }
}

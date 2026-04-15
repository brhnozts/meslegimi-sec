export const supabaseConfig = {
  url: "https://akhkkghvhuggkkhqgejv.supabase.co",
  publishableKey: "sb_publishable_OK79ARgF8x4lnE3bHqtdPQ_G5PeS-3x",
  schema: "public"
};

export function hasSupabaseConfig() {
  return Boolean(supabaseConfig.url && (supabaseConfig.publishableKey || supabaseConfig.anonKey));
}

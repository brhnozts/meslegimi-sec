import { createClient } from "@supabase/supabase-js";

export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || "https://akhkkghvhuggkkhqgejv.supabase.co",
  publishableKey:
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    "sb_publishable_OK79ARgF8x4lnE3bHqtdPQ_G5PeS-3x",
  schema: "public"
};

export function hasSupabaseConfig() {
  return Boolean(supabaseConfig.url && supabaseConfig.publishableKey);
}

export function createSupabaseClient() {
  if (!hasSupabaseConfig()) return null;
  return createClient(supabaseConfig.url, supabaseConfig.publishableKey, {
    db: { schema: supabaseConfig.schema },
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    }
  });
}

export async function getSupabaseHealth() {
  if (!hasSupabaseConfig()) {
    return {
      configured: false,
      connected: false,
      message: "Supabase ortam değişkenleri henüz tanımlanmadı."
    };
  }

  try {
    const response = await fetch(`${supabaseConfig.url}/auth/v1/settings`, {
      headers: { apikey: supabaseConfig.publishableKey },
      cache: "no-store"
    });

    return {
      configured: true,
      connected: response.ok,
      message: response.ok ? "Supabase bağlantısı doğrulandı." : `Supabase yanıt kodu: ${response.status}`
    };
  } catch (error) {
    return {
      configured: true,
      connected: false,
      message: `Bağlantı doğrulanamadı: ${error.message}`
    };
  }
}

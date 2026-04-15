import { hasSupabaseConfig, supabaseConfig } from "./supabase-config.js";

let supabaseInstance = null;

export async function getSupabaseClient() {
  if (!hasSupabaseConfig()) return null;
  if (supabaseInstance) return supabaseInstance;

  const { createClient } = await import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm");
  const key = supabaseConfig.publishableKey || supabaseConfig.anonKey;
  supabaseInstance = createClient(supabaseConfig.url, key, {
    db: { schema: supabaseConfig.schema || "public" },
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    }
  });

  return supabaseInstance;
}

export async function getSupabaseHealth() {
  if (!hasSupabaseConfig()) {
    return {
      configured: false,
      connected: false,
      message: "Supabase anahtarları henüz eklenmedi."
    };
  }

  try {
    const client = await getSupabaseClient();
    if (!client) {
      return {
        configured: true,
        connected: false,
        message: "Supabase istemcisi başlatılamadı."
      };
    }

    const { error } = await client.auth.getSession();
    return {
      configured: true,
      connected: !error,
      message: error ? `Bağlantı kontrolünde hata: ${error.message}` : "Supabase istemcisi hazır."
    };
  } catch (error) {
    return {
      configured: true,
      connected: false,
      message: `Bağlantı kontrolünde hata: ${error.message}`
    };
  }
}

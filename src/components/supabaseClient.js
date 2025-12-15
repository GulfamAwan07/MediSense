import { createClient } from "@supabase/supabase-js";
const supabaseURL = import.meta.env.VITE_Supabase_URL;
const anonKey = import.meta.env.VITE_ANON_Key;

export const supabase = createClient(supabaseURL, anonKey);

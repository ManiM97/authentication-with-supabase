import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPAURL;
const anonurl = import.meta.env.VITE_ANONURL;

const supabase = createClient(url,anonurl)

export default supabase;
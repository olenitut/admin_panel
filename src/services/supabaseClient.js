import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://jgvwhtcbfsowpodxhhpe.supabase.co";
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpndndodGNiZnNvd3BvZHhoaHBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg3MTQ2NDUsImV4cCI6MjAwNDI5MDY0NX0.rujj-6oaJSlcTGjSKTm8V-ciA-Pksjjw7U6CIHbWEPs`;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

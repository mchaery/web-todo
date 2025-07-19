import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = import.meta.env.VITE_APP_SUPERBASE_URL;
// const supabaseKey = import.meta.env.VITE_APP_SUPERBASE_KEY;

const supabaseUrl = 'https://japsmhgzcqeqcumijfjg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphcHNtaGd6Y3FlcWN1bWlqZmpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5MDQ2MTQsImV4cCI6MjA2ODQ4MDYxNH0.cVMN3pmPLMSEsWCeNDdvpxytrhikSImSenN3W8NqOcs'
export const supabase = createClient(supabaseUrl, supabaseKey)

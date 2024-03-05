const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://nnnfcaicnnrvlvfnbqdh.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ubmZjYWljbm5ydmx2Zm5icWRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcxODA0MjgsImV4cCI6MjAyMjc1NjQyOH0.9hRcAO7LLgaMtCqqJN7oq3_1Xzssz-GapF4vbcsakUQ'


const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = { supabase };
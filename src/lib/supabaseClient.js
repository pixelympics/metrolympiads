import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
    'https://Pixelympics.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmaGF2bWx3b21yeW1naXJ6Y3VuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEwMDYxNDEsImV4cCI6MjAyNjU4MjE0MX0.9CQR8wr6zoBODqIyl5V5AbqqCP5nOnj-36LFO3oD9Go'
);

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://coxvmarnuktmwnvhprto.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNveHZtYXJudWt0bXdudmhwcnRvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNDAyNDY5MCwiZXhwIjoyMDQ5NjAwNjkwfQ.-plsDpPdUvDgHR6WO5FA4N6CtKju6y_3EdXdvcAbed4';

export const supabase = createClient(supabaseUrl, supabaseKey);
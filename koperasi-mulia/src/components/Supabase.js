import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vfwdaqldtgewfbehigkj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmd2RhcWxkdGdld2ZiZWhpZ2tqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM3NTQyMTcsImV4cCI6MjAxOTMzMDIxN30.Pb0vZDSTdPnnu-T-C1OZbxKG3o0mPRu2eVVpxQec3vE';
const Supabase = createClient(supabaseUrl, supabaseKey);
export default Supabase;
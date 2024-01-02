import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_URL
const supabaseKey = process.env.REACT_APP_APIKEY
const Supabase = createClient(supabaseUrl, supabaseKey);
export default Supabase;
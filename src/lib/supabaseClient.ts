
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/integrations/supabase/types'

const supabaseUrl = 'https://blvqoxwphootxstvffsh.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsdnFveHdwaG9vdHhzdHZmZnNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MjU3MjcsImV4cCI6MjA2NTUwMTcyN30.GNWPt_6VOP6JdkICayom0D5ZOwfIE5BQcVVly7CDUbQ'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

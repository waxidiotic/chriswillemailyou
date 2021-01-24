import React from 'react';
import { createClient, Session, SupabaseClient } from '@supabase/supabase-js';

type SbSession = Session | null;

const supabaseUrl = 'https://sugzkgepgdkjitrzrpms.supabase.co';
const supabaseKey = import.meta.env.SNOWPACK_PUBLIC_SUPABASE_KEY;
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

const useSession = () => {
  const [session, setSession] = React.useState<SbSession>(null);

  React.useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
      },
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return session;
};

const useSupabase = () => supabase;

export { useSession, useSupabase };

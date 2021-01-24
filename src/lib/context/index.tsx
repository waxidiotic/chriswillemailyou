import React from 'react';
import { createClient } from '@supabase/supabase-js';
import type { Session, SupabaseClient, User } from '@supabase/supabase-js';

type SbUser = User | null;
type SbSession = Session | null;

interface AuthSession {
  user: SbUser;
  session: SbSession;
  sb: SupabaseClient;
}

const supabaseUrl = 'https://sugzkgepgdkjitrzrpms.supabase.co';
const supabaseKey = import.meta.env.SNOWPACK_PUBLIC_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

export const UserContext = React.createContext<AuthSession>({
  user: null,
  session: null,
  sb: supabase,
});

interface UserContextProviderProps {
  children: any;
}

export const UserContextProvider = ({ ...props }: UserContextProviderProps) => {
  const [session, setSession] = React.useState<SbSession>(null);
  const [user, setUser] = React.useState<SbUser>(null);
  const sb = supabase;

  React.useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      },
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const value = { session, user, sb };

  return (
    <UserContext.Provider value={value} {...props}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserContextProvider.');
  }
  return context;
};

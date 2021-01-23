import React from 'react';
import type { Session, SupabaseClient, User } from '@supabase/supabase-js';

type SbUser = User | null;
type SbSession = Session | null;

interface AuthSession {
  user: SbUser;
  session: SbSession;
}

const UserContext = React.createContext<AuthSession>({
  user: null,
  session: null,
});

interface UserContextProviderProps {
  supabaseClient: SupabaseClient;
  children: any;
}

export const UserContextProvider = ({
  supabaseClient,
  ...props
}: UserContextProviderProps) => {
  const [session, setSession] = React.useState<SbSession>(null);
  const [user, setUser] = React.useState<SbUser>(null);

  React.useEffect(() => {
    const session = supabaseClient.auth.session();
    setSession(session);
    setUser(session?.user ?? null);
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      },
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const value = { session, user };

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

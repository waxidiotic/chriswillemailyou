import React from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';

import LoginPage from './pages/login';

interface AppProps {
  sb: SupabaseClient;
}

import { UserContextProvider } from './lib/context';

function App({ sb }: AppProps) {
  return (
    <UserContextProvider supabaseClient={sb}>
      <LoginPage />
    </UserContextProvider>
  );
}

export default App;

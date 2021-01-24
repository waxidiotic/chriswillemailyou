import React from 'react';
import { useSession } from './lib/hooks';
import HomePage from './pages/home';
import LoginPage from './pages/login';

function App() {
  const session = useSession();

  return session?.user ? <HomePage /> : <LoginPage />;
}

export default App;

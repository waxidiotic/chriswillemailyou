import React from 'react';
import { useSession } from './lib/hooks';
import LoginPage from './pages/login';

function App() {
  const session = useSession();
  return session?.user ? <div>LoggedIn</div> : <LoginPage />;
}

export default App;

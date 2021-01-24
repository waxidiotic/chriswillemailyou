import React from 'react';

import LoginPage from './pages/login';

import { UserContextProvider } from './lib/context';

function App() {
  return (
    <UserContextProvider>
      <LoginPage />
    </UserContextProvider>
  );
}

export default App;

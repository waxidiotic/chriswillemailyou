import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import type { SupabaseClient } from '@supabase/supabase-js';

interface AppProps {
  sb: SupabaseClient;
}

function App({ sb }: AppProps) {
  // Create the count state.
  const [count, setCount] = useState(0);
  // Create the counter (+1 every second).
  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1000);
    return () => clearTimeout(timer);
  }, [count, setCount]);
  // Return the App component.

  useEffect(() => {
    async function getData() {
      const { data: people } = await sb.from('people').select('name');
      console.log(people);
    }

    getData();
  }, []);

  return (
    <div className="App">
      <Button type="primary">Add</Button>
    </div>
  );
}

export default App;

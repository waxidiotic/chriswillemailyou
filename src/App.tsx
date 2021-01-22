import React, { useState, useEffect } from 'react';
import { Space } from 'antd';
import type { SupabaseClient } from '@supabase/supabase-js';

import { Table } from './components/table';

import css from './global.module.scss';
import { TableControls } from './components/table-controls';

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
    <div className={css.layout}>
      <div className={css.header}>
        You are logged in as <b>Alex Bussey</b>
      </div>
      <div className={css.content}>
        <TableControls />
        <Table />
      </div>
      <div className={css.footer}>Footer</div>
    </div>
  );
}

export default App;

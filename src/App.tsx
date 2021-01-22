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
  return (
    <div className={css.layout}>
      <div className={css.header}>
        You are logged in as <b>Alex Bussey</b>
      </div>
      <div className={css.content}>
        <TableControls />
        <Table sb={sb} />
      </div>
      <div className={css.footer}>Footer</div>
    </div>
  );
}

export default App;

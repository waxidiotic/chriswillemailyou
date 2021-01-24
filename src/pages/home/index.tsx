import React from 'react';
import { Button, Space } from 'antd';
import { Table } from '../../components/table';
import { TableControls } from '../../components/table-controls';
import { useSupabase } from '../../lib/hooks';

import css from './style.module.scss';

function HomePage() {
  const supabase = useSupabase();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={css.layout}>
      <div className={css.header}>
        <Space>
          You are logged in as <b>Alex Bussey</b>
          <Button type="link" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Space>
      </div>
      <div className={css.content}>
        <TableControls />
        <Table />
      </div>
      <div className={css.footer}>Footer</div>
    </div>
  );
}

export default HomePage;

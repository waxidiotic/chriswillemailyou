import React from 'react';
import { Table as AntTable } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import type { SupabaseClient } from '@supabase/supabase-js';

interface Check {
  key: string; // uuid
  venue: string;
  people: string[];
  total?: number;
  items?: any;
  paid: boolean;
}

const columns: ColumnsType<Check> = [
  {
    key: 'date',
    title: 'Date',
    dataIndex: 'date',
  },
  {
    key: 'venue',
    title: 'Venue',
    dataIndex: 'venue',
  },
  {
    key: 'people',
    title: 'People',
    dataIndex: 'people',
  },
  {
    key: 'total',
    title: 'Total',
    dataIndex: 'total',
  },
  {
    key: 'paid',
    title: 'Paid',
    dataIndex: 'paid',
  },
];

export default function Table({ sb }: { sb: SupabaseClient }) {
  const [data, setData] = React.useState<Check[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    async function fetchChecks() {
      setIsLoading(true);
      const { data: checks } = await sb.from('checks').select('*');

      if (checks) {
        const mappedData = checks.map((check) => {
          const { id, vendor, people, items, total, paid } = check;
          return {
            key: id,
            venue: vendor,
            people,
            items,
            total,
            paid,
          };
        });
        setData(mappedData);
      }
    }

    fetchChecks().then(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <AntTable<Check>
      columns={columns}
      rowKey={(record) => record.key}
      dataSource={data}
      loading={isLoading}
    />
  );
}

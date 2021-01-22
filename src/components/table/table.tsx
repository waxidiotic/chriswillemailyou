import React from 'react';
import { Table as AntTable } from 'antd';

const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
  },
  {
    title: 'Venue',
    dataIndex: 'venue',
  },
  {
    title: 'People',
    dataIndex: 'people',
  },
  {
    title: 'Total',
    dataIndex: 'total',
  },
  {
    title: 'Paid',
    dataIndex: 'paid',
  },
];

export default function Table() {
  return <AntTable columns={columns} dataSource={undefined} />;
}

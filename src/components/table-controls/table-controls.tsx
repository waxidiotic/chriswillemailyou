import React from 'react';
import { Space, Button } from 'antd';

export default function TableControls() {
  return (
    <Space>
      <Button type="primary">Add</Button>
      <Button disabled>Clone</Button>
      <Button danger disabled>
        Delete
      </Button>
    </Space>
  );
}

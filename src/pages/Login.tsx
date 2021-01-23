import React from 'react';
import { Button, Card, Input, Space } from 'antd';

export default function LoginPage() {
  const [emailAddress, setEmailAddress] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const handleEmailInput = (e: React.FormEvent) =>
    setEmailAddress((e.target as HTMLInputElement).value);

  const handlePasswordInput = (e: React.FormEvent) =>
    setPassword((e.target as HTMLInputElement).value);

  const handleLogin = () => {
    // create useSupabase hook than login
  };

  const handleRegister = () => {
    // create useSupabase hook than register
  };

  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
      <Card style={{ width: 320, margin: '0 auto' }}>
        <Space size="middle" direction="vertical" style={{ width: '100%' }}>
          <div>
            <h4>Email Address</h4>
            <Input
              type="email"
              id="email"
              value={emailAddress}
              onChange={handleEmailInput}
            />
          </div>
          <div>
            <h4>Password</h4>
            <Input.Password
              id="password"
              value={password}
              onChange={handlePasswordInput}
            />
          </div>
          <Space>
            <Button type="primary" onClick={handleLogin}>
              Login
            </Button>
            <Button onClick={handleRegister}>Register</Button>
          </Space>
        </Space>
      </Card>
    </div>
  );
}

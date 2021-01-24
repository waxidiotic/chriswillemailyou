import React from 'react';
import { Button, Card, Input, Space } from 'antd';
import { UserContext } from '../../lib/context';
import type { AuthType, Credentials } from './types';

export default function LoginPage() {
  const [emailAddress, setEmailAddress] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [authMethod, setAuthMethod] = React.useState<AuthType>('PASSWORD');
  const { sb } = React.useContext(UserContext);

  const handleEmailInput = (e: React.FormEvent) =>
    setEmailAddress((e.target as HTMLInputElement).value);

  const handlePasswordInput = (e: React.FormEvent) =>
    setPassword((e.target as HTMLInputElement).value);

  const handleLogin = async () => {
    setIsLoading(true);
    const credentials: Credentials = { email: emailAddress };
    if (authMethod === 'PASSWORD') {
      credentials.password = password;
    }
    try {
      await sb.auth.signIn(credentials);
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  const handleRegister = async () => {
    if (authMethod === 'MAGIC_LINK') {
      setAuthMethod('PASSWORD');
      return;
    }
    try {
      await sb.auth.signUp({
        email: emailAddress,
        password,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleMagicLinkToggle = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthMethod(authMethod === 'PASSWORD' ? 'MAGIC_LINK' : 'PASSWORD');
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
          {authMethod === 'PASSWORD' ? (
            <div>
              <h4>Password</h4>
              <Input.Password
                id="password"
                value={password}
                onChange={handlePasswordInput}
              />
            </div>
          ) : null}
          <Space>
            <Button type="primary" loading={isLoading} onClick={handleLogin}>
              {authMethod === 'PASSWORD' ? 'Login' : 'Request Magic Link'}
            </Button>
            <Button onClick={handleRegister}>Register</Button>
          </Space>
          <span>
            <a href="#" onClick={handleMagicLinkToggle}>
              {authMethod === 'PASSWORD'
                ? 'Request a magic link instead'
                : 'Use your password instead'}
            </a>
          </span>
        </Space>
      </Card>
    </div>
  );
}

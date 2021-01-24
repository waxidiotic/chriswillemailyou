export type AuthType = 'PASSWORD' | 'MAGIC_LINK';

export interface Credentials {
  email: string;
  password?: string;
}

export enum Role {
  SUPER_ADMIN = 'SUPER ADMIN',
  ADMIN = 'ADMIN',
  VIEWER = 'VIEWER',
}

export interface State {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone?: string;
  role: Role;
  password: string;
  password2?: string;
}
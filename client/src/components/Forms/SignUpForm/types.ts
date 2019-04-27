export interface ICreateUserInput {
  firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    phone: string;
    role: 'VIEWER' | 'SUPER_ADMIN' | 'VIEWER';
}

export interface ICreateAccount {
  createAccount: {
    token: string;
    username: string;
    firstName: string;
    lastName: string;
  }
}

export type FormSubmit = React.FormEvent<HTMLFormElement>

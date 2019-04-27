export interface State {
  identity: string;
  password: string;
}

export interface LoginInput {
  credentials: {
    username: string;
    password: string;
  };
}
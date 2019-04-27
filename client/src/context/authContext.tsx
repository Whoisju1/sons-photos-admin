import { createContext, useReducer } from 'react';

type Type = 'LOGIN' | 'lOGOUT';

interface IAuth {
  token: string | null;
  isLoggedIn: boolean;
}

const initialData: IAuth = {
  isLoggedIn: !!(localStorage.getItem('token')),
  token: localStorage.getItem('token'),
}

interface IAction {
  data: IAuth;
  type: Type;
}

export type Auth = { auth: IAuth, authChange: IChangeAuthStatus };

export const authContext =
  createContext<Auth>({
    auth: initialData,
    authChange: {
      login: () => void 0,
      logout: () => void 0,
    }
  });

interface IChangeAuthStatus {
  logout: () => void;
  login: (token: string) => void;
}

export function authReducer(): Auth {
  const reducer = (state: any, action: IAction) => {
    switch(action.type) {
      case 'lOGOUT':
        return action.data;
      case 'LOGIN':
        return action.data;
      default:
        return state;
    }
  };

  const [auth, dispatch] = useReducer(reducer, initialData);

  const logout = () => {
    localStorage.removeItem('token');
    const token = localStorage.getItem('token');
    const isLoggedIn = !!token;
    dispatch({ type: 'lOGOUT', data: { token, isLoggedIn } })
  }

  const login = (receivedToken: string) => {
    localStorage.setItem('token', receivedToken);
    const token = localStorage.getItem('token');
    const isLoggedIn = !!token;
    dispatch({
      type: 'LOGIN',
      data: { token, isLoggedIn },
    });
  }

  return {
    auth,
    authChange: {
      login,
      logout,
    }
  }
};

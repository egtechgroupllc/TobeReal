import {useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import React, {ReactNode, createContext, useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

interface AuthProps {
  token?: string;
  onLogin?: (data: any) => Promise<any>;
  onLogout?: () => Promise<any>;
}
const TOKEN_KEY = '@token';
export const AuthContext = createContext<AuthProps>({});

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const queryClient = useQueryClient();

  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    const loadToken = async () => {
      const result = await EncryptedStorage.getItem(TOKEN_KEY);
      if (result) {
        login(result);
      }
    };
    loadToken();
  }, []);

  const login = async (data: any) => {
    try {
      axios.defaults.headers.common.Authorization = `${data}`;

      setToken(data);

      await EncryptedStorage.setItem(TOKEN_KEY, data);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      setToken(undefined);
      queryClient.clear();

      axios.defaults.headers.common.Authorization = '';

      await EncryptedStorage.removeItem(TOKEN_KEY);
    } catch (error) {}
  };

  const value = {
    onLogin: login,
    onLogout: logout,
    token,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

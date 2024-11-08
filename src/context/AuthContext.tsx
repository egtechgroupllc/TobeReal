import {useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import React, {ReactNode, createContext, useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import RNRestart from 'react-native-restart';

interface AuthProps {
  token?: string;
  onSaveToken?: (data: any) => Promise<any>;
  onClearToken?: () => Promise<any>;
}
export const TOKEN_KEY = '@token';
export const AuthContext = createContext<AuthProps>({});

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const queryClient = useQueryClient();

  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    const loadToken = async () => {
      const result = await EncryptedStorage.getItem(TOKEN_KEY);
      if (result) {
        saveToken(result);
      }
    };
    loadToken();
  }, []);

  const saveToken = async (data: any) => {
    try {
      axios.defaults.headers.common['token'] = `EG ${data}`;

      setToken(`EG ${data}`);

      await EncryptedStorage.setItem(TOKEN_KEY, data);
    } catch (error) {
      console.error(error);
    }
  };

  const clearToken = async () => {
    try {
      setToken(undefined);
      axios.defaults.headers.common['token'] = '';
      await EncryptedStorage.removeItem(TOKEN_KEY);
      queryClient.clear();
      RNRestart.restart();
    } catch (error) {}
  };

  const value = {
    onSaveToken: saveToken,
    onClearToken: clearToken,
    token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

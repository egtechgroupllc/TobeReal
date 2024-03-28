import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import React, {ReactNode, createContext, useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import {postLogout} from '../Model/api/auth';
import {showMess} from '../assets/constants/Helper';
import RNRestart from 'react-native-restart';

interface AuthProps {
  token?: string;
  onSaveToken?: (data: any) => Promise<any>;
  onClearToken?: () => Promise<any>;
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
        saveToken(result);
      }
    };
    loadToken();
  }, []);

  const saveToken = async (data: any) => {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${data}`;

      setToken(data);

      await EncryptedStorage.setItem(TOKEN_KEY, data);
    } catch (error) {
      console.error(error);
    }
  };

  const clearToken = async () => {
    try {
      setToken(undefined);
      RNRestart.restart();
      axios.defaults.headers.common['Authorization'] = '';
      await EncryptedStorage.removeItem(TOKEN_KEY);
      queryClient.clear();
    } catch (error) {}
  };

  const value = {
    onSaveToken: saveToken,
    onClearToken: clearToken,
    token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { ReactNode, createContext, useEffect, useState } from 'react';
import RNRestart from 'react-native-restart';
import { storage } from '../utils/MMKVStorage';
import { deleteSession } from '../Model/api_new/apiClient';

interface AuthProps {
  token?: string;
  onSaveToken?: (accessToken: string, refreshToken?: string) => Promise<void>;
  onClearToken?: () => Promise<void>;
}

export const TOKEN_KEY = '@accessToken';
export const REFRESH_TOKEN_KEY = '@refreshToken';
export const AuthContext = createContext<AuthProps>({});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = storage.getString(TOKEN_KEY);
      if (storedToken) {
        saveToken(storedToken); // set lại vào state + axios headers
      }
    };
    loadToken();
  }, []);

  /**
   * Lưu accessToken + refreshToken
   */
  const saveToken = async (accessToken: string, refreshToken?: string) => {
    try {
      // ⚡ đổi từ Authorization -> accessToken cho đúng backend
      axios.defaults.headers.common['accessToken'] = accessToken;
      setToken(accessToken);

      storage.set(TOKEN_KEY, accessToken);
      if (refreshToken) {
        storage.set(REFRESH_TOKEN_KEY, refreshToken);
      }
    } catch (error) {
      console.error('Error saving token:', error);
    }
  };

  /**
   * Clear toàn bộ token => logout
   */
  const clearToken = async () => {
    try {
      setToken(undefined);
      axios.defaults.headers.common['Authorization'] = '';
      storage.delete(TOKEN_KEY);
      storage.delete(REFRESH_TOKEN_KEY);

      queryClient.clear();

      // Nếu muốn reset app hẳn thì bật dòng này
      RNRestart.restart();
    } catch (error) {
      console.error('Error clearing token:', error);
    }
  };

  const value: AuthProps = {
    onSaveToken: saveToken,
    onClearToken: clearToken,
    token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

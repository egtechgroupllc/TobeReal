import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import UAParser from 'ua-parser-js';
import {storage} from '../../utils/MMKVStorage';
import {useAuthentication} from '../../hooks/useAuthentication';
import {useMutation, useQuery} from '@tanstack/react-query';
import {deleteSession, getListSession} from '../../Model/api_new/user/auth';
import {showMess} from '../../assets/constants/Helper';
import {useQueryClient} from '@tanstack/react-query';
import {REFRESH_TOKEN_KEY} from '../../context/AuthContext';
import {decodeToken} from '../../Model/api_new/apiClient';
import DeviceInfo from 'react-native-device-info';
const parseUserAgent = (uaString, isCurrent = false) => {
  if (isCurrent && (Platform.OS === 'ios' || Platform.OS === 'android')) {
    return {
      browser: 'App',
      os: `${DeviceInfo.getSystemName()} ${DeviceInfo.getSystemVersion()}`,
      device: DeviceInfo.getModel(),
      raw: uaString,
    };
  }

  if (!uaString) {
    return {
      browser: 'Unknown',
      os: 'Unknown',
      device: 'Unknown Device',
      raw: '',
    };
  }

  if (uaString.includes('PostmanRuntime')) {
    return {
      browser: 'Postman',
      os: null, // ❌ bỏ 'N/A'
      device: 'Postman Client',
      raw: uaString,
    };
  }

  const parser = new UAParser(uaString);
  const result = parser.getResult();

  return {
    browser: result.browser?.name || 'Unknown',
    os: result.os?.name || null,
    device: result.device?.model || result.os?.name || uaString,
    raw: uaString,
  };
};

export default function SessionManageScreen() {
  const {token, onClearToken} = useAuthentication();
  const queryClient = useQueryClient();
  const {isLoading, data} = useQuery({
    queryKey: ['user', 'session'],
    queryFn: () => getListSession(token),
    enabled: !!token,
  });
  const refreshToken = storage.getString(REFRESH_TOKEN_KEY);
  const decoded = decodeToken(refreshToken || '');
  const currentJti = decoded?.jti;
  const seen = new Set();
  const activeSessions = (data?.data || [])
    .filter(s => new Date(s.expiresAt) > new Date())
    .filter(s => {
      if (seen.has(s.userAgent)) return false;
      seen.add(s.userAgent);
      return true;
    });

  const deleteSessionMutation = useMutation({
    mutationFn: deleteSession,
  });
  const handleSignOut = tokenJti => {
    Alert.alert(
      'Confirm Sign Out',
      'Are you sure you want to sign out this session?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            deleteSessionMutation.mutate([tokenJti], {
              onSuccess: async dataInside => {
                if (dataInside?.status) {
                  showMess('Delete session success', 'success');
                  queryClient.invalidateQueries({
                    queryKey: ['user', 'session'],
                  });

                  // ⚡ Nếu tokenJti là session hiện tại => logout luôn
                  if (decoded?.jti === tokenJti) {
                    await onClearToken();
                  }
                }
              },
              onError: err => {
                console.log('Error delete session:', err?.response || err);
                showMess(
                  err?.response?.data?.message || 'Error signing out session',
                  'error',
                );
              },
            });
          },
        },
      ],
      {cancelable: true},
    );
  };
  const renderItem = ({item}) => {
    const ua = parseUserAgent(item.userAgent, item.tokenJti === currentJti);
    const isCurrent = item.tokenJti === currentJti;
    const isActive = new Date(item.expiresAt) > new Date();

    return (
      <View style={styles.sessionCard}>
        <View style={{flex: 1}}>
          <Text style={styles.title}>
            {ua.browser}
            {ua.os ? ` on ${ua.os}` : ''}
          </Text>
          <Text style={styles.subText}>{ua.device}</Text>

          {isActive ? (
            <Text style={[styles.subText, {color: 'green'}]}>
              ● Active {isCurrent ? '- Your current session' : ''}
            </Text>
          ) : (
            <Text style={[styles.subText, {color: 'gray'}]}>Expired</Text>
          )}

          {!isCurrent && (
            <Text style={styles.subText}>
              Last accessed on{' '}
              {new Date(item.updatedAt || item.createdAt).toLocaleDateString()}
            </Text>
          )}

          <Text style={styles.subText}>
            Created at: {new Date(item.createdAt).toLocaleString()}
          </Text>
          <Text style={styles.subText}>
            Expires at: {new Date(item.expiresAt).toLocaleString()}
          </Text>
        </View>

        {isActive && (
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={() => handleSignOut(item.tokenJti)}>
            <Text style={styles.signOutText}>Sign out</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sessions</Text>
      <FlatList
        data={activeSessions} // ❗ không filter bỏ để vẫn hiển thị expired
        keyExtractor={item => item.tokenJti}
        renderItem={renderItem}
        contentContainerStyle={{paddingVertical: 10}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', padding: 16},
  header: {fontSize: 22, fontWeight: '600', marginBottom: 12},
  sessionCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
  },
  title: {fontSize: 16, fontWeight: '500', marginBottom: 4},
  subText: {fontSize: 13, color: '#555', marginBottom: 2},
  signOutButton: {
    backgroundColor: '#fee2e2',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  signOutText: {color: '#dc2626', fontWeight: '500'},
});

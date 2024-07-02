import {useQuery} from '@tanstack/react-query';
import React, {useState} from 'react';
import {Alert, Share, StyleSheet, TouchableOpacity, View} from 'react-native';

import {getProfile} from '../../Model/api/common';
import {COLORS, scale} from '../../assets/constants';
import {
  IconCopy,
  IconError,
  IconUnViewablePassword,
  IconViewablePassword,
} from '../../assets/icon/Icon';
import {CustomText, MainWrapper} from '../../components';
import {useAuthentication} from '../../hooks/useAuthentication';
import {useLanguage} from '../../hooks/useLanguage';

export default function ShowPrivateKeyAndSecretPhrase() {
  const {t} = useLanguage();

  const {token} = useAuthentication();
  const [secure, setSecure] = useState(true);

  const {isLoading, data} = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: () => getProfile(token),
    enabled: !!token,
  });

  const dataExt = data.data;

  const onShare = async message => {
    try {
      const result = await Share.share({
        message,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <MainWrapper styleContent={styles.container} noImgColor>
      {!!dataExt?.passphrase && (
        <Item
          title={'Secret phrase'}
          onPressCopy={() => onShare(dataExt?.passphrase)}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              rowGap: scale(8),
              columnGap: scale(16),
            }}>
            {dataExt?.passphrase?.split(' ')?.map((item, index) => (
              <View style={styles.itemPassphrase} key={index}>
                <CustomText style={[styles.textSm]}>
                  {index + 1}. {item}
                </CustomText>
              </View>
            ))}
          </View>
        </Item>
      )}

      {!!dataExt?.private_key && (
        <Item
          title={'Private key'}
          onPressCopy={() => onShare(dataExt?.private_key)}>
          <View
            style={[
              styles.containPassphrase,
              {columnGap: scale(8), alignItems: 'center'},
            ]}>
            <TouchableOpacity onPress={() => setSecure(prev => !prev)}>
              {secure ? (
                <IconUnViewablePassword
                  width={scale(16)}
                  height={scale((16 * 16) / 22)}
                />
              ) : (
                <IconViewablePassword
                  width={scale(16)}
                  height={scale((20 * 16) / 22)}
                />
              )}
            </TouchableOpacity>
            <View style={{flex: 1}}>
              <CustomText style={styles.textSm}>
                {!secure
                  ? dataExt?.private_key
                  : [...Array(dataExt?.private_key?.length)].map(
                      element => '*',
                    )}
              </CustomText>
            </View>
          </View>
        </Item>
      )}

      <View style={{height: scale(4)}} />
      <View style={styles.containPassphrase}>
        <View style={{marginTop: scale(3)}}>
          <IconError />
        </View>
        <View style={{flex: 1}}>
          <CustomText style={[styles.textSm, {color: 'red'}]}>
            Never share your secret phrase and private key with anyone, and
            store it securely!
          </CustomText>
        </View>
      </View>
    </MainWrapper>
  );
}

const Item = ({children, title, onPressCopy}) => {
  const {t} = useLanguage();

  return (
    <>
      <View style={styles.containItem}>
        <CustomText style={styles.textTitle} textType="medium">
          {title}
        </CustomText>
        <View style={{height: scale(16)}} />

        {children}

        <View style={{height: scale(12)}} />
        <TouchableOpacity
          style={{
            alignSelf: 'flex-start',
          }}
          onPress={onPressCopy}>
          <View style={[styles.containPassphrase, {columnGap: scale(8)}]}>
            <View style={{marginTop: scale(3)}}>
              <IconCopy />
            </View>

            <CustomText style={styles.textSm}>{t('Copy')}</CustomText>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{height: scale(16)}} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: scale(20),
  },
  containItem: {
    padding: scale(12),
    borderRadius: scale(12),
    backgroundColor: COLORS.grey50,
    overflow: 'hidden',
  },
  textTitle: {
    fontSize: scale(18),
    color: '#000',
  },
  textSm: {
    fontSize: scale(14),
    color: '#000',
    lineHeight: scale(17),
    flexShrink: 1,
  },
  containPassphrase: {
    flexDirection: 'row',
    columnGap: scale(12),
  },
  itemPassphrase: {
    backgroundColor: '#ffffff90',
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(4),
    paddingHorizontal: scale(6),
    borderRadius: scale(4),
  },
});

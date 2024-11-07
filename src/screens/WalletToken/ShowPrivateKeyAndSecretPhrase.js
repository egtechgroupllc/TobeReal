import {useQuery} from '@tanstack/react-query';
import React, {useLayoutEffect, useState} from 'react';
import {Alert, Share, StyleSheet, TouchableOpacity, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {Button, CText, MainWrapper} from '~/components';
import {scale} from '~/utils/scale';
import {
  IconCopy,
  IconError,
  IconUnViewablePassword,
  IconViewablePassword,
} from '~/assets/icon/Icon';
import {useLanguage} from '~/hooks/useLanguage';
import {COLORS} from '~/assets/constants';
import {useAuthentication} from '~/hooks/useAuthentication';
import {getProfile} from '~/api/user';

export default function ShowPrivateKeyAndSecretPhrase() {
  const {t} = useLanguage();
  const {setOptions, goBack} = useNavigation();

  const {token} = useAuthentication();
  const [secure, setSecure] = useState(true);
  useLayoutEffect(() => {
    setOptions({
      headerTitle: t('secret_phrase'),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const {isLoading, data} = useQuery({
    queryKey: getProfile.queryKey,
    queryFn: () => getProfile(),
    enabled: !!token,
  });

  const dataExt = data?.data;

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
      {!!dataExt?.secretPhrase && (
        <Item
          title={t('secret_phrase')}
          onPressCopy={() => onShare(dataExt?.secretPhrase)}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              rowGap: scale(8),
              columnGap: scale(16),
            }}>
            {dataExt?.secretPhrase?.split(' ')?.map((item, index) => (
              <View style={styles.itemPassphrase} key={index}>
                <CText style={[styles.textSm]}>
                  {index + 1}. {item}
                </CText>
              </View>
            ))}
          </View>
        </Item>
      )}

      {!!dataExt?.privateKey && (
        <Item
          title={t('private_key')}
          onPressCopy={() => onShare(dataExt?.privateKey)}>
          <View
            style={[
              styles.containPassphrase,
              {columnGap: scale(8), alignItems: 'center'},
            ]}>
            <TouchableOpacity onPress={() => setSecure(prev => !prev)}>
              {secure ? (
                <IconUnViewablePassword
                  fill={COLORS.White}
                  width={scale(16)}
                  height={scale((16 * 16) / 22)}
                />
              ) : (
                <IconViewablePassword
                  fill={COLORS.White}
                  width={scale(16)}
                  height={scale((20 * 16) / 22)}
                />
              )}
            </TouchableOpacity>
            <View style={{flex: 1}}>
              <CText style={{color: COLORS.White}}>
                {!secure
                  ? dataExt?.privateKey
                  : [...Array(dataExt?.privateKey?.length)].map(element => '*')}
              </CText>
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
          <CText style={[styles.textSm, {color: 'red'}]}>
            {t('never_share_secret_phrase_private_key')}
          </CText>
        </View>
      </View>
      <View style={{alignSelf: 'center', marginTop: scale(30)}}>
        <Button
          onPress={goBack}
          title={t('confirm')}
          linearGradientProps={{
            colors: COLORS.linearButton,
          }}
        />
      </View>
    </MainWrapper>
  );
}

const Item = ({children, title, onPressCopy}) => {
  const {t} = useLanguage();

  return (
    <>
      <View style={styles.containItem}>
        <CText style={styles.textTitle} textType="medium">
          {title}
        </CText>
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
              <IconCopy fill={COLORS.White} />
            </View>

            <CText style={{color: COLORS.White}}>{t('copy')}</CText>
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
    backgroundColor: COLORS.input,
    overflow: 'hidden',
  },
  textTitle: {
    fontSize: scale(18),
    color: COLORS.White,
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

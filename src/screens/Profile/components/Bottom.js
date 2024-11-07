import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {useMutation} from '@tanstack/react-query';
import {postLogout} from '../../../Model/api/auth';

import {useNavigation} from '@react-navigation/native';
import {scale} from '~/utils/scale';
import {COLORS, SIZES} from '~/assets/constants';
import {Button} from '~/components';
import {useAuthentication} from '~/hooks/useAuthentication';
import {useLanguage} from '~/hooks/useLanguage';

export default function Bottom() {
  const {t} = useLanguage();
  const {onClearToken, token} = useAuthentication();
  const {navigate} = useNavigation();
  // const logoutMutation = useMutation({
  //   mutationFn: postLogout,
  // });

  const handleLogOut = () => {
    onClearToken();
    // logoutMutation.mutate(
    //   {},
    //   {
    //     onSuccess: dataInside => {
    //       showMess(
    //         t(dataInside?.message),
    //         dataInside?.status ? 'success' : 'error',
    //       );

    //       if (dataInside?.status) {
    //         onClearToken();
    //       }
    //     },
    //     onError: error => {
    //       onClearToken();
    //     },
    //   },
    // );
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.box}>
          <IconSupporter />
          <View style={{marginLeft: scale(30), marginRight: scale(50)}}>
            <CText
              textType="bold"
              style={{...styles.text1, color: COLORS.white}}>
              {t('support')}
            </CText>
            <View style={{marginTop: scale(10)}}>
              <CText
                textType="medium"
                style={{...styles.text, color: COLORS.white}}>
                {t('hotline')}: ....
              </CText>
              <CText
                textType="medium"
                style={{...styles.text, color: COLORS.white}}>
                {t('email')}: ....
              </CText>
              <CText
                textType="medium"
                style={{...styles.text, color: COLORS.white}}>
                {t('website')}: ....
              </CText>
            </View>
          </View>
        </View>

        <View style={{flexDirection: 'row', marginTop: scale(10)}}>
          {listSocial?.map((Icon, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.7}
              style={{width: scale(50), height: scale(23), alignItems: 'center'}}>
              <Icon />
            </TouchableOpacity>
          ))}
        </View> */}

      <View
        style={{
          marginTop: scale(30),
          flexDirection: 'row',
          columnGap: scale(10),
        }}>
        <Button
          title={t('log_out')}
          onPress={handleLogOut}
          buttonType="medium"
          backgroundColor={COLORS.grey}
          style={{
            flex: 1,
          }}
        />
        <Button
          title={t('change_account')}
          onPress={() =>
            navigate('NoBottomTab', {screen: 'ChangeAccountScreen'})
          }
          buttonType="medium"
          linearGradientProps={{
            colors: COLORS.linearButton,
          }}
          style={{
            flex: 1,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: scale(10),
    alignItems: 'center',
    columnGap: scale(10),
    paddingBottom: scale(20),
    flexDirection: 'row',
  },
  box: {
    backgroundColor: '#0000004D',
    width: '90%',
    borderRadius: scale(5),
    paddingHorizontal: scale(10),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: scale(10),
  },
  text: {
    fontSize: SIZES.xSmall,
  },
  text1: {
    fontSize: SIZES.medium,
  },
  button: {
    alignItems: 'center',
    borderRadius: scale(5),
    height: scale(48),
    justifyContent: 'center',
    // width: scale(325),
  },
  text2: {
    fontSize: SIZES.medium,
  },
});

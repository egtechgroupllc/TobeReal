import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {getProfile} from '../../../Model/api/common';
import {COLORS, SIZES, scale} from '../../../assets/constants';
import {IconNext} from '../../../assets/icon/Icon';
import {CustomButton, CustomText, MainWrapper} from '../../../components';
import {useAuthentication} from '../../../hooks/useAuthentication';
import {useCountry} from '../../../hooks/useCountry';
import {useLanguage} from '../../../hooks/useLanguage';
import {formatDate} from '../../../utils/format';

export default function InformationScreen() {
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  const queryClient = useQueryClient();
  const datePro = queryClient.getQueryData(['user', 'profile'])?.data;
  const {country} = useCountry();

  return (
    <MainWrapper
      headerTitle={t('personal_information')}
      noImgColor
      styleContent={{
        paddingHorizontal: scale(12),
      }}>
      <View style={styles.wrapper}>
        <Row title={t('user_name')} value={datePro?.username} />
        <Row title={t('phone')} value={datePro?.phone} />
        <Row title={t('email')} value={datePro?.email} />
        <Row
          title={t('date_create')}
          value={formatDate(datePro?.createdAt)}
          disabled
        />
        <Row
          title={t('country')}
          value={country?.name && `${country?.flag} ${country?.name}`}
          desc={
            'Ban đầu, hệ thống thiết lập khu vực tài khoản của bạn dựa tren thời gian và địa điểm đăng ký'
          }
        />
      </View>
      <CustomButton
        text={t('change_information')}
        onPress={() => navigate('ChangeInformationScreen')}
      />
    </MainWrapper>
  );
}

const Row = ({title, value, desc, disabled, onPress}) => {
  return (
    <TouchableOpacity disabled={disabled} activeOpacity={0.7} onPress={onPress}>
      <View style={styles.row}>
        <CustomText textType="medium" size={SIZES.xMedium}>
          {title}
        </CustomText>
        <View style={styles.right}>
          {value && (
            <CustomText
              color={COLORS.textSub}
              ellipsizeMode="middle"
              size={scale(13)}
              numberOfLines={1}
              style={{flex: 1, textAlign: 'right'}}>
              {value}
            </CustomText>
          )}
          {!disabled && <IconNext size={scale(10)} fill={COLORS.textSub} />}
        </View>
      </View>
      {desc && (
        <CustomText
          color={COLORS.textSub}
          size={scale(13)}
          style={{width: '96%'}}>
          {desc}
        </CustomText>
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.white,
    width: '100%',
    borderRadius: scale(10),
    padding: scale(12),
    rowGap: scale(6),
    marginTop: scale(14),
    marginBottom: scale(30),
  },
  row: {
    flexDirection: 'row',
    columnGap: scale(30),
    alignItems: 'center',
    paddingVertical: scale(10),
    justifyContent: 'space-between',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(8),
    flex: 1,
    justifyContent: 'flex-end',
  },
});

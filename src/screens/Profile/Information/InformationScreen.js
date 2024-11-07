import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {scale} from '~/utils/scale';
import {COLORS, images, SIZES} from '~/assets/constants';
import {Button, CText, MainWrapper} from '~/components';
import {useCountry} from '~/hooks/useCountry';
import {useLanguage} from '~/hooks/useLanguage';
import {formatDate} from '~/utils/format';
import {IconNext} from '~/assets/icon/Icon';

export default function InformationScreen() {
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  const queryClient = useQueryClient();
  const datePro = queryClient.getQueryData(['user', 'profile'])?.data;
  const {country} = useCountry();

  return (
    <MainWrapper
      sourceImage={images.backgroundHome}
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
          desc={t('initially_the_system')}
        />
      </View>
      <Button
        title={t('change_information')}
        onPress={() => navigate('ChangeInformationScreen')}
        linearGradientProps={{colors: COLORS.linearButton}}
      />
    </MainWrapper>
  );
}

const Row = ({title, value, desc, disabled, onPress}) => {
  return (
    <TouchableOpacity disabled={disabled} activeOpacity={0.7} onPress={onPress}>
      <View style={styles.row}>
        <CText
          textType="medium"
          size={SIZES.xMedium}
          style={{color: COLORS.White}}>
          {title}
        </CText>
        <View style={styles.right}>
          {value && (
            <CText
              color={COLORS.White}
              ellipsizeMode="middle"
              size={scale(13)}
              numberOfLines={1}
              style={{flex: 1, textAlign: 'right'}}>
              {value}
            </CText>
          )}
          {!disabled && <IconNext size={scale(10)} fill={COLORS.White} />}
        </View>
      </View>
      {desc && (
        <CText color={COLORS.White} size={scale(13)} style={{width: '96%'}}>
          {desc}
        </CText>
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    borderRadius: scale(10),
    padding: scale(12),
    rowGap: scale(6),
    marginTop: scale(14),
    marginBottom: scale(30),
    borderWidth: 1,
    borderColor: COLORS.cyan,
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

import {useNavigation} from '@react-navigation/native';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import React from 'react';
import {getProfile} from '../../Model/api/common';
import MainAuth from '../../components/MainAuth';
import {useAuthentication} from '../../hooks/useAuthentication';
import AvatarImage from './components/AvatarImage';
import Bottom from './components/Bottom';
import Content from './components/Content';
import HeaderAvatar from './components/HeaderAvatar';
import HeaderNoToken from './components/HeaderNoToken';
import {Alert, StyleSheet, View} from 'react-native';
import axios, {AxiosError} from 'axios';
import {showMess} from '../../assets/constants/Helper';
import MainWrapper from '../../components/MainWrapper';
import {COLORS, SHADOW, SIZES, scale} from '../../assets/constants';
import {IconWallet} from '../../assets/icon/Icon';
import CustomText from '../../components/CustomText';
import {formatPrice} from '../../utils/format';
import {useCountry} from '../../hooks/useCountry';

export default function ProfileScreen() {
  const upgrade = () => {};

  const {token} = useAuthentication();
  const {country} = useCountry();
  const queryClient = useQueryClient();

  const {isLoading, data} = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: () => getProfile(token),
    enabled: !!token,
  });

  return (
    <MainWrapper refreshControl>
      {token ? (
        <>
          {/* <HeaderAvatar noti={false} notify={goBack} heading={'Profile'} /> */}
          <View style={styles.wallet}>
            <IconWallet />
            <CustomText
              textType="bold"
              numberOfLines={1}
              style={{color: COLORS.primary, fontSize: SIZES.xMedium}}>
              {formatPrice(data?.data.balance, {
                currency: country?.currency_code,
              })}
            </CustomText>
          </View>
          <AvatarImage
            upgrade={true}
            name={data?.data?.username || 'name'}
            onPressUpgrade={upgrade}
          />
        </>
      ) : (
        <HeaderNoToken />
      )}
      <Content />
      <Bottom />
    </MainWrapper>
  );
}
const styles = StyleSheet.create({
  wallet: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    columnGap: scale(5),
    paddingHorizontal: scale(10),
    alignItems: 'center',
    flexDirection: 'row',
    top: scale(30),
    right: scale(10),
    backgroundColor: COLORS.white,
    minHeight: scale(40),
    minWidth: scale(90),
    borderRadius: scale(10),
    ...SHADOW,
  },
});

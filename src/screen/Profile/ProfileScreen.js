import {useQuery, useQueryClient} from '@tanstack/react-query';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {getProfile} from '../../Model/api/common';
import {COLORS, SHADOW, SIZES, scale} from '../../assets/constants';
import {IconWallet} from '../../assets/icon/Icon';
import CustomText from '../../components/CustomText';
import MainWrapper from '../../components/MainWrapper';
import {useAuthentication} from '../../hooks/useAuthentication';
import {useCountry} from '../../hooks/useCountry';
import {formatPrice} from '../../utils/format';
import Bottom from './components/Bottom';
import Content from './components/Content';
import HeaderNoToken from './components/HeaderNoToken';
import TopProfile from './components/TopProfile';

export default function ProfileScreen() {
  const upgrade = () => {};

  const {token} = useAuthentication();
  const {currency} = useCountry();
  const queryClient = useQueryClient();
  const {isLoading, data} = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: () => getProfile(token),
    enabled: !!token,
  });

  return (
    <MainWrapper
      refreshControl
      optionsHeader={{
        headerStyle: {minHeight: scale(120), paddingTop: scale(10)},
      }}
      headerTitleComponent={<HeaderNoToken />}
      headerShown={!token}
      styleContent={{
        paddingHorizontal: scale(12),
      }}>
      {token && (
        <>
          <View style={styles.wallet}>
            <IconWallet />
            <CustomText
              textType="bold"
              numberOfLines={1}
              style={{color: COLORS.primary, fontSize: SIZES.xMedium}}>
              {formatPrice(data?.data.balance * currency?.exchange_rate, {
                currency: currency?.currency_code,
              })}
            </CustomText>
          </View>
          <TopProfile
            upgrade={true}
            data={data?.data}
            name={data?.data?.username || 'name'}
            onPressUpgrade={upgrade}
          />
        </>
      )}
      <Content token={token} />

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
    top: scale(40),
    right: scale(10),
    backgroundColor: COLORS.white,
    minHeight: scale(40),
    minWidth: scale(90),
    borderRadius: scale(10),
    ...SHADOW,
  },
});

import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';

import Bottom from './components/Bottom';
import Content from './components/Content';
import HeaderNoToken from './components/HeaderNoToken';
import TopProfile from './components/TopProfile';
import {useAuthentication} from '~/hooks/useAuthentication';
import {useCountry} from '~/hooks/useCountry';
import {scale} from '~/utils/scale';
import {IconWallet} from '~/assets/icon/Icon';
import {formatPrice} from '~/utils/format';
import {COLORS, images, SHADOW, SIZES} from '~/assets/constants';
import {MainWrapper} from '~/components';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {getProfile} from '~/api/user';

export default function ProfileScreen() {
  const upgrade = () => {};

  const {token} = useAuthentication();

  const {currency, country} = useCountry();
  const queryClient = useQueryClient();
  const {isLoading, data, error} = useQuery({
    queryKey: [...getProfile.queryKey],
    queryFn: () => getProfile(),
    enabled: !!token,
  });
  return (
    <MainWrapper
      scrollEnabled={false}
      sourceImage={images.backgroundHome}
      refreshControl
      // optionsHeader={{
      //   headerStyle: {
      //     minHeight: scale(Platform.OS == 'ios' ? 120 : 70),
      //   },
      // }}
      // headerTitleComponent={<HeaderNoToken />}
      // headerShown={!token}
      styleContent={{
        paddingHorizontal: scale(12),
        marginTop: Platform.OS === 'ios' ? scale(20) : scale(30),
        overflow: 'visible',
      }}>
      {token && (
        <>
          {/* <View style={styles.wallet}>
            <IconWallet />
            <CText
              textType="bold"
              numberOfLines={1}
              style={{color: COLORS.primary, fontSize: SIZES.xMedium}}>
              {formatPrice(data?.data.balance * currency?.exchange_rate, {
                currency: currency?.currency_code,
              })}
            </CText>
          </View> */}
          <TopProfile
            upgrade={true}
            data={data?.data}
            // name={data?.data?.username || 'name'}
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
    backgroundColor: COLORS.whiteSemi,
    minHeight: scale(40),
    minWidth: scale(90),
    borderRadius: scale(10),
    ...SHADOW,
  },
});

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, CImage, CText, MainWrapper} from '~/components';
import {COLORS, images, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';
import {useNavigation, useRoute} from '@react-navigation/native';
import {formatPrice} from '~/utils/format';
import {useAuthentication} from '~/hooks/useAuthentication';
import AppointmentHeader from '~/components/AppointmentHeader/AppointmentHeader';
import {IconShoppingCart} from '@tabler/icons-react-native';
import StarRating from '../ListProduct/components/StarRating';
import TopContent from './components/TopContent';
import ShopProduct from './components/ShopProduct';

export default function DetailShopScreen() {
  const params = useRoute().params;
  const {navigate} = useNavigation();
  const {token} = useAuthentication();

  return (
    <MainWrapper
      sourceImage={images.backgroundHome}
      headerTitle={'Detail Shop'}
      optionsHeader={{
        headerTitleStyle: {
          textAlign: 'left',
        },
        headerStyle: {
          paddingBottom: 0,
        },
        headerRight: () => {
          return (
            <Button.Icon
              Icon={IconShoppingCart}
              color={COLORS.White}
              isCount
              count={1}
              onPress={() =>
                navigate('NoBottomTab', {screen: 'ShoppingCartScreen'})
              }
            />
          );
        },
      }}>
      <View style={styles.contain}>
        <TopContent data={params} />
        <ShopProduct data={params} />
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    paddingBottom: scale(50),
    rowGap: scale(5),
  },
});

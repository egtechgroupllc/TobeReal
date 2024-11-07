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

export default function DetailProductScreen() {
  const params = useRoute().params;
  const {navigate} = useNavigation();
  const {token} = useAuthentication();

  const handlePayment = data => {
    if (token) {
      navigate('NoBottomTab', {screen: 'PaymentProductScreen', params: data});
    } else {
      navigate('NavigationAuth', {screen: 'LoginScreen'});
    }
  };
  return (
    <MainWrapper
      sourceImage={images.backgroundHome}
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
      }}
      headerTitle={'Detail product'}>
      <View style={styles.contain}>
        <View
          style={{
            minHeight: scale(300),
            width: '100%',
            backgroundColor: COLORS.input,
            borderRadius: scale(16),
            padding: scale(15),
            rowGap: scale(15),
            paddingBottom: scale(20),
          }}>
          <CImage
            source={{uri: params?.url}}
            resizeMode="contain"
            style={{
              height: scale(220),
              aspectRatio: 1,
              alignSelf: 'center',
            }}
          />
          <CText style={{color: COLORS.White, textAlign: 'center'}}>
            {params?.name}
          </CText>
          <CText
            style={{
              color: COLORS.cyan,
              textAlign: 'center',
              fontSize: SIZES.large,
            }}
            textType="bold">
            {formatPrice(params?.price)}
          </CText>
          <View style={{flexDirection: 'row', columnGap: scale(10)}}>
            <Button
              title="Add to cart"
              Icon={IconShoppingCart}
              style={{flex: 1}}
              buttonType="large"
              backgroundColor={COLORS.overlay}
              iconProps={{fill: 'transparent'}}
            />
            <Button
              onPress={() => handlePayment(params)}
              title="BUY NOW"
              linearGradientProps={{
                colors: COLORS.linearButton,
              }}
              buttonType="large"
              style={{flex: 1}}
            />
          </View>
        </View>
        <CText
          style={{
            fontSize: SIZES.large,
            color: COLORS.White,
          }}
          textType="semiBold">
          Product Information
        </CText>
        <CText
          style={{
            fontSize: SIZES.medium,
            color: COLORS.White,
          }}
          textType="regular">
          {params?.description}
        </CText>
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    paddingHorizontal: scale(20),
    rowGap: scale(20),
    paddingBottom: scale(50),
  },
});

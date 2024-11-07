import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {scale} from '~/utils/scale';
import {Button, CText} from '~/components';
import {COLORS, SIZES} from '~/assets/constants';
import {formatPrice} from '~/utils/format';
import {useNavigation} from '@react-navigation/native';

export default function FooterCart({totalPrice}) {
  console.log('totalPrice', totalPrice);
  const {navigate} = useNavigation();
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#002F43',
        height: '14%',
        justifyContent: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: scale(20),
          columnGap: scale(20),
        }}>
        <CText
          numberOfLines={2}
          style={{
            fontSize: SIZES.large,
            color: COLORS.White,
            flex: 1,
          }}>
          Total:{' '}
          <CText style={{fontSize: SIZES.large, color: COLORS.White}}>
            {formatPrice(totalPrice)}
          </CText>
        </CText>
        <Button
          title="Checkout"
          onPress={() => {
            navigate('PaymentProductScreen');
          }}
          backgroundColor={COLORS.cyan}
          styleContent={{height: scale(40), width: scale(150)}}
          sizeButton="small"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

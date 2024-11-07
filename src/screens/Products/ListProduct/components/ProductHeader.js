import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useMemo, useRef} from 'react';
import {scale} from '~/utils/scale';
import {Button, CText} from '~/components';
import {
  IconArrowLeft,
  IconShoppingCart,
  IconShoppingCartPin,
} from '@tabler/icons-react-native';
import {COLORS, SIZES} from '~/assets/constants';
import {useNavigation} from '@react-navigation/native';
import Input from '~/components/Input';
import {IconSearch} from '~/assets/icon/Icon';
import Category from './Category';
import {useLanguage} from '~/hooks/useLanguage';
import AnimateScrollWrapper from '~/components/AnimateHeader/AnimateScrollWrapper';

export default function ProductHeader({
  onChangeText,
  listCategory,
  setCategory,
  back,
}) {
  const {navigate, goBack} = useNavigation();
  const {t} = useLanguage();

  return (
    <View style={{width: '100%'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: scale(10),
        }}>
        <CText
          style={{
            color: COLORS.White,
            fontSize: SIZES.medium,
          }}
          textType="semiBold">
          Medical products
        </CText>
        <View style={{position: 'absolute', right: scale(10)}}>
          <Button.Icon
            Icon={IconShoppingCart}
            color={COLORS.White}
            isCount
            count={1}
            onPress={() =>
              navigate('NoBottomTab', {screen: 'ShoppingCartScreen'})
            }
          />
        </View>
      </View>
      {/* <Input
        styleContent={{...styles.input, alignSelf: 'center'}}
        styleWrapper={{paddingHorizontal: scale(16)}}
        sizeInput={'small'}
        placeholder={t('search')}
        placeholderTextColor={COLORS.grey}
        onChangeText={onChangeText}
        icon={IconSearch}
        propsIcon={{fill: COLORS.White}}
      /> */}

      {/* <Category
        data={listCategory}
        isObject
        onPress={value => setCategory(value)}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    color: COLORS.greyBold,
  },
});

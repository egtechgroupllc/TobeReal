import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, SHADOW, SIZES, scale} from '../../assets/constants';
import {
  CustomButton,
  CustomImage,
  CustomText,
  MainWrapper,
} from '../../components';
import {useLanguage} from '../../hooks/useLanguage';
import EmptyData from '../../components/EmptyData';

export default function DetailTokenScreen() {
  const params = useRoute().params;
  console.log(params);
  const {setOptions, navigate} = useNavigation();
  const {t} = useLanguage();
  useLayoutEffect(() => {
    setOptions({
      headerTitle: params?.name,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  return (
    <>
      <MainWrapper>
        <View
          style={{
            alignItems: 'center',
            marginTop: scale(80),
            rowGap: scale(10),
            flex: 1,
          }}>
          <View style={styles.icon}>
            <CustomImage
              isAvatar
              source={params?.image}
              style={{
                width: scale(40),
                aspectRatio: 1,
              }}
              resizeMode="contain"
            />
          </View>
          <CustomText style={{fontSize: SIZES.large}} textType="medium">
            {params?.value} {params?.unit}
          </CustomText>
          <View
            style={{
              marginTop: scale(30),
              width: '100%',
              height: scale(1),
              backgroundColor: COLORS.grey,
            }}
          />
          <View style={{marginTop: scale(50), alignItems: 'center'}}>
            <CustomText>{t('history_transaction_appear_here')}.</CustomText>
            <EmptyData styleWrapper={{flex: 0}} />
          </View>
        </View>
      </MainWrapper>
      <View
        style={{
          height: scale(90),
          width: '100%',
          bottom: 0,
          backgroundColor: COLORS.white,
          paddingHorizontal: scale(20),
          ...SHADOW,
          paddingTop: scale(10),
          alignItems: 'flex-end',
        }}>
        <CustomButton
          text="Deposit"
          style={{width: '50%'}}
          onPress={() =>
            navigate('NoBottomTab', {
              screen: 'DepositTokenScreen',
              params: params,
            })
          }
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    height: scale(50),
    width: scale(50),
    backgroundColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(99),
  },
});

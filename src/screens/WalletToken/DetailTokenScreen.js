import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, images, SHADOW, SIZES} from '~/assets/constants';
import {IconHome} from '~/assets/icon/Icon';
import {Button, CImage, CText, MainWrapper} from '~/components';
import EmptyData from '~/components/EmptyData';
import {useLanguage} from '~/hooks/useLanguage';
import {scale} from '~/utils/scale';

export default function DetailTokenScreen() {
  const params = useRoute().params;
  const {setOptions, navigate} = useNavigation();
  const {t} = useLanguage();
  useLayoutEffect(() => {
    setOptions({
      headerTitle: params?.listToken?.name,
      headerRight: () => (
        <TouchableOpacity onPress={() => navigate('BottomTab')}>
          <IconHome style={{width: scale(20)}} />
        </TouchableOpacity>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  return (
    <>
      <MainWrapper sourceImage={images.backgroundHome}>
        <View
          style={{
            alignItems: 'center',
            marginTop: scale(50),
            rowGap: scale(10),
            flex: 1,
          }}>
          <View style={styles.icon}>
            <CImage.Avatar
              source={params?.listToken?.image}
              style={{
                width: scale(80),
                height: scale(80),
              }}
              resizeMode="contain"
            />
          </View>
          <CText
            style={{fontSize: SIZES.large, color: COLORS.White}}
            textType="medium">
            {params?.listToken?.value} {params?.listToken?.unit}
          </CText>
          <View
            style={{
              marginTop: scale(30),
              width: '100%',
              height: scale(1),
              backgroundColor: COLORS.grey,
            }}
          />
          <View style={{marginTop: scale(50), alignItems: 'center'}}>
            <CText style={{color: COLORS.White}}>
              {t('history_transaction_appear_here')}.
            </CText>
            <EmptyData styleWrapper={{flex: 0}} />
          </View>
        </View>
      </MainWrapper>
      <View style={{backgroundColor: COLORS.blueView}}>
        <View
          style={{
            height: scale(90),
            width: '50%',
            paddingHorizontal: scale(20),
            ...SHADOW,
            paddingTop: scale(10),
            alignSelf: 'flex-end',
          }}>
          <Button
            title="Deposit"
            linearGradientProps={{colors: COLORS.linearButton}}
            onPress={() =>
              navigate('NoBottomTab', {
                screen: 'DepositTokenScreen',
                params: params,
              })
            }
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    height: scale(95),
    width: scale(95),
    backgroundColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(99),
  },
});

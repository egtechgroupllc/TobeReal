import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useLayoutEffect} from 'react';
import ListMethodBank from './components/Deposit/ListAccountBank';
import {useQuery} from '@tanstack/react-query';
import {getListMethod} from '../../../Model/api/auth';
import ItemMethodDeposit from './components/ItemMethodDeposit';
import {useNavigation} from '@react-navigation/native';
import {useLanguage} from '~/hooks/useLanguage';
import {Button, CText, MainWrapper} from '~/components';
import {scale} from '~/utils/scale';
import {showMess} from '~/assets/constants/Helper';
import {animations, COLORS, images} from '~/assets/constants';
import {getDepositMethod} from '~/api/deposit';
import {IconHome} from '~/assets/icon/Icon';
import AnimatedLottieView from 'lottie-react-native';
// const data = [
//   {
//     logo_url: 'http://192.168.1.16:3000/images/logos/momo.png',
//     id: 1,
//     name: 'MoMo',
//     description: null,
//     logo: 'momo.png',
//     createdAt: '2024-04-09T04:29:58.000Z',
//     updatedAt: '2024-04-09T04:29:58.000Z',
//     method_deposit_items: [],
//   },
//   {
//     logo_url: 'http://192.168.1.16:3000/images/logos/bank.png',
//     id: 2,
//     name: 'Bank',
//     description: null,
//     logo: 'bank.png',
//     createdAt: '2024-04-09T04:29:58.000Z',
//     updatedAt: '2024-04-09T04:29:58.000Z',
//     method_deposit_items: [],
//   },
// ];
export default function ListMethodBankScreen() {
  const {setOptions, navigate} = useNavigation();
  const {t} = useLanguage();

  const {data, isLoading} = useQuery({
    queryKey: [...getDepositMethod.queryKey],
    queryFn: () => getDepositMethod(),
  });
  useLayoutEffect(() => {
    setOptions({
      headerTitle: t('deposit'),
      headerRight: () => {
        return (
          <Button.Icon Icon={IconHome} onPress={() => navigate('Profile')} />
        );
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <MainWrapper sourceImage={images.backgroundHome} scrollEnabled={false}>
      <View
        style={{
          ...styles.box,
          opacity: isLoading ? 0.2 : 1,
        }}>
        <CText textType="medium" style={{color: COLORS.White}}>
          {t('please_choose_one')}
        </CText>

        <FlatList
          data={data?.data || (isLoading && [1, 2, 3, 5])}
          // data={data}
          style={{
            height: '100%',
          }}
          contentContainerStyle={{
            rowGap: scale(10),
            paddingVertical: scale(10),
          }}
          renderItem={({item, index}) => {
            return (
              <ItemMethodDeposit
                key={index}
                data={item}
                onPress={() => {
                  if (item?.method_deposit_item?.length > 0) {
                    navigate('DepositScreen', item);
                  } else {
                    showMess(t('comming_soon'), 'error');
                  }
                }}
              />
            );
          }}
        />
        {isLoading && (
          <View
            style={{
              flex: 1,
              position: 'absolute',
              height: '100%',
              width: '100%',
              alignItems: 'center',
              paddingTop: scale(200),
              alignSelf: 'center',
            }}>
            <AnimatedLottieView
              source={animations.medicalLoading}
              autoPlay
              loop
              style={{
                width: scale(250),
                height: scale(250),
              }}
            />
          </View>
        )}
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  box: {
    padding: scale(10),
    rowGap: scale(10),
  },
});

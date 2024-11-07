import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect, useMemo, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';

// import {
//   getListVoucherCanUse,
//   getListVoucherCanYou,
//   getListVoucherSelling,
//   postBuyVoucher,
// } from '../../../../../../Model/api/apiAccom';
import {COLORS, images, SIZES} from '~/assets/constants';
import {IconHome, IconNoVoucher} from '~/assets/icon/Icon';
import {Button, MainWrapper} from '~/components';
import EmptyData from '~/components/EmptyData';
import {useCountry} from '~/hooks/useCountry';
import {useLanguage} from '~/hooks/useLanguage';
import {scale} from '~/utils/scale';
import SelectVoucherFooter from './components/SelectVoucherFooter';
import VoucherItem from './components/VoucherItem';
import {useQuery} from '@tanstack/react-query';
import {getListVoucherDoctor, getListVoucherUser} from '~/api/voucher';
// import {
//   getListVoucherTourCanUse,
//   getListVoucherTourSelling,
// } from '../../../../../../Model/api/apiTour';

export default function HomeListVoucherScreen() {
  const params = useRoute().params;

  const {setOptions, goBack, navigate} = useNavigation();
  const {currency} = useCountry();
  const {t} = useLanguage();
  const transferType = [
    {id: 1, name: t('your_voucher')},
    {id: 2, name: !params?.isTour ? t('doctor_voucher') : t('voucher_tour')},
  ];
  const [tab, setTab] = useState(1);
  useEffect(() => {
    if (params?.isSuccess) {
      setTab(1);
    }
  }, [params?.isSuccess]);

  useLayoutEffect(() => {
    return setOptions({
      headerTitleComponent: () => (
        <View
          style={{
            flexDirection: 'row',
            borderRadius: scale(10),
            alignSelf: 'center',
            columnGap: scale(5),
          }}>
          {transferType.map((item, index) => {
            return (
              <View key={index}>
                <Button
                  sizeButton="small"
                  style={{
                    backgroundColor:
                      item?.id === tab ? COLORS.White : 'transparent',
                  }}
                  styleContent={{
                    width: scale(130),
                  }}
                  title={item?.name}
                  styleText={{
                    color: item?.id === tab ? COLORS.cyan : COLORS.White,
                    fontSize: SIZES.small,
                  }}
                  onPress={() => setTab(item?.id)}
                />
              </View>
            );
          })}
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigate('BottomTab')}>
          <IconHome style={{width: scale(20)}} />
        </TouchableOpacity>
      ),
    });
  }, [tab]);
  const {data, error} = useQuery({
    queryKey:
      tab === 2
        ? [...getListVoucherDoctor.queryKey, {keyword: params?.id}]
        : [...getListVoucherUser.queryKey, {keyword: params?.id}],
    queryFn: () =>
      tab === 2
        ? getListVoucherDoctor({keyword: params?.id})
        : getListVoucherUser({keyword: params?.id}),
  });

  const [voucher, setVoucher] = useState([]);
  const arrIds = useMemo(
    () => voucher.map(itemPrev => itemPrev?.id),
    [`${voucher}`],
  );
  const voucherCheckBox = item => {
    setVoucher(prev => {
      const check = arrIds?.includes(item.id);

      if (check) {
        return prev?.filter(voucher => voucher.id !== item.id);
      }

      return [...prev, item];
    });
  };

  return (
    <>
      <MainWrapper
        sourceImage={images.backgroundHome}
        refreshControl
        // scrollEnabled={false}
        styleContent={{
          paddingHorizontal: scale(10),
          paddingBottom: scale(70),
        }}>
        <FlatList
          // key={`accommodation/my-list-1-${page}_${data?.data?.count}_${numColumns}`}
          data={data?.data?.rows}
          keyExtractor={(item, index) => `$key_${item.id}-${index}`}
          contentContainerStyle={{
            rowGap: scale(10),
            paddingBottom: scale(50),
          }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyData
              iconEmpty={
                <IconNoVoucher width={scale(150)} height={scale(150)} />
              }
              styleWrapper={{
                marginTop: '40%',
                justifyContent: 'center',
              }}
            />
          }
          renderItem={({item, index}) => {
            return (
              <VoucherItem
                checkDiffrentCountry={params?.checkDiffrentCountry}
                countryRate={params?.countryRate}
                key={`key_${item?.id}-${index}`}
                data={item}
                onPressCheckBox={evt => {
                  voucherCheckBox(item);
                }}
                isChecked={arrIds?.includes(item?.id)}
                chooseVoucher={tab === 1 && true}
                buyVoucher={tab === 2 && true}
                onPressVoucher={() => {
                  tab === 2
                    ? navigate('BuyVoucherScreen', {
                        ...params,
                        ...item,
                        isTour: params?.isTour,
                      })
                    : voucherCheckBox(item);
                }}
                // onPressMore={() => {
                //   setDataItemAccom(item);
                //   bottomSheetRef.current.open();
                // }}
                // onEdit={() => {
                //   navigate('DetailRoomManageScreen', {
                //     ...item,
                //   });
                // }}
              />
            );
          }}
        />
      </MainWrapper>
      {tab === 1 && (
        <SelectVoucherFooter
          count={voucher?.length}
          data={voucher}
          onGoBack={params?.onGoBack}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({});

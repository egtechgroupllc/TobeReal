import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useLayoutEffect, useMemo, useState} from 'react';
import {
  CustomButton,
  CustomSelectDropdown,
  CustomText,
  MainWrapper,
} from '../../../../../components';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useLanguage} from '../../../../../hooks/useLanguage';
import {IconHome} from '../../../../../assets/icon/Icon';
import {SIZES, scale} from '../../../../../assets/constants';
import VoucherItem from './VoucherItem';
import {
  getListVoucher,
  getListVoucherSelling,
} from '../../../../../Model/api/apiAccom';
import {useQuery} from '@tanstack/react-query';
import EmptyData from '../../../../../components/EmptyData';
import {getListVoucherTourSelling} from '../../../../../Model/api/apiTour';
import {useCountry} from '../../../../../hooks/useCountry';

export default function VoucherManageScreen() {
  const {setOptions, navigate} = useNavigation();
  const {t} = useLanguage();
  const params = useRoute().params;
  const {country} = useCountry();
  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('voucher_manage'),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigate('POST', {screen: 'PostNewsScreen'})}>
          <IconHome style={{width: scale(20)}} />
        </TouchableOpacity>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  const {data} = useQuery({
    queryKey: !params?.isTour
      ? ['voucher', 'list-voucer-selling', params?.id]
      : ['voucher', 'list-voucer-selling-tour', params?.id],

    queryFn: () =>
      !params?.isTour
        ? getListVoucherSelling(params?.id)
        : getListVoucherTourSelling(params?.id),
  });
  const numColumns = Math.ceil(data?.data?.rows?.length / 4);
  const checkDiffentCountry = useMemo(() => {
    if (params?.country?.country_id !== country?.id) {
      // getCurrency(data?.country.currency_code);
      return true;
    }
  }, [params?.country?.country_id, country?.id]);

  return (
    <MainWrapper
      scrollEnabled={false}
      styleContent={{
        marginVertical: scale(20),
        paddingHorizontal: scale(10),
      }}>
      <>
        <View
          style={{
            flexDirection: 'row',
            columnGap: scale(30),
          }}>
          <CustomButton
            text={t('add_voucher')}
            style={{
              width: '50%',
              marginBottom: scale(10),
            }}
            onPress={() => navigate('AddVoucherScreen', {...params})}
          />
        </View>

        <FlatList
          // key={`accommodation/my-list-1-${page}_${data?.data?.count}_${numColumns}`}
          data={data?.data?.rows}
          keyExtractor={(item, index) => `$key_${item.id}-${index}`}
          contentContainerStyle={{
            rowGap: scale(10),
            paddingVertical: scale(5),
          }}
          ListEmptyComponent={
            <EmptyData
              styleWrapper={{
                marginTop: '40%',
                justifyContent: 'center',
              }}
            />
          }
          renderItem={({item, index}) => {
            return (
              <VoucherItem
                key={`key_${item?.id}-${index}`}
                data={item}
                checkDiffrentCountry={checkDiffentCountry}
                countryRate={item?.currency?.exchange_rate}
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

        {/* <BottomSheet
          ref={bottomSheetRef}
          titleIndicator={t('notification')}
          snapPoints={['30%']}
          disableScroll
          styleContent={styles.bottomSheet}>
          <DeleteRoom
            data={dataItemAccom}
            onSuccess={() => {
              bottomSheetRef.current.close();
              setDataItemAccom(null);
            }}
            onCancel={() => {
              bottomSheetRef.current.close();
              setDataItemAccom(null);
            }}
          />
        </BottomSheet> */}
      </>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  bottomSheet: {
    rowGap: scale(10),
    padding: scale(20),
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: scale(10),
    rowGap: scale(10),
    paddingVertical: scale(20),
  },
});

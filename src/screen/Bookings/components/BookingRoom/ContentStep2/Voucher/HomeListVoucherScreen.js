import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import {
  CustomButton,
  CustomImage,
  CustomText,
  MainWrapper,
} from '../../../../../../components';
import {useMutation, useQuery} from '@tanstack/react-query';
import {COLORS, SIZES, images, scale} from '../../../../../../assets/constants';
import VoucherItem from '../../../../../News/PostNews/Lease/VoucherManage/VoucherItem';
import EmptyData from '../../../../../../components/EmptyData';
import {
  getListVoucherCanUse,
  getListVoucherCanYou,
  getListVoucherSelling,
  postBuyVoucher,
} from '../../../../../../Model/api/apiAccom';
import {IconHome, IconNoVoucher} from '../../../../../../assets/icon/Icon';
import {showMess} from '../../../../../../assets/constants/Helper';
import BookAccommodation from '../../../../../Explore/components/DetailAccommodation/Detail/BookAccommodation';
import SelectVoucherFooter from './components/SelectVoucherFooter';
import {
  getListVoucherTourCanUse,
  getListVoucherTourSelling,
} from '../../../../../../Model/api/apiTour';
import {useCountry} from '../../../../../../hooks/useCountry';

export default function HomeListVoucherScreen() {
  const params = useRoute().params;
  const {setOptions, goBack, navigate} = useNavigation();
  const {currency} = useCountry();
  const {t} = useLanguage();
  const transferType = [
    {id: 1, name: t('your_voucher')},
    {id: 2, name: !params?.isTour ? t('hotel_voucher') : t('voucher_tour')},
  ];
  useEffect(() => {
    if (params?.isSuccess) {
      setTab(1);
    }
  }, [params?.isSuccess]);

  const [tab, setTab] = useState(1);
  useEffect(() => {
    return setOptions({
      headerTitleComponent: () => (
        <View
          style={{
            backgroundColor: COLORS.grey,
            flexDirection: 'row',
            borderRadius: scale(10),
            alignSelf: 'center',
          }}>
          {transferType.map((item, index) => {
            return (
              <View key={index}>
                <CustomButton
                  buttonType="small"
                  style={{
                    backgroundColor:
                      item?.id === tab ? COLORS.white : 'transparent',
                  }}
                  styleWrapper={{
                    minWidth: scale(120),
                  }}
                  text={item?.name}
                  styleText={{
                    color: item?.id === tab ? COLORS.primary : COLORS.white,
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
        ? !params?.isTour
          ? ['voucher', 'list-voucher-selling']
          : ['voucher', 'list-voucher-tour-selling', params?.tourId]
        : !params?.isTour
        ? ['voucher', 'list-voucher-can-use']
        : ['voucher', 'list-voucher-tour-can-use', params?.tourId],
    queryFn: () =>
      tab === 2
        ? !params?.isTour
          ? getListVoucherSelling(
              params?.accomId || params?.params?.item?.accommodation_id,
            )
          : getListVoucherTourSelling(
              params?.tourId || params?.params?.item?.tour_id,
            )
        : !params?.isTour
        ? getListVoucherCanUse(
            params?.accomId || params?.params?.item?.accommodation_id,
          )
        : getListVoucherTourCanUse(
            params?.tourId || params?.params?.item?.tour_id,
          ),
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
        scrollEnabled={false}
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
            paddingTop: scale(20),
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
              desc={t('')}
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
                        item,
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

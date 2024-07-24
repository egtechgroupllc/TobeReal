/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';

import {useQuery} from '@tanstack/react-query';
import {useForm} from 'react-hook-form';
import {getListCountry} from '../../../Model/api/common';
import {COLORS, SHADOW, SIZES, scale} from '../../../assets/constants';

import {BottomSheet, CustomButton} from '../../../components';
import InViewport from '../../../components/InViewport';
import {useCountry} from '../../../hooks/useCountry';
import {useLanguage} from '../../../hooks/useLanguage';
import FilterSort from '../../Explore/components/DetailAccommodation/Review/FilterSort';
import BottomSheetChild from '../../Map/Header/BottomSheetChild';
import Budget from '../../Map/Header/Budget';
import MapProvince from '../../Map/Header/MapProvince';
import Menubar from '../../Map/Header/Menubar';
import SortBy from '../../Map/Header/SortBy';
import TypeAccommoda from '../../Map/Header/TypeAccommoda';
import MenubarTour from './componentTour/MenubarTour';
import ProvinceTour from './componentTour/ProvinceTour';
import {
  getListPopularCountryTour,
  getListPopularProvinceTour,
} from '../../../Model/api/apiTour';
import CountryTour from './componentTour/CountryTour';
import BottomSheetChildTour from './componentTour/BottomSheetChildTour';
export default memo(function FilterTour({
  onFilter = () => {},
  menu,
  mapProvince,
  dataReturn,
}) {
  const {t} = useLanguage();

  const bottomSheetRef = useRef();
  const bottomSheetChildRef = useRef();
  const {country} = useCountry();
  const [openBottom, setOpenBottom] = useState(false);
  const listProvince = useQuery({
    queryKey: ['list', 'popular-province-tour', country?.geoname_id],
    queryFn: () => getListPopularProvinceTour(country?.geoname_id),
  });
  const listCountry = useQuery({
    queryKey: ['list', 'popular-country-tour', country?.id],
    queryFn: () => getListPopularCountryTour(country?.id),
  });
  const {control, handleSubmit, watch, setValue, reset, unregister} = useForm({
    defaultValues: {
      menu: {id: 'DOMESTIC', name: t('domestic')},
      province: listProvince?.data?.data?.rows?.[0],
      country: listCountry?.data?.data?.rows?.[0],
    },
  });
  const [isRender, setIsRender] = useState(false);
  const handelFiter = value => {
    onFilter && onFilter(value);
    setOpenBottom(true);
    bottomSheetRef.current.close();
  };

  useEffect(() => {
    if (dataReturn?.count === 0 && openBottom) {
      Alert.alert(t('please_filter_again'), t('no_properties_found'), [
        {
          text: t('ok'),
          onPress: () => {
            setOpenBottom(false);

            bottomSheetRef.current.open();
          },
        },
      ]);
    }
  }, [dataReturn?.count, openBottom]);

  const handleSelectProvince = useCallback(value => {
    value && setValue('province', value);
    bottomSheetChildRef.current.closeChild();
  }, []);
  const handleSelectCountry = useCallback(value => {
    value && setValue('country', value);
    bottomSheetChildRef.current.closeChild();
  }, []);
  const handleReset = useCallback(value => {
    const keyReset = Object.keys(watch());
    if (keyReset.includes('province')) {
      reset();
    }
    setValue('menu', {menu: {id: 'DOMESTIC', name: t('domestic')}});
    setIsRender(false);
  }, []);
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        paddingHorizontal: scale(80),
        ...SHADOW,
        zIndex: 99,
      }}>
      {/* <HeaderBar /> */}
      <FilterSort
        text={t('filter')}
        noSelectDefault
        onSort={() => {
          bottomSheetRef.current.open();
        }}
      />

      <BottomSheet
        snapPoints={['50%', '80%']}
        titleIndicator={t('filter&sort')}
        ref={bottomSheetRef}
        refChild={bottomSheetChildRef}
        onChange={value => {
          if (value > 0) {
            openBottom && setOpenBottom(false);
          }
        }}
        handleChildBottom={() => (
          <BottomSheetChildTour
            data={
              watch('menu')?.id === 'DOMESTIC' ||
              watch('menu')?.menu?.id === 'DOMESTIC'
                ? listProvince
                : listCountry
            }
            onChange={
              watch('menu')?.id === 'DOMESTIC' ||
              watch('menu')?.menu?.id === 'DOMESTIC'
                ? handleSelectProvince
                : handleSelectCountry
            }
          />
        )}
        ComponentFooter={
          <View
            style={{
              borderTopWidth: scale(1),
              borderColor: COLORS.grey,
              backgroundColor: 'white',
              height: scale(100),
              flexDirection: 'row',
              columnGap: scale(20),
              paddingVertical: scale(20),
              paddingHorizontal: scale(40),
            }}>
            <CustomButton
              outline
              buttonType="normal"
              style={{flex: 0.5}}
              text={t('Reset')}
              styleText={{
                fontSize: SIZES.xMedium,
              }}
              onPress={handleReset}
            />
            <CustomButton
              buttonType="normal"
              style={{
                flex: 0.5,
              }}
              text={t('apply')}
              onPress={handleSubmit(handelFiter)}
              styleText={{
                fontSize: SIZES.xMedium,
              }}
            />
          </View>
        }
        styleContent={{
          paddingHorizontal: scale(16),
          rowGap: scale(5),
        }}>
        <InViewport
          styleLoading={{
            marginTop: '40%',
            height: scale(120),
            width: scale(120),
          }}>
          <>
            <MenubarTour
              value={watch('menu')?.id}
              onType={value => {
                setValue('menu', value);
                unregister('budget');
              }}
            />
            {watch('menu')?.id === 'DOMESTIC' ||
            watch('menu')?.menu?.id === 'DOMESTIC' ? (
              <ProvinceTour
                value={watch('province') || listProvince?.data?.data?.rows?.[0]}
                onProvince={value => {
                  setValue('province', value);
                }}
                // nameProvince={watch('province')}
                data={listProvince?.data?.data?.rows?.slice(0, 8)}
                onSearch={() => bottomSheetChildRef.current.openChild()}
              />
            ) : (
              <CountryTour
                value={watch('country') || listCountry?.data?.data?.rows?.[0]}
                onCountry={value => {
                  setValue('country', value);
                }}
                // nameProvince={watch('province')}
                data={listCountry?.data?.data?.rows?.slice(0, 8)}
                onSearch={() => bottomSheetChildRef.current.openChild()}
              />
            )}
            <Budget
              estateT={false}
              value={watch('budget')}
              onBudget={value => {
                setValue('budget', value);
              }}
            />

            <SortBy
              value={watch('sortPrice')}
              onSort={value => {
                setValue('sortPrice', value);
              }}
            />
          </>
        </InViewport>

        {/* <BedRoom /> */}
      </BottomSheet>
    </View>
  );
});

const styles = StyleSheet.create({});

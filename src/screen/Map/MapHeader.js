/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';

import {useQuery} from '@tanstack/react-query';
import {useForm} from 'react-hook-form';
import {getListCountry} from '../../Model/api/common';
import {COLORS, SHADOW, SIZES, scale} from '../../assets/constants';
import {CustomButton, CustomInput} from '../../components';
import BottomSheet from '../../components/BottomSheet';
import InViewport from '../../components/InViewport';
import {useCountry} from '../../hooks/useCountry';
import {useLanguage} from '../../hooks/useLanguage';
import FilterSort from '../Explore/components/DetailAccommodation/Review/FilterSort';
import Acreage from './Header/Acreage';
import BottomSheetChild from './Header/BottomSheetChild';
import Budget from './Header/Budget';
import MapProvince from './Header/MapProvince';
import Menubar from './Header/Menubar';
import RatingReview from './Header/RatingReview';
import SortBy from './Header/SortBy';
import StartAccom from './Header/StartAccom';
import TypeAccommoda from './Header/TypeAccommoda';
import TypeEstate from './Header/TypeEstate';

export default memo(function MapHeader({
  onFilter = () => {},
  accom,
  estate,
  menu,
  mapProvince,
  dataReturn,
}) {
  const {t} = useLanguage();
  const listFill = [
    {
      text: t('on_promotion'),
    },
    {
      text: t('no_minimum'),
    },
    {
      text: t('full_furnished'),
    },
    {
      text: t('unfurnished'),
    },
  ];
  const bottomSheetRef = useRef();
  const bottomSheetChildRef = useRef();
  const {country} = useCountry();
  const [openBottom, setOpenBottom] = useState(false);
  const listProvince = useQuery({
    queryKey: ['common', 'list-country', country?.geoname_id],
    queryFn: () => getListCountry(country?.geoname_id),
  });
  const {control, handleSubmit, watch, setValue, reset, unregister} = useForm({
    defaultValues: {
      menu: {id: 'RENT', name: t('RENT')},
      province: listProvince.data?.data?.[0],
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

  const handleReset = useCallback(value => {
    const keyReset = Object.keys(watch());
    if (keyReset.includes('province')) {
      reset();
    }
    setIsRender(false);
  }, []);

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        zIndex: 10,
        ...SHADOW,
      }}>
      {/* <HeaderBar /> */}
      <View>
        <FilterSort
          text={t('filter')}
          listFill={listFill}
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
            <BottomSheetChild
              data={listProvince}
              onChange={handleSelectProvince}
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
                // onPress={() => {
                //   token ? navigate('NavigationAuth') : navigate('BookingRoomScreen');
                // }}
                // onPress={onPress}
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
          <CustomInput
            placeholder={t('accommodation_name')}
            name="name"
            control={control}
          />

          <InViewport
            delay={100}
            onChange={setIsRender}
            styleLoading={{
              marginTop: '40%',
              height: scale(120),
              width: scale(120),
            }}>
            {isRender && (
              <>
                {menu && (
                  <>
                    <Menubar
                      value={watch('menu')?.id}
                      onType={value => {
                        setValue('menu', value);
                        setIsRender(false);
                      }}
                    />

                    {watch('menu')?.id === 'RENT' || !watch('menu') ? (
                      <TypeAccommoda
                        value={watch('type')}
                        onType={value => {
                          setValue('type', value?.id);
                        }}
                      />
                    ) : watch('menu')?.id === 'BUY' ? (
                      <>
                        <TypeEstate
                          value={watch('type')}
                          onType={value => {
                            setValue('type', value?.id);
                          }}
                        />
                        <Acreage
                          value={watch('acreage')}
                          onAcreage={value => {
                            setValue('acreage', value);
                          }}
                        />
                      </>
                    ) : (
                      <View></View>
                    )}
                  </>
                )}
                {mapProvince && (
                  <MapProvince
                    value={watch('province')}
                    onProvince={value => {
                      setValue('province', value);
                    }}
                    // nameProvince={watch('province')}
                    data={listProvince}
                    onSearch={() => bottomSheetChildRef.current.openChild()}
                  />
                )}
                {/* <RatingReview /> */}
                {accom && (
                  <View
                    style={{
                      rowGap: scale(20),
                    }}>
                    <TypeAccommoda
                      value={watch('type')}
                      onType={value => {
                        setValue('type', value?.id);
                      }}
                    />
                    <StartAccom />

                    <RatingReview />
                  </View>
                )}
                {estate && (
                  <>
                    <TypeEstate
                      value={watch('type')}
                      onType={value => {
                        setValue('type', value?.id);
                      }}
                    />
                    <Acreage
                      value={watch('acreage')}
                      onAcreage={value => {
                        setValue('acreage', value);
                      }}
                    />
                  </>
                )}
                <Budget
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
            )}
          </InViewport>

          {/* <BedRoom /> */}
        </BottomSheet>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({});

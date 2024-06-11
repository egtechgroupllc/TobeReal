import React, {useEffect, useRef, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';

import {COLORS, SHADOW, SIZES, scale} from '../../assets/constants';
import {CustomButton, CustomInput} from '../../components';
import BottomSheet from '../../components/BottomSheet';
import {useLanguage} from '../../hooks/useLanguage';
import FilterSort from '../Explore/components/DetailAccommodation/Review/FilterSort';
import BedRoom from './Header/BedRoom';
import Budget from './Header/Budget';
import RatingReview from './Header/RatingReview';
import SortBy from './Header/SortBy';
import TypeAccommoda from './Header/TypeAccommoda';
import {useForm} from 'react-hook-form';
import TypeEstate from './Header/TypeEstate';
import Menubar from './Header/Menubar';
import {useCountry} from '../../hooks/useCountry';
import MapProvince from './Header/MapProvince';
import BottomSheetListSelect from '../../components/BottomSheetListSelect';
import {useQuery} from '@tanstack/react-query';
import {getListCountry} from '../../Model/api/common';
import BottomSheetChild from './Header/BottomSheetChild';
import InViewport from '../../components/InViewport';
import Acreage from './Header/Acreage';

export default function MapHeader({
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
              onChange={value => {
                value && setValue('province', value);
                bottomSheetChildRef.current.closeChild();
              }}
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
                onPress={() => {
                  const keyReset = Object.keys(watch());

                  if (keyReset.includes('province')) {
                    reset();
                    // unregister(keyReset);
                  }
                  setIsRender(false);
                }}
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
                  <TypeAccommoda
                    value={watch('type')}
                    onType={value => {
                      setValue('type', value?.id);
                    }}
                  />
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
}

const styles = StyleSheet.create({});

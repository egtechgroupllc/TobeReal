import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';

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
const listFill = [
  {
    text: 'On Promotion',
  },
  {
    text: 'No Minimum Stay',
  },
  {
    text: 'Full Furnished',
  },
  {
    text: 'Unfurnished',
  },
];
export default function MapHeader({
  onFilter = () => {},
  accom,
  estate,
  menu,
  mapProvince,
}) {
  const {t} = useLanguage();
  const bottomSheetRef = useRef();
  const bottomSheetChildRef = useRef();

  const {control, handleSubmit, watch, setValue, reset, unregister} = useForm();
  const {country} = useCountry();
  const [select, setSelect] = useState();

  const listProvince = useQuery({
    queryKey: ['common', 'list-country', country?.geoname_id],
    queryFn: () => getListCountry(country?.geoname_id),
  });
  const handelFiter = value => {
    onFilter && onFilter(value);

    bottomSheetRef.current.close();
  };

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
          onSort={() => bottomSheetRef.current.open()}
        />

        <BottomSheet
          snapPoints={['50%', '80%']}
          titleIndicator={t('filter&sort')}
          ref={bottomSheetRef}
          refChild={bottomSheetChildRef}
          handleChildBottom={() => (
            <BottomSheetChild
              data={listProvince}
              onChange={value => {
                bottomSheetChildRef.current.closeChild();
                setSelect(value);
                console.log(value);
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

                  reset();
                  unregister(keyReset);
                  bottomSheetRef.current.close();
                }}
              />
              <CustomButton
                // onPress={() => {
                //   token ? navigate('NavigationAuth') : navigate('BookingRoomScreen');
                // }}
                // onPress={onPress}
                buttonType="normal"
                style={{flex: 0.5}}
                text={t('Apply')}
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

          {menu && (
            <>
              <Menubar
                value={watch('menu')?.id}
                onType={value => {
                  setValue('menu', value);
                }}
              />
              {mapProvince && (
                <>
                  <MapProvince
                    value={watch('province')?.id}
                    onProvince={value => {
                      setValue('province', value);
                    }}
                    nameProvince={select}
                    data={listProvince}
                    onSearch={() => bottomSheetChildRef.current.openChild()}
                  />
                </>
              )}
              {watch('menu')?.name === 'RENT' || !watch('menu') ? (
                <TypeAccommoda
                  value={watch('type')}
                  onType={value => {
                    setValue('type', value?.id);
                  }}
                />
              ) : watch('menu')?.name === 'BUY' ? (
                <TypeEstate
                  value={watch('type')}
                  onType={value => {
                    setValue('type', value?.id);
                  }}
                />
              ) : (
                <View></View>
              )}
            </>
          )}

          {/* <RatingReview /> */}
          <SortBy
            value={watch('sortPrice')}
            onSort={value => {
              setValue('sortPrice', value);
            }}
          />
          <Budget
            value={watch('budget')}
            onBudget={value => {
              setValue('budget', value);
            }}
          />
          {accom && (
            <TypeAccommoda
              value={watch('type')}
              onType={value => {
                setValue('type', value?.id);
              }}
            />
          )}
          {estate && (
            <TypeEstate
              value={watch('type')}
              onType={value => {
                setValue('type', value?.id);
              }}
            />
          )}
          {/* <BedRoom /> */}
        </BottomSheet>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

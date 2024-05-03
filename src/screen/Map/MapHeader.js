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
export default function MapHeader({onFilter = () => {}, accom, estate, menu}) {
  const {t} = useLanguage();
  const bottomSheetRef = useRef();
  const {control, handleSubmit, watch, setValue} = useForm();
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

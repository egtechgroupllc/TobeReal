import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import CustomText from '../../components/CustomText';
import {COLORS, SIZES, scale} from '../../assets/constants';
import CustomImage from '../../components/CustomImage';
import getDistance from 'geolib/es/getDistance';
import {IconMapView} from '../../assets/icon/Icon';
// import BottomSheet from '../../components/BottomSheet';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {dataMapNearby} from '../../assets/dataFake/MapNearby';

export default function NearbyLocation({data, coordinate, type}) {
  const calculatorMeters = position => {
    const metters = getDistance(coordinate, position);

    return metters < 999
      ? `${metters} m`
      : `${(metters / 1000).toFixed(2).replace('.', ',')} km`;
  };
  const bottomSheetRef = useRef();
  const [checked, setChecked] = useState('tourist_attraction');
  // useEffect(() => {
  //   bottomSheetRef.current?.open();
  // }, []);
  const dataNew = useMemo(() => {
    const filterData = data?.filter(item => {
      const filterType = item?.types?.map(element => {
        return element;
      });
      return filterType?.includes(checked);
    });
    return filterData;
  }, [data, checked]);
  return (
    <BottomSheet
      ref={bottomSheetRef}
      titleIndicator={'Occupancy'}
      snapPoints={['20%', '40%', '95%']}
      index={1}
      styleContent={{
        rowGap: scale(10),
        padding: scale(20),
      }}>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: COLORS.grey,
          alignItems: 'center',
        }}>
        <CustomText
          textType="semiBold"
          style={{
            fontSize: SIZES.xMedium,
            padding: scale(10),
          }}>
          Địa điểm lân cận
        </CustomText>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 1,
          columnGap: scale(10),
          marginTop: scale(10),
          paddingHorizontal: scale(20),
          paddingVertical: scale(10),
        }}>
        {type?.map((item, index) => (
          <TouchableOpacity
            onPress={e => {
              item && setChecked(item?.id);
            }}
            key={index}
            activeOpacity={0.7}
            style={{
              justifyContent: 'center',
              borderWidth: 1,
              width: scale(110),
              height: scale(25),
              borderRadius: 99,
              alignItems: 'center',
              borderColor: checked === item?.id ? COLORS.primary : '#ccc',
              backgroundColor: checked === item?.id ? COLORS.primary : '#fff',
            }}>
            <CustomText
              style={{
                textAlign: 'center',
                color: checked === item?.id ? COLORS.white : COLORS.black,
              }}>
              {item?.name}
            </CustomText>
          </TouchableOpacity>
        ))}
      </View>
      <BottomSheetFlatList
        key={'keyMap'}
        data={dataNew}
        alwaysBounceVertical={false}
        directionalLockEnabled={true}
        contentContainerStyle={{
          paddingVertical: scale(10),
          paddingBottom: scale(50),
          paddingHorizontal: scale(20),
          rowGap: scale(10),
        }}
        renderItem={({item, index}) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: scale(10),
              borderBottomWidth: scale(1),
              borderColor: COLORS.grey,
              paddingBottom: scale(10),
            }}>
            <CustomImage
              source={item?.icon}
              style={{
                width: scale(20),
                height: scale(20),
              }}
            />
            <View
              style={{
                rowGap: scale(2),
                columnGap: scale(50),
                flex: 1,
                flexDirection: 'row',
              }}>
              <CustomText
                textType="semiBold"
                numberOfLines={1}
                style={{width: '70%'}}>
                {item?.name}
              </CustomText>
              <CustomText style={{color: '#687176'}} numberOfLines={1}>
                {calculatorMeters({
                  latitude: item.geometry.location.lat,
                  longitude: item.geometry.location.lng,
                })}
              </CustomText>
            </View>
          </View>
        )}
      />
    </BottomSheet>
  );
}

const styles = StyleSheet.create({});

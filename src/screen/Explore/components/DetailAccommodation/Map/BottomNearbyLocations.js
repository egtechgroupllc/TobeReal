import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import getDistance from 'geolib/es/getDistance';
import React, {memo, useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SIZES, scale} from '../../../../../assets/constants';
import CustomImage from '../../../../../components/CustomImage';
import CustomText from '../../../../../components/CustomText';
import Category from '../../../../components/Category';
import {SvgUri} from 'react-native-svg';
const listType = [
  {
    id: 'tourist_attraction',
    name: 'Sightseeing',
  },
  {
    id: 'health',
    name: 'Necessary',
  },
  {
    id: 'parking',
    name: 'Giao thông',
  },
  {
    id: 'establishment',
    name: 'Other',
  },
];

export default memo(function BottomNearbyLocations({
  data,
  setListLocationNearby,
  onSelect,
  focusedItem,
}) {
  const bottomSheetRef = useRef();

  const [checked, setChecked] = useState('tourist_attraction');

  const coordinate = useRef({
    latitude: data?.latitude,
    longitude: data?.longitude,
  }).current;

  const dataNew = useMemo(() => {
    const filterData = data?.listLocationNearby?.filter(item => {
      if (checked === 'establishment') {
        const excludedTypes = new Set([
          'park',
          'tourist_attraction',
          'health',
          'shopping_mall',
        ]);
        return (
          item.types.includes('establishment') &&
          !item.types.some(type => excludedTypes.has(type))
        );
      }
      if (checked === 'tourist_attraction') {
        const excludedTypes = new Set([
          'park',
          'tourist_attraction',
          'shopping_mall',
        ]);
        return item.types.some(type => excludedTypes.has(type));
      }

      return item?.types?.includes(checked);
    });

    return filterData;
  }, [data?.listLocationNearby, checked]);

  useEffect(() => {
    setListLocationNearby && setListLocationNearby(dataNew);
  }, [dataNew, setListLocationNearby]);

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
      <View style={styles.header}>
        <CustomText
          textType="semiBold"
          style={{
            fontSize: SIZES.xMedium,
            padding: scale(10),
          }}>
          Địa điểm lân cận
        </CustomText>
      </View>

      <Category
        isObject
        indexDefault={1}
        data={listType}
        onPress={value => setChecked(value?.id)}
        styleWrapper={{
          minHeight: scale(50),
        }}
      />
      <BottomSheetFlatList
        key={'keyMap'}
        data={dataNew}
        contentContainerStyle={styles.contentFlatList}
        renderItem={({item, index}) => (
          <NearbyItem
            key={index}
            item={item}
            coordinate={coordinate}
            onPress={() => onSelect(item)}
            isActive={focusedItem?.place_id === item.place_id}
          />
        )}
      />
    </BottomSheet>
  );
});

const calculatorMeters = (coordinate, position) => {
  const metters = getDistance(coordinate, position);

  return metters < 999
    ? `${metters} m`
    : `${(metters / 1000).toFixed(2).replace('.', ',')} km`;
};

const NearbyItem = ({item, coordinate, isActive, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.boxItem, isActive && {backgroundColor: '#f6fdff'}]}
      onPress={onPress}>
      <CustomImage
        source={item?.icon}
        style={{
          width: scale(20),
          height: scale(20),
        }}
      />
      {/* <SvgUri
        width={scale(20)}
        height={scale(20)}
        fill={type === 'parking' ? COLORS.error : item.icon_background_color}
        uri={`${item?.icon_mask_base_uri}.svg`}
      /> */}
      <View style={styles.bodyNearbyItem}>
        <CustomText textType="semiBold" numberOfLines={1} style={{flex: 1}}>
          {item?.name}
        </CustomText>
        <CustomText style={{color: '#687176'}}>
          {calculatorMeters(coordinate, {
            latitude: item.geometry.location.lat,
            longitude: item.geometry.location.lng,
          })}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderColor: COLORS.grey,
    alignItems: 'center',
  },
  contentFlatList: {
    paddingVertical: scale(10),
    paddingBottom: scale(50),
    paddingHorizontal: scale(20),
    rowGap: scale(10),
  },
  boxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(10),
    borderBottomWidth: scale(1),
    borderColor: COLORS.grey50,
    paddingBottom: scale(10),
  },
  bodyNearbyItem: {
    rowGap: scale(2),
    columnGap: scale(20),
    flex: 1,
    flexDirection: 'row',
  },
  btnType: {
    justifyContent: 'center',
    borderWidth: 1,
    width: scale(110),
    height: scale(25),
    borderRadius: 99,
    alignItems: 'center',
  },
});

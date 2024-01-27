import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {CustomInput} from '../../components';
import {IconMapView, IconMyLocation, IconSearch} from '../../assets/icon/Icon';
import {COLORS, SHADOW, SIZES, scale} from '../../assets/constants';
import CustomText from '../../components/CustomText';
import RecommendedUnitItem from '../Explore/components/ContentAccommodation/RecommendedUnitItem';
import WrapperContent from '../Explore/components/WrapperContent';
import BigCity from '../Explore/components/ContentAccommodation/BigCity';
import {useNavigation} from '@react-navigation/native';

export default function SearchChooseLocation({onPress}) {
  const {navigate} = useNavigation();

  return (
    <View style={styles.search}>
      <View>
        <CustomInput
          iconLeft={IconSearch}
          placeholder="Where would you like to go?"
        />

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onPress('Around me')}
          style={[styles.searchItem, {borderBottomWidth: 1}]}>
          <IconMyLocation fill={COLORS.primary} />
          <CustomText style={{fontSize: SIZES.xMedium}}>Around me</CustomText>
        </TouchableOpacity>

        {/* <TouchableOpacity activeOpacity={0.7} style={styles.searchItem}>
          <IconMapView
            fill={COLORS.primary}
            style={{
              height: scale(20),
              width: scale(20),
            }}
          />
          <CustomText style={{fontSize: SIZES.xMedium}}>
            Select on the map
          </CustomText>
        </TouchableOpacity> */}
      </View>

      <BigCity
        styleWrapper={{
          paddingHorizontal: 0,
          columnGap: scale(10),
        }}
        styleItem={{
          width: scale(90),
          minHeight: scale(80),
        }}
        styesTextTitle={{
          fontSize: SIZES.small,
        }}
        onPress={value => onPress(JSON.stringify(value?.index))}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    padding: scale(12),
    borderRadius: scale(10),
    backgroundColor: COLORS.white,
    ...SHADOW,
    // minHeight: 200,
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(10),
    paddingVertical: scale(14),
    borderBottomColor: '#f1f1f1',
  },
});
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {CustomInput} from '../../components';
import {
  IconHistory,
  IconMapView,
  IconMyLocation,
  IconSearch,
} from '../../assets/icon/Icon';
import {COLORS, SHADOW, SIZES, scale} from '../../assets/constants';
import CustomText from '../../components/CustomText';
import RecommendedUnitItem from '../Explore/components/ContentAccommodation/RecommendedUnitItem';
import WrapperContent from '../Explore/components/WrapperContent';
import BigCity from '../Explore/components/ContentAccommodation/BigCity';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';

export default function SearchChooseLocation({onPress}) {
  const {navigate} = useNavigation();
  const {control, setValue, watch, handleSubmit} = useForm();

  const goHome = value => {
    navigate('HomeExploreScreen', value);
  };

  return (
    <View style={styles.search}>
      <View>
        <CustomInput
          autoFocus
          control={control}
          iconLeft={IconSearch}
          placeholder="Where would you like to go?"
          returnKeyType="search"
          onSubmitEditing={handleSubmit(goHome)}
          name="name"
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
        <View style={styles.title}>
          <CustomText
            textType="semiBold"
            style={{
              fontSize: SIZES.xMedium,
            }}>
            Recent searches
          </CustomText>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={['Jakarta', 'Bandung', 'Tangerang']}
          scrollEnabled={false}
          // contentContainerStyle={{
          //   paddingHorizontal: scale(16),
          // }}
          renderItem={({item, index}) => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => onPress(item)}
              style={[styles.searchItem]}>
              <IconHistory
                fill={COLORS.textSub}
                style={{
                  height: scale(16),
                  width: scale(16),
                }}
              />
              <CustomText
                numberOfLines={1}
                style={{
                  flex: 1,
                }}>
                {item}
              </CustomText>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* <BigCity
        noContain
        renderReply={false}
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
        onPress={value => onPress(value.item)}
      /> */}
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
    zIndex: 99,
  },
  title: {
    padding: scale(10),
    fontSize: SIZES.xMedium,
    borderBottomColor: '#f1f1f1',
    borderBottomWidth: 1,
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(10),
    paddingVertical: scale(14),
    borderBottomColor: '#f1f1f1',
  },
});

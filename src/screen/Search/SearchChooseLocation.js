import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {COLORS, SHADOW, SIZES, scale} from '../../assets/constants';
import {IconHistory, IconMyLocation, IconSearch} from '../../assets/icon/Icon';
import {CustomInput} from '../../components';
import CustomText from '../../components/CustomText';

export default function SearchChooseLocation({onPress}) {
  const {navigate} = useNavigation();
  const {control, setValue, watch, handleSubmit} = useForm();
  const [listSearchHistory, setListSearchHistory] = useState([]);

  useEffect(() => {
    const loadSearchRecent = async () => {
      const result = await EncryptedStorage.getItem('search_recent');
      setListSearchHistory(JSON.parse(result));
    };
    loadSearchRecent();
  }, []);
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
          onPress={() => onPress('Near me')}
          style={[styles.searchItem, {borderBottomWidth: 1}]}>
          <IconMyLocation fill={COLORS.primary} />
          <CustomText style={{fontSize: SIZES.xMedium, color: COLORS.black}}>
            Near me
          </CustomText>
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
              color: COLORS.black,
            }}>
            Recent searches
          </CustomText>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={listSearchHistory}
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
                fill={COLORS.black}
                style={{
                  height: scale(16),
                  width: scale(16),
                }}
              />
              <CustomText
                numberOfLines={1}
                style={{
                  flex: 1,
                  color: COLORS.black,
                }}>
                {item?.name}
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

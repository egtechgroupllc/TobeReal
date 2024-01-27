import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {IconHistory} from '../../assets/icon/Icon';
import {COLORS, SHADOW, SIZES, WIDTH, scale} from '../../assets/constants';
import CustomText from '../../components/CustomText';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function SearchRecent({onPress}) {
  return (
    <View style={styles.search}>
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
        data={[...Array(10)]}
        contentContainerStyle={{
          paddingHorizontal: scale(16),
        }}
        renderItem={({item, index}) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onPress(JSON.stringify(index))}
            style={[styles.searchItem, {borderTopWidth: index === 0 ? 0 : 1}]}>
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
              {index} Around meAroundx
            </CustomText>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    borderRadius: scale(10),
    backgroundColor: COLORS.white,
    ...SHADOW,
    maxHeight: WIDTH.heightScreen / 1.9,
  },
  title: {
    padding: scale(16),
    fontSize: SIZES.xMedium,
    borderBottomColor: '#f1f1f1',
    borderBottomWidth: 1,
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(10),
    paddingVertical: scale(14),
    borderTopColor: '#f1f1f1',
  },
});

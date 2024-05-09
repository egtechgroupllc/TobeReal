import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SHADOW, SIZES, WIDTH, scale} from '../../assets/constants';
import {IconHistory} from '../../assets/icon/Icon';
import CustomText from '../../components/CustomText';

export default function SearchPopular({onPress, data}) {
  return (
    <View style={styles.search}>
      <View style={styles.title}>
        <CustomText
          textType="semiBold"
          style={{
            fontSize: SIZES.xMedium,
          }}>
          Popular destination
        </CustomText>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        contentContainerStyle={{
          paddingHorizontal: scale(16),
        }}
        scrollEnabled={false}
        renderItem={({item, index}) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onPress(item)}
            style={[
              styles.searchItem,
              {
                borderTopWidth: index === 0 ? 0 : 1,
              },
            ]}>
            {/* <IconHistory
              fill={COLORS.textSub}
              style={{
                height: scale(16),
                width: scale(16),
              }}
            /> */}
            <CustomText
              numberOfLines={1}
              style={{
                flex: 1,
              }}>
              {item?.name}
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
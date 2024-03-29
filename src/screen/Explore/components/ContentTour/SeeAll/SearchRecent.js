import React, {useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  COLORS,
  SHADOW,
  SIZES,
  WIDTH,
  images,
  scale,
} from '../../../../../assets/constants';
import {IconDown, IconHistory} from '../../../../../assets/icon/Icon';
import CustomText from '../../../../../components/CustomText';


export default function SearchRecent({onPress}) {
  const [isRender, setIsRender] = useState(false);
  return (
      <View style={styles.search}>
        <TouchableOpacity
          style={styles.title}
          onPress={() => setIsRender(prev => !prev)}>
          <CustomText
            textType="semiBold"
            style={{
              fontSize: SIZES.xMedium,
            }}>
            Recent searches
          </CustomText>
          <IconDown />
        </TouchableOpacity>
        {isRender && (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={[
              'Jakarta',
              'Bandung',
              'Tangerang',
              'Bekasi',
              'Depok',
              'Surabaya',
              'Medan',
              'Bogor',
              'Makassar (Ujung Pandang)',
              'Sumedang',
              'Sidoarjo',
              'Yogyakarta (Jogja)',
              'Semarang',
            ]}
            contentContainerStyle={{
              paddingHorizontal: scale(16),
            }}
            renderItem={({item, index}) => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => onPress(item)}
                style={[
                  styles.searchItem,
                  {borderTopWidth: index === 0 ? 0 : 1},
                ]}>
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
        )}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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

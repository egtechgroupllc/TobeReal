import React, {useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  COLORS,
  SHADOW,
  SIZES,
  WIDTH,
  images,
  scale,
} from '../../../../../../assets/constants';
import {IconDown, IconHistory} from '../../../../../../assets/icon/Icon';
import CustomText from '../../../../../../components/CustomText';
import LinearGradient from 'react-native-linear-gradient';

export default function Filter() {
  const [activeIndex, setActiveIndex] = useState(0);

  const renderItem = ({item, index}) => {
    return activeIndex === index ? (
      <LinearGradient
        colors={['#F0B90B', '#FFE55A']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{
          ...styles.searchItem,
        }}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setActiveIndex(index)}>
          <CustomText textType="bold" numberOfLines={1}>
            {item}
          </CustomText>
        </TouchableOpacity>
      </LinearGradient>
    ) : (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setActiveIndex(index)}
        style={{
          ...styles.searchItem,
          backgroundColor: '#F8F8F8',
        }}>
        <CustomText textType="bold" numberOfLines={1}>
          {item}
        </CustomText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.search}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={[
          'Our topics',
          'Lowest price first',
          'Best reviewed',
          'Recently',
          'On promotion',
          'Good review',
        ]}
        contentContainerStyle={{
          paddingHorizontal: scale(10),
          columnGap: scale(10),
        }}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    borderRadius: scale(10),
    // backgroundColor: COLORS.white,
    // borderWidth:scale(1),
    width: '80%',
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
    minWidth: scale(120),
    borderWidth: scale(1),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(5),
    borderColor: '#E3E3E3',
    // borderTopColor: '#f1f1f1',
  },
});

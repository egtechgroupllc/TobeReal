import React, {useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {scale} from '../../../../../../assets/constants';
import {IconDown} from '../../../../../../assets/icon/Icon';
import CustomText from '../../../../../../components/CustomText';
import PostTypeItem from './PostTypeItem';

const postType = [
  {
    name: 'Tin thường',
    price: '2073',
    numView: 0,
    searchRating: 'Đứng cuối kết quả tìm kiếm',
  },
  {
    name: 'VIP Bạc',
    price: '46636',
    numView: 11,
    searchRating: 'Hiển thị dưới VIP Vàng',
  },
  {
    name: 'VIP Vàng',
    price: '101046',
    numView: 18,
    searchRating: 'Hiển thị dưới VIP Kim Cương',
  },
  {
    name: 'VIP Kim Cương',
    price: '256500',
    numView: 90,
    searchRating: 'Đứng đầu kết quả tìm kiếm',
  },
];

export default function PostType({control, setValue}) {
  const [select, setSelect] = useState(1);
  const [seeMore, setIsSeeMore] = useState(false);

  return (
    <View style={styles.wrapper}>
      <CustomText
        textType="semiBold"
        style={{
          paddingHorizontal: scale(10),
          alignSelf: 'flex-start',
        }}>
        Chọn loại tin đăng:
      </CustomText>
      <FlatList
        contentContainerStyle={{
          columnGap: scale(10),
          padding: scale(10),
        }}
        showsHorizontalScrollIndicator={false}
        data={postType}
        horizontal
        renderItem={({item, index}) => {
          return (
            <PostTypeItem
              data={item}
              list={postType}
              onPress={() => setSelect(index)}
              seeMore={seeMore}
              isSelect={select === index}
            />
          );
        }}
      />

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setIsSeeMore(!seeMore)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: scale(10),
        }}>
        <CustomText
          style={{
            paddingHorizontal: scale(10),
          }}>
          {!seeMore ? 'Xem thêm tính năng' : 'Rút gọn'}
        </CustomText>
        <IconDown
          style={
            seeMore && {
              transform: [
                {
                  rotate: '180deg',
                },
              ],
            }
          }
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
    paddingVertical: scale(10),
  },
});

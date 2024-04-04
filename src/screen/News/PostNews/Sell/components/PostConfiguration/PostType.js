import React, {memo, useEffect, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {scale} from '../../../../../../assets/constants';
import {IconDown} from '../../../../../../assets/icon/Icon';
import CustomText from '../../../../../../components/CustomText';
import PostTypeItem from './PostTypeItem';
import {useQuery} from '@tanstack/react-query';
import {getListPackagePost} from '../../../../../../Model/api/common';
import ChoosePostTime from './ChoosePostTime';

const postType = [
  {
    searchRating: 'Đứng cuối kết quả tìm kiếm',
  },
  {
    searchRating: 'Hiển thị dưới VIP Vàng',
  },
  {
    searchRating: 'Hiển thị dưới VIP Kim Cương',
  },
  {
    searchRating: 'Đứng đầu kết quả tìm kiếm',
  },
];

export default memo(function PostType({
  control,
  setValue,
  onChangeDateEnd,
  params,
}) {
  const [select, setSelect] = useState(null);
  const [seeMore, setIsSeeMore] = useState(false);

  const {data, isSuccess} = useQuery({
    queryKey: ['common', 'list-package-post'],
    queryFn: getListPackagePost,
  });

  useEffect(() => {
    isSuccess && setSelect(data?.data[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  useEffect(() => {
    if (params?.package_post_item) {
      const result = data?.data?.find(item => {
        return item?.id === params?.package_post_item?.package_post_id;
      });
      result && setSelect(result);
    }
  }, [data?.data, params?.package_post_item]);

  return (
    <>
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
          data={data?.data}
          horizontal
          renderItem={({item, index}) => {
            return (
              <PostTypeItem
                data={{...item, ...postType[index]}}
                list={data?.data}
                onPress={() => setSelect(item)}
                seeMore={seeMore}
                isSelect={item?.id === select?.id}
              />
            );
          }}
        />

        {/* <TouchableOpacity
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
        </TouchableOpacity> */}
      </View>
      {select && (
        <ChoosePostTime
          control={control}
          setValue={setValue}
          data={select}
          onChangeDateEnd={onChangeDateEnd}
          params={params}
        />
      )}
    </>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
    paddingVertical: scale(10),
  },
});

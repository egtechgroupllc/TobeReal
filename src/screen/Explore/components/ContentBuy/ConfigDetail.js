import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, scale} from '../../../../assets/constants';
import CustomText from '../../../../components/CustomText';
import {formatDate} from '../../../../utils/format';

export default function ConfigDetail({data}) {
  return (
    <View style={styles.wrapper}>
      <View style={{flex: 1, rowGap: scale(20)}}>
        <View style={{flex: 1}}>
          <CustomText style={styles.center}>Ngày đăng</CustomText>
          <CustomText textType="medium">{data?.date_start}</CustomText>
        </View>

        <View style={{flex: 1}}>
          <CustomText style={styles.center}>Ngày hết hạn</CustomText>
          <CustomText textType="medium">
            {formatDate(data?.date_start, {
              addDays: data?.package_post_item?.number_day,
              dateStyle: 'yyyy-MM-dd',
            })}
          </CustomText>
        </View>
      </View>

      <View style={{flex: 1, rowGap: scale(20)}}>
        <View style={{flex: 1}}>
          <CustomText style={styles.center}>Loại tin</CustomText>
          <CustomText textType="medium" numberOfLines={1}>
            {data?.package_post_item?.package_post?.name}
          </CustomText>
        </View>
        <View style={{flex: 1}}>
          <CustomText style={styles.center}>Mã tin</CustomText>
          <CustomText textType="medium" numberOfLines={1}>
            {data?.id}
          </CustomText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    columnGap: scale(10),
    backgroundColor: '#fff',
    padding: scale(20),
  },
  center: {
    color: COLORS.text,
    marginBottom: scale(4),
  },
});

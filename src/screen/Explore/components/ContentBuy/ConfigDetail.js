import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, scale} from '../../../../assets/constants';
import CustomText from '../../../../components/CustomText';
import {formatDateTime} from '../../../../utils/format';

export default function ConfigDetail({data}) {
  return (
    <View style={styles.wrapper}>
      <View style={{flex: 1, rowGap: scale(20)}}>
        <View style={{flex: 1}}>
          <CustomText style={styles.center}>Date Submitted</CustomText>
          <CustomText textType="medium">{data?.date_start}</CustomText>
        </View>

        <View style={{flex: 1}}>
          <CustomText style={styles.center}>Expiration date</CustomText>
          <CustomText textType="medium" style={{color: COLORS.white}}>
            {formatDateTime(data?.date_start, {
              addDays: data?.package_post_item?.number_day,
              dateStyle: 'yyyy-MM-dd',
            })}
          </CustomText>
        </View>
      </View>

      <View style={{flex: 1, rowGap: scale(20)}}>
        <View style={{flex: 1}}>
          <CustomText style={styles.center}>Type of news</CustomText>
          <CustomText textType="medium" numberOfLines={1}>
            {data?.package_post_item?.package_post?.name}
          </CustomText>
        </View>
        <View style={{flex: 1}}>
          <CustomText style={styles.center}>News code</CustomText>
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
    backgroundColor: COLORS.transparentGrey,
    padding: scale(20),
  },
  center: {
    color: COLORS.white,

    marginBottom: scale(4),
  },
});

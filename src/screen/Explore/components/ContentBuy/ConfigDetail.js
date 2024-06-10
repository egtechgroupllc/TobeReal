import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, scale} from '../../../../assets/constants';
import CustomText from '../../../../components/CustomText';
import {formatDate} from '../../../../utils/format';
import {useLanguage} from '../../../../hooks/useLanguage';

export default function ConfigDetail({data}) {
  const {t} = useLanguage();

  return (
    <View style={styles.wrapper}>
      <View style={{flex: 1, rowGap: scale(20)}}>
        <View style={{flex: 1}}>
          <CustomText style={styles.center}>{t('date_posted')}</CustomText>
          <CustomText textType="medium" style={{color: COLORS.white}}>
            {data?.date_start}
          </CustomText>
        </View>
        <View style={{flex: 1, rowGap: scale(20)}}>
          <View style={{flex: 1}}>
            <CustomText style={styles.center}>{t('type')}</CustomText>
            <CustomText
              textType="medium"
              numberOfLines={1}
              style={{color: COLORS.white}}>
              {data?.package_post_item?.package_post?.name}
            </CustomText>
          </View>
          {/* <View style={{flex: 1}}>
          <CustomText style={styles.center}>News id</CustomText>
          <CustomText textType="medium" numberOfLines={1}>
            {data?.id}
          </CustomText>
        </View> */}
        </View>
      </View>
      <View style={{flex: 1}}>
        <CustomText style={styles.center}>{t('expiration_date')}</CustomText>
        <CustomText textType="medium" style={{color: COLORS.white}}>
          {formatDate(data?.date_start, {
            addDays: data?.package_post_item?.number_day,
            dateStyle: 'yyyy-MM-dd',
          })}
        </CustomText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    columnGap: scale(10),
    // backgroundColor: COLORS.trans,
    padding: scale(20),
  },
  center: {
    color: COLORS.white,
    marginBottom: scale(4),
  },
});

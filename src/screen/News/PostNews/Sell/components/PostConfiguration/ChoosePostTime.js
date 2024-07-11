/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useEffect, useMemo, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {COLORS, FONTS, SIZES, scale} from '../../../../../../assets/constants';
import {IconCalendar} from '../../../../../../assets/icon/Icon';
import {CustomInput} from '../../../../../../components';
import CustomText from '../../../../../../components/CustomText';
import {formatDate} from '../../../../../../utils/format';
import PostTimeItem from './PostTimeItem';
import {useLanguage} from '../../../../../../hooks/useLanguage';

export default memo(function ChoosePostTime({
  setValue,
  data,
  params,
  onChangeDateEnd,
}) {
  const {t} = useLanguage();

  const [select, setSelect] = useState(data?.package_post_items?.[0]);
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState(
    params?.date_start && !params?.value?.isRestore
      ? new Date(params?.date_start)
      : new Date(),
  );

  const dateStart = useMemo(
    () =>
      formatDate(date, {
        dateStyle: 'yyyy-MM-dd',
      }),
    [date],
  );

  const dateEnd = useMemo(
    () =>
      formatDate(date, {
        addDays: select?.number_day,
        dateStyle: 'yyyy-MM-dd',
      }),
    [select, date],
  );

  useEffect(() => {
    setValue('date_start', dateStart);
    setValue('package_post_item_id', select?.id);
  }, [dateStart, select]);

  useEffect(() => {
    onChangeDateEnd &&
      onChangeDateEnd({
        date,
        number_day: select?.number_day,
        id: select?.id,
      });
  }, [dateEnd]);

  useEffect(() => {
    setSelect(data?.package_post_items?.[0]);
  }, [data?.package_post_items?.[0]?.id]);

  useEffect(() => {
    if (params?.package_post_item) {
      const result = data?.package_post_items?.find(item => {
        return item?.id === params?.package_post_item?.id;
      });
      setSelect(result);
    }
  }, [params?.package_post_item]);

  return (
    <View style={styles.wrapper}>
      <CustomText
        textType="semiBold"
        style={{
          paddingHorizontal: scale(10),
          alignSelf: 'flex-start',
        }}>
        {t('choose_posting_time')}
      </CustomText>
      <View>
        <CustomText
          textType="semiBold"
          style={{
            paddingHorizontal: scale(10),
            alignSelf: 'flex-start',
          }}>
          {t('number_day_post')}
        </CustomText>
        <FlatList
          contentContainerStyle={{
            columnGap: scale(10),
            padding: scale(10),
          }}
          showsHorizontalScrollIndicator={false}
          data={data?.package_post_items}
          horizontal
          renderItem={({item, index}) => {
            return (
              <PostTimeItem
                onPress={() => setSelect(item)}
                isSelect={select?.id === item?.id}
                data={item}
                cost={data?.price}
              />
            );
          }}
        />
      </View>

      <View
        style={{
          paddingHorizontal: scale(10),
          rowGap: scale(6),
        }}>
        <CustomInput
          label={t('start_day')}
          styleTextLabel={{
            textType: 'semiBold',
          }}
          styleText={{
            color: '#000',
            fontSize: SIZES.xMedium,
            fontFamily: FONTS.medium,
          }}
          value={dateStart}
          onPress={() => setOpenDate(true)}
          iconRight={IconCalendar}
        />

        <DatePicker
          mode="date"
          title={t('start_day')}
          modal
          open={openDate}
          date={date}
          minimumDate={new Date()}
          onConfirm={time => {
            setOpenDate(false);
            setDate(time);
          }}
          onCancel={() => {
            setOpenDate(false);
          }}
        />

        <CustomText
          style={{
            color: COLORS.text,
          }}>
          {t('end_of_day')} {dateEnd}
        </CustomText>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    rowGap: scale(10),
  },
});

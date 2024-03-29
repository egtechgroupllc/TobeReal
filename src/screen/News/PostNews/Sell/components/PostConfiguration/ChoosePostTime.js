import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import CustomText from '../../../../../../components/CustomText';
import {COLORS, FONTS, SIZES, scale} from '../../../../../../assets/constants';
import {formatDateTime, formatPrice} from '../../../../../../utils/format';
import PostTimeItem from './PostTimeItem';
import {CustomInput} from '../../../../../../components';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import DatePicker from 'react-native-date-picker';
import {IconCalendar} from '../../../../../../assets/icon/Icon';
const postDate = [
  {
    numDays: 10,
    price: 2591,
    discount: 0,
  },
  {
    numDays: 15,
    price: 2331,
    discount: 15,
  },
  {
    numDays: 30,
    price: 2073,
    discount: 20,
  },
];
export default function ChoosePostTime({setValue}) {
  const [select, setSelect] = useState(postDate[0]);
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState(new Date());

  const dateStart = useMemo(
    () =>
      formatDateTime(date, {
        dateStyle: 'yyyy-MM-dd',
      }),
    [date],
  );

  const dateEnd = useMemo(
    () =>
      formatDateTime(date, {
        addDays: select?.numDays,
        dateStyle: 'yyyy-MM-dd',
      }),
    [select, date],
  );

  useEffect(() => {
    setValue('date_start', dateStart);
    setValue('date_end', dateEnd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateStart, dateEnd]);

  return (
    <View style={styles.wrapper}>
      <CustomText
        textType="semiBold"
        style={{
          paddingHorizontal: scale(10),
          alignSelf: 'flex-start',
        }}>
        Chọn thời gian đăng tin
      </CustomText>
      <View>
        <CustomText
          textType="semiBold"
          style={{
            paddingHorizontal: scale(10),
            alignSelf: 'flex-start',
          }}>
          Số ngày đăng
        </CustomText>
        <FlatList
          contentContainerStyle={{
            columnGap: scale(10),
            padding: scale(10),
          }}
          showsHorizontalScrollIndicator={false}
          data={postDate}
          horizontal
          renderItem={({item, index}) => {
            return (
              <PostTimeItem
                onPress={() => setSelect(item)}
                isSelect={select?.numDays === item?.numDays}
                data={item}
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
          label={'Ngày bắt đầu'}
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
          title={'Ngày bắt đầu'}
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
          Kết thúc ngày {dateEnd}
        </CustomText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    rowGap: scale(10),
  },
});

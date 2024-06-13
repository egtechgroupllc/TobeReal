import React, {memo, useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {COLORS} from '../../../../assets/constants';
import {useLanguage} from '../../../../hooks/useLanguage';
import {IconCalendar} from '../../../../assets/icon/Icon';
import BoxItem from './BoxItem';
import {formatDate} from '../../../../utils/format';

const SelectDateCheckIn = memo(({data, onConfirm}) => {
  const {t} = useLanguage();
  const [isOpenDate, setIsOpenDate] = useState(false);
  const [date, setDate] = useState(new Date(data?.date_start) || new Date());

  return (
    <>
      <BoxItem
        onPress={() => setIsOpenDate(true)}
        icon={<IconCalendar fill={COLORS.grey} />}
        label={'Ngày nhận phòng'}
        name={formatDate(date, {
          dateStyle: 'EEEE, yyyy-MM-dd',
        })}
      />
      <DatePicker
        title={t('check_out')}
        mode="date"
        modal
        open={isOpenDate}
        date={date}
        minimumDate={new Date()}
        onConfirm={time => {
          setDate(time);
          onConfirm(
            formatDate(time, {
              dateStyle: 'yyyy-MM-dd',
            }),
          );
          setIsOpenDate(false);
        }}
        onCancel={() => {
          setIsOpenDate(false);
        }}
      />
    </>
  );
});
export default SelectDateCheckIn;

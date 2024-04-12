/* eslint-disable react-hooks/exhaustive-deps */
import {differenceInDays} from 'date-fns';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {scale} from '../../../../../assets/constants';
import {IconCalendar} from '../../../../../assets/icon/Icon';
import {CustomButton} from '../../../../../components';
import BottomSheet from '../../../../../components/BottomSheet';
import BottomSheetListSelect from '../../../../../components/BottomSheetListSelect';
import CalendarRange from '../../../../../components/CalendarRange';
import CustomText from '../../../../../components/CustomText';
import {formatDate} from '../../../../../utils/format';
import TopCalendar from '../../FindAccommodation/Calendar/TopCalendar';

const formatDateStyle = (date, add = 0) => {
  const newDate = formatDate(
    date,
    add && {
      addDays: add,
    },
  );

  return newDate;
};

const minDate = formatDateStyle(minDate);

const dateEnd = formatDateStyle(minDate, 1);

export default function ChooseCalendarRoom({onSelectDate, data}) {
  const bottomSheetRef = useRef();
  const bottomSheetChild = useRef();

  const [selectedStartDate, setSelectedStartDate] = useState(minDate);
  const [selectedEndDate, setSelectedEndDate] = useState(dateEnd);

  const listSelectTime = useMemo(() => {
    return [...Array(30)].map((_, index) => {
      return {text: `${index + 1} đêm`, value: index + 1};
    });
  }, []);

  const [selected, setSelected] = useState(listSelectTime[0]);

  const onDateChange = date => {
    setSelectedEndDate(date?.date_end);
    setSelectedStartDate(date?.date_start);
  };

  useEffect(() => {
    if (selectedEndDate) {
      const difference = differenceInDays(selectedEndDate, selectedStartDate);

      if (difference) {
        const result = listSelectTime.find(time => time.value === difference);
        setSelected(result);
      }
    }
  }, [selectedEndDate]);

  useEffect(() => {
    onSelectDate && onSelectDate({selectedEndDate, selectedStartDate});
  }, []);

  const handleSelectDate = () => {
    bottomSheetRef.current.close();

    if (!selectedEndDate) {
      const newDate = formatDateStyle(selectedStartDate, selected?.value);
      setSelectedEndDate(newDate);
    }

    selectedEndDate && onSelectDate({selectedEndDate, selectedStartDate});
  };

  return (
    <View style={{...styles.row, flex: 1}}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          ...styles.row,
          ...styles.textDate,
        }}
        onPress={() => bottomSheetRef.current.open()}>
        <IconCalendar style={styles.icon} />
        <CustomText textType="medium">
          {selectedStartDate} - {selectedEndDate ? selectedEndDate : '_'},{' '}
          {selected?.text}
        </CustomText>
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        refChild={bottomSheetChild}
        titleIndicator={'Calendar'}
        snapPoints={['75%']}
        snapPointsChild={['60%']}
        onDismiss={handleSelectDate}
        handleChildBottom={() => (
          <BottomSheetListSelect
            value={selected}
            data={listSelectTime}
            onSelect={value => {
              setSelected(value);
              bottomSheetChild.current.closeChild();
              const newDate = formatDateStyle(selectedStartDate, value?.value);
              setSelectedEndDate(newDate);
            }}
          />
        )}
        styleContent={{
          rowGap: scale(10),
          paddingHorizontal: scale(20),
        }}>
        <TopCalendar
          value={selected?.text}
          checkIn={selectedStartDate}
          checkOut={selectedEndDate}
          onPressTime={() => {
            bottomSheetChild.current.openChild();
          }}
        />

        <View style={{flex: 1}}>
          <CalendarRange
            minDate={minDate}
            startDate={selectedStartDate}
            endDate={selectedEndDate}
            onDateChange={onDateChange}
            id={data?.id}
          />
        </View>

        <CustomButton
          buttonType="large"
          text="Select Date"
          style={{
            marginTop: scale(10),
          }}
          styleText={{
            textType: 'semiBold',
          }}
          onPress={handleSelectDate}
        />
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: scale(10),
  },
  textDate: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  icon: {
    width: scale(13),
    height: scale(13),
  },
});

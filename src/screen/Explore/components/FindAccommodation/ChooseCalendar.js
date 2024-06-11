/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SIZES, scale} from '../../../../assets/constants';
import {IconCalendar} from '../../../../assets/icon/Icon';
import {CustomInput} from '../../../../components';
import CustomText from '../../../../components/CustomText';
import {formatDate} from '../../../../utils/format';
import ChooseCalendarSheet from './ChooseCalendarSheet';
import {useLanguage} from '../../../../hooks/useLanguage';

const minDate = formatDate(new Date()); // Today
const dateEnd = formatDate(minDate, {addDays: 1});

export default function ChooseCalendar({rental, style, Checkin, onDate}) {
  const {t} = useLanguage();

  // Khai báo State
  const [selectedDate, setSelectedDate] = useState({
    date_start: minDate,
    date_end: dateEnd,
  });
  const [isOpen, setIsOpen] = useState(false);

  // Refs
  const bottomSheetRef = useRef();

  useEffect(() => {
    const newDate =
      rental === 'yearly'
        ? formatDate(minDate, {
            yearsToAdd: 1,
          })
        : rental !== 'daily'
        ? formatDate(minDate, {
            monthsToAdd: 1,
          })
        : formatDate(minDate, {
            addDays: 1,
          });

    setSelectedDate({
      date_start: minDate,
      date_end: newDate,
    });
    onDate &&
      onDate({
        date_start: minDate,
        date_end: newDate,
      });
  }, [rental]);

  const handleSelectDate = useCallback(date => {
    setSelectedDate(date);

    onDate && onDate(date);
  }, []);

  return (
    <View style={style}>
      {Checkin && (
        <CustomText style={{fontSize: SIZES.xMedium, paddingBottom: scale(5)}}>
          Check in - Check out
        </CustomText>
      )}
      <CustomInput
        // name="calendar"
        defaultValue={`${formatDate(selectedDate?.date_start)} - ${formatDate(
          selectedDate?.date_end || dateEnd,
        )}`}
        iconLeft={IconCalendar}
        styleIcon={styles.icon}
        onPress={() => {
          setIsOpen(true);
          // bottomSheetRef.current.open();
        }}
      />

      {isOpen && (
        <ChooseCalendarSheet
          ref={bottomSheetRef}
          onDate={handleSelectDate}
          rental={rental}
          style={style}
          value={selectedDate}
          isOpen={isOpen}
          onDismissSheet={() => setIsOpen(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: scale(20),
    height: scale(20),
  },
});

/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, SIZES, scale} from '../../../../assets/constants';
import {IconCalendar} from '../../../../assets/icon/Icon';
import {CustomButton, CustomInput} from '../../../../components';
import BottomSheet from '../../../../components/BottomSheet';
import CalendarRange from '../../../../components/CalendarRange';
import ListSelect from '../../../../components/BottomSheetListSelect';
import {useLanguage} from '../../../../hooks/useLanguage';
import {formatDate} from '../../../../utils/format';
import TopCalendar from './Calendar/TopCalendar';
import CustomText from '../../../../components/CustomText';

const minDate = formatDate(new Date()); // Today
let dateEnd = formatDate(minDate, {addDays: 1});

const listSelectTimeMonth = [
  {text: '1 Month', value: 1},
  {text: '2 Month', value: 2},
  {text: '3 Month', value: 3},
  {text: '4 Month', value: 4},
  {text: '5 Month', value: 5},
  {text: '6 Month', value: 6},
  {text: '7 Month', value: 7},
  {text: '8 Month', value: 8},
  {text: '9 Month', value: 9},
  {text: '10 Month', value: 10},
  {text: '11 Month', value: 11},
  {text: '12 Month', value: 12},
];
const listSelectTimeYear = [
  {text: '1 Yearly', value: 1},
  {text: '2 Yearly', value: 2},
  {text: '3 Yearly', value: 3},
];

export default function ChooseCalendar({rental, style, Checkin, onDate}) {
  const {t} = useLanguage();
  // Khai báo State
  const [selectedStartDate, setSelectedStartDate] = useState(minDate);
  const [selectedEndDate, setSelectedEndDate] = useState(dateEnd);
  const [selected, setSelected] = useState(null);
  // Refs
  const bottomSheetRef = useRef();
  const bottomSheetChild = useRef();

  // List được Memoized
  const listSelectTime = useMemo(
    () => (rental === t('yearly') ? listSelectTimeYear : listSelectTimeMonth),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rental],
  );
  useEffect(() => {
    onDate &&
      onDate({
        date_start: selectedStartDate,
        date_end: selectedEndDate,
      });
  }, []);
  const onDateChange = (date, type) => {
    setSelectedEndDate(date?.date_end);
    setSelectedStartDate(date?.date_start);
  };

  const handleSelectDate = () => {
    bottomSheetRef.current.close();

    const dateEndFallback = formatDate(selectedStartDate, {addDays: 1});

    if (!selectedEndDate || `${selectedStartDate}` === `${selectedEndDate}`) {
      setSelectedEndDate(dateEndFallback);
    }

    onDate &&
      onDate({
        date_start: selectedStartDate,
        date_end: selectedEndDate,
      });
  };

  // Hiệu ứng cho Sự thay đổi Ngày
  useEffect(() => {
    if (rental !== t('daily')) {
      const newDate =
        rental === t('yearly')
          ? formatDate(selectedStartDate || minDate, {
              yearsToAdd: selected?.value || 1,
            })
          : formatDate(selectedStartDate || minDate, {
              monthsToAdd: selected?.value || 1,
            });

      setSelectedEndDate(newDate);
    } else {
      setSelectedEndDate(dateEnd);
    }
  }, [selected, rental]);

  return (
    <View style={style}>
      {Checkin && (
        <CustomText style={{fontSize: SIZES.xMedium, paddingBottom: scale(5)}}>
          Check in - Check out
        </CustomText>
      )}
      <CustomInput
        // name="calendar"
        defaultValue={`${formatDate(selectedStartDate)} - ${formatDate(
          selectedEndDate || dateEnd,
        )}`}
        iconLeft={IconCalendar}
        styleIcon={styles.icon}
        onPress={() => bottomSheetRef.current.open()}
      />

      <BottomSheet
        ref={bottomSheetRef}
        refChild={bottomSheetChild}
        titleIndicator={'Calendar'}
        snapPoints={['75%']}
        snapPointsChild={['60%']}
        onDismiss={handleSelectDate}
        handleChildBottom={
          rental !== 'Daily' &&
          (() => (
            <ListSelect
              data={listSelectTime}
              onSelect={value => {
                bottomSheetChild.current.closeChild();
                setSelected(value);
              }}
            />
          ))
        }
        styleContent={{
          rowGap: scale(10),
          paddingHorizontal: scale(20),
        }}>
        <TopCalendar
          value={selected?.text}
          checkIn={selectedStartDate}
          checkOut={selectedEndDate}
          onPressTime={
            rental !== 'Daily' &&
            (() => {
              bottomSheetChild.current.openChild();
            })
          }
        />

        <View style={{flex: 1}}>
          <CalendarRange
            minDate={minDate}
            startDate={selectedStartDate}
            endDate={selectedEndDate}
            onDateChange={onDateChange}
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
  icon: {
    width: scale(20),
    height: scale(20),
  },
});

/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {StyleSheet, View} from 'react-native';
import {scale} from '../../../../assets/constants';
import {showMess} from '../../../../assets/constants/Helper';
import {CustomButton} from '../../../../components';
import BottomSheet from '../../../../components/BottomSheet';
import BottomSheetListSelect from '../../../../components/BottomSheetListSelect';
import CalendarRange from '../../../../components/CalendarRange';
import {useLanguage} from '../../../../hooks/useLanguage';
import {formatDate} from '../../../../utils/format';
import TopCalendar from './Calendar/TopCalendar';

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

export default forwardRef(function ChooseCalendarSheet(
  {rental, style, value, isOpen, onDate, onDismissSheet},
  ref,
) {
  const {t} = useLanguage();

  const [selectedStartDate, setSelectedStartDate] = useState(minDate);
  const [selectedEndDate, setSelectedEndDate] = useState(dateEnd);
  const [selected, setSelected] = useState(null);

  const bottomSheetChild = useRef();

  const selectDateFast = useRef();

  const listDays = useMemo(() => {
    return [...Array(30)].map((_, index) => {
      return {
        text: `${index + 1} ${t('night')}`,
        value: index + 1,
      };
    });
  }, []);
  useEffect(() => {
    isOpen && ref.current.open();
  }, [isOpen]);

  const listSelectTime = useMemo(
    () => {
      const result =
        rental === 'yearly'
          ? listSelectTimeYear
          : rental !== 'daily'
          ? listSelectTimeMonth
          : listDays;

      setSelected(result[0]);

      return result;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rental],
  );

  useEffect(() => {
    setSelectedStartDate(value?.date_start);
    setSelectedEndDate(value?.date_end);
  }, [JSON.stringify(value)]);

  const onDateChange = useCallback(
    (date, type) => {
      setSelectedEndDate(date?.date_end);
      setSelectedStartDate(date?.date_start);
      date?.date_start &&
        !selectDateFast.current &&
        setSelected(listSelectTime[0]);
      selectDateFast.current = false;
    },
    [JSON.stringify(listSelectTime[0])],
  );

  const handleSelectListDate = useCallback(valueDate => {
    bottomSheetChild.current.closeChild();
    selectDateFast.current = true;
    setSelected(valueDate);
  }, []);

  const handleSelectDate = useCallback(() => {
    ref.current.close();

    onDate &&
      onDate({
        date_start: selectedStartDate,
        date_end: selectedEndDate,
      });
  }, [selectedStartDate, selectedEndDate]);

  useEffect(() => {
    if (selected?.value && selectDateFast.current) {
      const _dateStart = selectedStartDate || minDate;

      const newDate =
        rental === 'yearly'
          ? formatDate(_dateStart, {
              yearsToAdd: selected?.value || 1,
            })
          : rental !== 'daily'
          ? formatDate(_dateStart, {
              monthsToAdd: selected?.value || 1,
            })
          : formatDate(_dateStart, {
              addDays: selected?.value || 1,
            });

      setSelectedEndDate(newDate);
    }
  }, [JSON.stringify(selected), rental, selectDateFast.current]);

  const onDismiss = useCallback(() => {
    setSelectedStartDate(value?.date_start);
    setSelectedEndDate(value?.date_end);
    onDismissSheet && onDismissSheet();
  }, [JSON.stringify(value)]);

  return (
    <BottomSheet
      ref={ref}
      refChild={bottomSheetChild}
      titleIndicator={t('calendar')}
      snapPoints={['75%']}
      snapPointsChild={['60%']}
      onDismiss={onDismiss}
      handleChildBottom={() => (
        <BottomSheetListSelect
          value={selected?.text}
          data={listSelectTime}
          onSelect={handleSelectListDate}
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
        />
      </View>

      <CustomButton
        buttonType="large"
        text={t('select_date')}
        style={{
          marginTop: scale(10),
        }}
        styleText={{
          textType: 'semiBold',
        }}
        onPress={() => {
          if (!selectedEndDate) {
            showMess('Vui long chon ngay tra phong ', 'error');
            return;
          }
          handleSelectDate();
        }}
      />
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  icon: {
    width: scale(20),
    height: scale(20),
  },
});

/* eslint-disable react-hooks/exhaustive-deps */
import {useQuery} from '@tanstack/react-query';
import {eachDayOfInterval, format, getMonth, getYear} from 'date-fns';
import Holidays from 'date-holidays';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {getListPriceRoomDate} from '../Model/api/apiAccom';
import {COLORS, SIZES, scale} from '../assets/constants';
import {formatNumber, formatPrice} from '../utils/format';
import CustomText from './CustomText';
import {Calendar} from 'react-native-calendars';
import InViewport from './InViewport';

var hd = new Holidays('VN');

export default function CalendarRange({
  minDate = new Date(),
  startDate,
  endDate,
  onDateChange,
  id,
}) {
  const [dateSelect, setDateSelect] = useState({
    date_start: startDate || null,
    date_end: endDate || null,
  });
  const [isRender, setIsRender] = useState(false);

  const clicked = useRef(false);

  const [dayMonth, setDayMonth] = useState(() => {
    const month = getMonth(new Date()) + 1;
    const year = getYear(new Date());

    const monthFormat = month > 9 ? month : `0${month}`;

    const day = new Date(year, month, 0).getDate();

    return {
      date_start: `${year}-${monthFormat}-01`,
      date_end: `${year}-${monthFormat}-${day}`,
    };
  });

  const {data, isLoading} = useQuery({
    queryKey: [
      'accommodation',
      'detail',
      'list-room-date',
      {
        id_room: id,
        ...dayMonth,
      },
    ],
    queryFn: () =>
      getListPriceRoomDate({
        id_room: id,
        ...dayMonth,
      }),
    enabled: !!id,
  });
  const handlePress = useCallback(value => {
    if (clicked.current) {
      setDateSelect(prev => ({
        ...prev,
        date_end: value,
      }));
      clicked.current = false;
    } else {
      setDateSelect({
        date_start: value,
        date_end: null,
      });
      clicked.current = true;
    }
  }, []);

  useEffect(() => {
    if (endDate) {
      setDateSelect({
        date_start: startDate,
        date_end: endDate,
      });
      clicked.current = false;
    }
  }, [endDate]);

  useEffect(() => {
    if (dateSelect && onDateChange) {
      onDateChange({
        date_end: dateSelect.date_end,
        date_start: dateSelect.date_start,
      });
    }
  }, [JSON.stringify(dateSelect)]);

  const onMonthChange = useCallback(date => {
    const {year, month} = date;
    const monthFormat = month > 9 ? month : `0${month}`;
    const day = new Date(year, month, 0).getDate();
    setDayMonth({
      date_start: `${year}-${monthFormat}-01`,
      date_end: `${year}-${monthFormat}-${day}`,
    });
  }, []);

  const arrHolidays = useMemo(
    () => hd.getHolidays(getYear(dayMonth.date_start)),
    [dayMonth],
  );

  const markedDates = useMemo(() => {
    if (dateSelect.date_end) {
      const datesInRange = eachDayOfInterval({
        start: dateSelect.date_start,
        end: dateSelect.date_end,
      });

      return datesInRange.reduce((acc, date) => {
        const dateTime = format(date, 'yyyy-MM-dd');
        acc[dateTime] = {color: COLORS.primary, textColor: 'white'};
        return acc;
      }, {});
    }
  }, [dateSelect]);

  const dayComponent = date => {
    if (!date) return null;

    const isWeekend = date.accessibilityLabel.includes('Sunday');
    const isHoliday = arrHolidays.some(item => {
      return item.date.includes(date.date.dateString);
    });
    const isDateStart = dateSelect.date_start === date.date.dateString;
    const isDateEnd = dateSelect.date_end === date.date.dateString;
    const isDisableToday =
      !dateSelect.date_end && dateSelect.date_start && date.state === 'today';

    return (
      <View
        style={{
          alignItems: 'center',
          minHeight: scale(40),
        }}>
        <TouchableOpacity
          disabled={date.state === 'disabled' || isDisableToday}
          activeOpacity={0.6}
          style={{
            backgroundColor: date.marking?.color,
            alignItems: 'center',
            borderTopLeftRadius: isDateStart ? scale(99) : scale(0),
            borderBottomLeftRadius: isDateStart ? scale(99) : scale(0),
            borderTopRightRadius: isDateEnd ? scale(99) : scale(0),
            borderBottomRightRadius: isDateEnd ? scale(99) : scale(0),
            width: scale(49),
          }}
          onPress={() => {
            handlePress(date.date.dateString);
          }}>
          <BoxText
            date={date}
            isDateEnd={isDateEnd}
            isDateStart={isDateStart}
            isDisableToday={isDisableToday}
            isHoliday={isHoliday}
            isWeekend={isWeekend}
          />
        </TouchableOpacity>

        <TextPrice
          data={data?.data?.data?.rows}
          date={date}
          isLoading={isLoading}
          isWeekend={isWeekend}
        />
      </View>
    );
  };

  return (
    <InViewport
      onChange={render => render && setIsRender(render)}
      delay={30}
      styleLoading={{width: scale(120), height: scale(120)}}>
      {isRender && (
        <Calendar
          minDate={(!dateSelect.date_end && dateSelect.date_start) || minDate}
          startDate={minDate}
          hideExtraDays
          enableSwipeMonths
          onMonthChange={onMonthChange}
          theme={{
            arrowColor: COLORS.primary,
            weekVerticalMargin: id ? scale(6) : scale(2),
          }}
          dayComponent={dayComponent}
          markedDates={markedDates}
          markingType={'period'}
        />
      )}
    </InViewport>
  );
}

const BoxText = ({
  isDateStart,
  isDateEnd,
  date,
  isWeekend,
  isHoliday,
  isDisableToday,
}) => {
  return (
    <View
      style={{
        borderRadius: isDateStart || isDateEnd ? 99 : 0,
        borderWidth: isDateStart || isDateEnd ? 2 : 0,
        backgroundColor: (isDateStart || isDateEnd) && '#fff',
        borderColor: COLORS.green,
        width: '100%',
      }}>
      <CustomText
        textType="medium"
        style={{
          textAlign: 'center',
          paddingVertical: isDateStart || isDateEnd ? scale(2) : scale(4),
          color:
            ((isDateStart || isDateEnd) && '#000') ||
            date.marking?.textColor ||
            ((isWeekend || isHoliday) && date.state !== 'disabled'
              ? COLORS.error
              : date.state === 'disabled' || isDisableToday
              ? '#cccc'
              : date.state === 'today'
              ? COLORS.primary
              : '#000'),
          fontSize: SIZES.medium,
        }}>
        {date?.date.day}
      </CustomText>
    </View>
  );
};

const TextPrice = ({isLoading, date, isWeekend, data}) => {
  const dataDateDetail =
    data &&
    data?.find(item => {
      return item?.date === date.date.dateString;
    });

  const isDisable = date.state !== 'disabled';

  return isLoading
    ? isDisable && <CustomText>...</CustomText>
    : dataDateDetail?.price && isDisable && (
        <CustomText
          style={{
            color: '#000',
          }}>
          {formatNumber(dataDateDetail?.price)}
        </CustomText>
      );
};
const styles = StyleSheet.create({});

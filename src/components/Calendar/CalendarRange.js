/* eslint-disable react-hooks/exhaustive-deps */
import {useQuery} from '@tanstack/react-query';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getMonth,
  getYear,
  startOfMonth,
} from 'date-fns';
import Holidays from 'date-holidays';
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {getListPriceRoomDate} from '../Model/api/apiAccom';
import {Calendar} from 'react-native-calendars';
import {getListTicketDate} from '../Model/api/apiTour';
import {COLORS, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';
import InViewport from '../Loading/InViewport';
import CText from '../CText';
import {formatNumber} from '~/utils/format';

var hd = new Holidays('VN');

export default memo(function CalendarRange({
  minDate = new Date(),
  startDate,
  endDate,
  onDateChange,
  isOneDay,
  id,
  percentTour,
  theme,
  colorRange,
}) {
  // Xác định ngày đầu của tháng hiện tại và ngày cuối của tháng tiếp theo

  const [currentMonth, setCurrentMonth] = useState(getMonth(new Date()) + 1);
  const [currentYear, setCurrentYear] = useState(getYear(new Date()));
  // Giới hạn lịch trong khoảng thời gian đã xác định
  const [dateSelect, setDateSelect] = useState({
    date_start: startDate || null,
    date_end: (!isOneDay && endDate) || null,
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

  // const {data, isLoading} = useQuery({
  //   queryKey: isOneDay
  //     ? [
  //         'list',
  //         'ticket-date',
  //         {
  //           id_ticket: id,
  //           ...dayMonth,
  //         },
  //       ]
  //     : [
  //         'accommodation',
  //         'detail',
  //         'list-room-date',
  //         {
  //           id_room: id,
  //           ...dayMonth,
  //         },
  //       ],
  //   queryFn: () =>
  //     isOneDay
  //       ? getListTicketDate({
  //           id_ticket: id,
  //           ...dayMonth,
  //         })
  //       : getListPriceRoomDate({
  //           id_room: id,
  //           ...dayMonth,
  //         }),
  //   enabled: !!id,
  // });

  const handlePress = useCallback(value => {
    if (clicked.current && !isOneDay) {
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
    if (endDate && !isOneDay) {
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
    setCurrentMonth(month);
    setCurrentYear(year);

    const monthFormat = month > 9 ? month : `0${month}`;
    const day = new Date(year, month, 0).getDate();
    setDayMonth({
      date_start: `${year}-${monthFormat}-01`,
      date_end: `${year}-${monthFormat}-${day}`,
    });
  }, []);
  const isLeftArrowDisabled = useMemo(() => {
    return (
      currentYear === getYear(new Date()) &&
      currentMonth === getMonth(new Date()) + 1
    );
  }, [currentMonth, currentYear]);

  const isRightArrowDisabled = useMemo(() => {
    return (
      currentYear === getYear(new Date()) &&
      currentMonth === getMonth(new Date()) + 2
    );
  }, [currentMonth, currentYear]);
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
        acc[dateTime] = {
          color: colorRange || COLORS.primary,
          textColor: 'white',
        };
        return acc;
      }, {});
    }
  }, [JSON.stringify(dateSelect)]);

  const dayComponent = date => {
    if (!date) return null;

    const isWeekend = date.accessibilityLabel.includes('Sunday');
    const isHoliday = arrHolidays.some(item => {
      return item.date.includes(date.date.dateString);
    });
    const isDateStart = dateSelect.date_start === date.date.dateString;
    const isDateEnd = dateSelect.date_end === date.date.dateString;
    const isDisableToday = isOneDay
      ? false
      : !dateSelect.date_end && dateSelect.date_start && date.state === 'today';

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
          // data={data?.data?.data?.rows}
          date={date}
          // isLoading={isLoading}
          isWeekend={isWeekend}
          percentTour={percentTour}
        />
      </View>
    );
  };

  return (
    <InViewport
      delay={30}
      styleLoading={{width: scale(120), height: scale(120)}}>
      <Calendar
        minDate={
          isOneDay
            ? minDate
            : (!dateSelect.date_end && dateSelect.date_start) || minDate
        }
        disableArrowLeft={isLeftArrowDisabled}
        disableArrowRight={isRightArrowDisabled}
        startDate={minDate}
        hideExtraDays
        // enableSwipeMonths
        onMonthChange={onMonthChange}
        theme={{
          arrowColor: COLORS.primary,
          weekVerticalMargin: id ? scale(6) : scale(2),
          ...theme,
        }}
        dayComponent={dayComponent}
        markedDates={markedDates}
        markingType={'period'}
      />
    </InViewport>
  );
});

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
        borderColor: COLORS.blueView,
        width: '100%',
      }}>
      <CText
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
              ? COLORS.textSub
              : date.state === 'today'
              ? COLORS.cyan
              : COLORS.White),
          fontSize: SIZES.medium,
        }}>
        {date?.date.day}
      </CText>
    </View>
  );
};

const TextPrice = ({isLoading, date, isWeekend, data, percentTour}) => {
  const dataDateDetail =
    data &&
    data?.find(item => {
      return item?.date === date.date.dateString;
    });

  const isDisable = date.state !== 'disabled';

  return isLoading
    ? isDisable && <CText>...</CText>
    : dataDateDetail?.price && isDisable && (
        <CText
          style={{
            color: '#000',
          }}>
          {formatNumber(
            percentTour
              ? dataDateDetail?.price * percentTour
              : dataDateDetail?.price,
          )}
        </CText>
      );
};
const styles = StyleSheet.create({});

import {IconSortDescending} from '@tabler/icons-react-native';
import React, {useMemo, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, images, SIZES} from '~/assets/constants';
import {IconCalendar} from '~/assets/icon/Icon';
import {Button, CText, MainWrapper} from '~/components';
import AppointmentHeader from '~/components/AppointmentHeader/AppointmentHeader';
import TypeExamination from '~/components/AppointmentHeader/components/TypeExamination';
import BottomSheet from '~/components/BottomSheet';
import CalendarRange from '~/components/Calendar/CalendarRange';
import {useLanguage} from '~/hooks/useLanguage';
import Category from '~/screens/Products/ListProduct/components/Category';
import {formatDate} from '~/utils/format';
import {scale} from '~/utils/scale';
import HistoryScheduleItem from './components/HistorySchedule';
import HistorySchedule from './components/HistorySchedule';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {getHistoryBookingUser} from '~/api/appointment';
import {useAuthentication} from '~/hooks/useAuthentication';

export default function ScheduleAppointmentScreen() {
  const BottomSheetRef = useRef();
  const {t} = useLanguage();
  const listStatus = [
    {
      id: 'SUCCESS',
      name: 'SUCCESS',
    },
    {
      id: 'PENDING',
      name: 'PENDING',
    },
    {
      id: 'CANCEL',
      name: 'CANCELED',
    },
  ];
  const [status, setStatus] = useState(listStatus[0]);

  const minDate = formatDate(new Date());
  let dateEnd = formatDate(minDate, {addDays: 1});
  const [selectedEndDate, setSelectedEndDate] = useState(dateEnd);
  const [selectedStartDate, setSelectedStartDate] = useState(minDate);
  const {token} = useAuthentication();

  const bottomSheetRefCalendar = useRef();
  const onDateChange = date => {
    setSelectedEndDate(date?.date_end);
    setSelectedStartDate(date?.date_start);
  };
  const handleSelectDate = () => {
    bottomSheetRefCalendar.current.close();
  };

  return (
    <MainWrapper
      refreshControl
      sourceImage={images.backgroundHome}
      headerTitle={t('scheduled_appointment')}
      optionsHeader={{
        headerTitleStyle: {
          textAlign: 'left',
        },
        headerStyle: {
          paddingBottom: 0,
        },
        headerRight: () => {
          return (
            <Button.Icon
              Icon={IconSortDescending}
              color={COLORS.White}
              onPress={() => BottomSheetRef.current.open()}
            />
          );
        },
      }}>
      <View style={styles.contain}>
        {/* <Category
          data={listStatus}
          isObject
          onPress={value => setStatus(value)}
        /> */}
        <HistorySchedule />
      </View>
      <BottomSheet
        ref={BottomSheetRef}
        index={1}
        snapPoints={['60%', '70%']}
        titleIndicator={t('filter_more')}
        // onDismiss={!apply && reset}

        styleContent={{
          paddingHorizontal: scale(16),
          rowGap: scale(30),
        }}>
        <View style={{rowGap: scale(10)}}>
          <CText
            style={{fontSize: SIZES.small, color: COLORS.White}}
            textType="bold">
            {t('choose_time')}
          </CText>
          <Button
            Icon={IconCalendar}
            title={`${selectedStartDate} ${t('to')} ${selectedEndDate}`}
            iconProps={{fill: COLORS.primary, stroke: COLORS.White}}
            backgroundColor={COLORS.blueView}
            sizeButton={'normal'}
            onPress={() => bottomSheetRefCalendar.current.open()}
          />
        </View>

        <TypeExamination />

        <View style={{marginTop: scale(30)}}>
          <Button
            title={t('confirm')}
            linearGradientProps={{colors: COLORS.linearButton}}
          />
        </View>
      </BottomSheet>
      <BottomSheet
        ref={bottomSheetRefCalendar}
        index={1}
        snapPoints={['60%', '70%']}
        titleIndicator={t('calendar')}
        // onDismiss={!apply && reset}

        styleContent={{
          paddingHorizontal: scale(16),
          rowGap: scale(16),
        }}>
        <CalendarRange
          onDateChange={onDateChange}
          startDate={selectedStartDate}
          endDate={selectedEndDate}
          colorRange={COLORS.blueView}
          theme={{
            calendarBackground: 'transparent',
            textSectionTitleColor: COLORS.White,
            monthTextColor: COLORS.White,
            arrowColor: COLORS.White,
            disabledArrowColor: COLORS.primary,
          }}
        />

        <Button
          buttonType="large"
          title={t('select_date')}
          style={{
            marginTop: scale(10),
          }}
          styleText={{
            textType: 'semiBold',
          }}
          linearGradientProps={{colors: COLORS.linearButton}}
          onPress={handleSelectDate}
        />
      </BottomSheet>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
  },
});

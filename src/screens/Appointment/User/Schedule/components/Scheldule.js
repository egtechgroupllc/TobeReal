import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Button, CText} from '~/components';
import {COLORS, SIZES} from '~/assets/constants';
import {IconCalendar, IconX} from '~/assets/icon/Icon';
import {IconCalendarClock, IconPlus} from '@tabler/icons-react-native';
import {scale} from '~/utils/scale';
import {useNavigation} from '@react-navigation/native';
import EmptyData from '~/components/EmptyData';
import BottomSheet from '~/components/BottomSheet';
import {useLanguage} from '~/hooks/useLanguage';
import CalendarRange from '~/components/Calendar/CalendarRange';
import {useAuthentication} from '~/hooks/useAuthentication';
import {formatDate} from '~/utils/format';
const fake = [
  {
    time: '10:10',
  },
  {
    time: '10:10',
  },
  {
    time: '10:10',
  },
  {
    time: '10:10',
  },
  {
    time: '10:10',
  },
  {
    time: '10:10',
  },
  {
    time: '10:10',
  },
  {
    time: '10:10',
  },
  {
    time: '10:10',
  },
  {
    time: '10:10',
  },
  {
    time: '10:10',
  },
];
const today = formatDate(new Date());

export default function Scheldule({data, isDoctor, onPressCancel}) {
  const {navigate} = useNavigation();
  const bottomSheetRef = useRef();
  const {t} = useLanguage();
  const [dateSelect, setDateSelect] = useState(today);
  const {token} = useAuthentication();
  const handleSelectDate = value => {
    setDateSelect(value);
    bottomSheetRef.current.close();
  };
  const handleAddTime = () => {
    navigate('ManageTimeMakerScreen', {
      date: dateSelect?.date_start ? dateSelect?.date_start : today,
    });
  };
  const handleBook = value => {
    if (token) {
      navigate('NoBottomTab', {
        screen: 'BookAppointmentScreen',
        params: {...value, ...data},
      });
    } else {
      navigate('NavigationAuth', {screen: 'LoginScreen'});
    }
  };
  const timesData = isDoctor
    ? [data?.workingDoctor, {addTime: true}]
    : data?.workingDoctor;

  return (
    <View style={{rowGap: scale(10)}}>
      <CText
        style={{fontSize: SIZES.large, color: COLORS.White}}
        textType="bold">
        {t('scheldule')}
      </CText>
      <View style={{width: '40%'}}>
        <Button
          Icon={IconCalendar}
          title={dateSelect?.date_start || today}
          iconProps={{fill: COLORS.primary, stroke: COLORS.White}}
          backgroundColor={COLORS.White}
          styleText={{color: COLORS.primary}}
          sizeButton={'normal'}
          onPress={() => bottomSheetRef.current.open()}
        />
      </View>
      <FlatList
        data={timesData}
        numColumns={3}
        columnWrapperStyle={{columnGap: scale(10)}}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => `key-list-question${index}`}
        ListEmptyComponent={<EmptyData />}
        contentContainerStyle={{
          rowGap: scale(10),
          paddingTop: scale(10),
        }}
        renderItem={({item, index}) => {
          if (item?.addTime) {
            return (
              <TouchableOpacity
                onPress={handleAddTime}
                style={styles.addTimeButton}
                key={`add-time-${index}`}>
                <IconPlus
                  width={scale(15)}
                  height={scale(15)}
                  color={COLORS.White}
                />
                <CText
                  style={{color: COLORS.White, fontSize: SIZES.xSmall}}
                  textType="bold">
                  {t('add_time')}
                </CText>
              </TouchableOpacity>
            );
          }
          return (
            <TouchableOpacity
              onPress={() => {
                if (!isDoctor) {
                  handleBook({
                    ...item,
                    date: dateSelect?.date_start
                      ? dateSelect?.date_start
                      : today,
                  });
                } else {
                  navigate('ManageTimeMakerScreen', {
                    update: true,
                    ...item,
                    date: dateSelect?.date_start
                      ? dateSelect?.date_start
                      : today,
                  });
                }
              }}
              key={item?.id}
              style={styles.timeButton}>
              {isDoctor && (
                <View style={styles.cancel}>
                  <Button.Icon
                    Icon={IconX}
                    padding={0}
                    fill={COLORS.error}
                    width={scale(15)}
                    height={scale(15)}
                    onPress={onPressCancel}
                  />
                </View>
              )}
              <CText style={{color: COLORS.White}}>
                {item?.time_start} - {item?.time_end}
              </CText>
              <CText
                style={{color: COLORS.blue, fontSize: SIZES.xSmall}}
                textType="bold"
                numberOfLines={1}>
                [{item?.type}]
              </CText>
            </TouchableOpacity>
          );
        }}
      />

      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={['60%', '70%']}
        titleIndicator={t('calendar')}
        // onDismiss={!apply && reset}
        styleContent={{
          paddingHorizontal: scale(16),
          rowGap: scale(16),
        }}>
        <CalendarRange
          isOneDay
          onDateChange={value => handleSelectDate(value)}
          theme={{
            calendarBackground: 'transparent',
            textSectionTitleColor: COLORS.White,
            monthTextColor: COLORS.White,
            arrowColor: COLORS.White,
            disabledArrowColor: COLORS.blueView,
          }}
        />
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  timeButton: {
    backgroundColor: COLORS.input,
    width: scale(110),
    borderRadius: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(10),
    rowGap: scale(5),
  },
  addTimeButton: {
    backgroundColor: COLORS.GreenBlue,
    height: scale(30),
    width: scale(80),
    borderRadius: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: scale(5),
  },
  cancel: {
    alignSelf: 'flex-end',
    position: 'absolute',
    overflow: 'hidden',
    top: scale(-7),
    zIndex: 99,
    right: scale(-3),
    backgroundColor: COLORS.White,
    borderRadius: scale(99),
  },
});

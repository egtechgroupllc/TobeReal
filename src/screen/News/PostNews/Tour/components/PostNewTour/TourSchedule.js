import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Collapsible from 'react-native-collapsible';

import DatePicker from 'react-native-date-picker';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, SIZES, scale} from '../../../../../../assets/constants';
import {CustomButton, CustomInput} from '../../../../../../components';
import CustomText from '../../../../../../components/CustomText';
import InViewPort from '../../../../../../components/InViewport';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import {formatDateTime} from '../../../../../../utils/format';
import {
  requireField,
  validateMaxLengthText,
} from '../../../../../../utils/validate';
import ButtonTabValidate from '../../../Lease/components/ButtonTabValidate';

const caculateDays = (dateStart, dateEnd) => {
  const startDate = new Date(dateStart);
  const endDate = new Date(dateEnd);

  // Calculate the difference in milliseconds between the two dates
  const differenceInMilliseconds = endDate - startDate;

  // Convert milliseconds to total hours
  const differenceInHours = Math.round(
    differenceInMilliseconds / (1000 * 60 * 60),
  );

  // Calculate whole days and remaining hours
  const days = Math.floor(differenceInHours / 24);
  const remainingHours = Math.floor(differenceInHours % 24);
  const finalHours = remainingHours <= 24 ? remainingHours : 0;
  return {
    days: days,
    hours: finalHours,
  };
};

export default function TourSchedule({
  maxCharacters,
  control,
  setValue,
  watch,
  errors,
  unregister,
}) {
  const {t} = useLanguage();

  const [isView, setView] = useState(false);
  const [isRender, setIsRender] = useState(false);

  const viewGeneral = () => {
    setView(prev => !prev);
  };
  const arrKeywords = useRef([
    'title',
    'description',
    'address',
    'latitude',
    'longitude',
    'country_id',
    'province_id',
    'estate_type_id',
    'schedule',
    'total_hours',
  ]).current;

  const [openCheckStart, setOpenCheckStart] = useState(false);
  const [openCheckEnd, setOpenCheckEnd] = useState(false);

  const [timeCheckStart, setTimeCheckStart] = useState(new Date());
  const [timeCheckEnd, setTimeCheckEnd] = useState(
    new Date(timeCheckStart.getTime() + 1 * 60 * 60 * 1000),
  );

  const [selectedDay, setSelectedDay] = useState(0);
  const inputRef = useRef();

  const handleDayClick = dayNumber => {
    setSelectedDay(dayNumber);
  };

  const numDays = caculateDays(timeCheckStart, timeCheckEnd);

  useEffect(() => {
    setValue('total_hours', numDays.days * 24 + numDays.hours);
    setValue('refund_fee', 1);
  }, []);
  const handleConfirm = value => {
    if (numDays.days > value) {
      setSelectedDay(value);
    }
    const result = watch('schedule')?.filter(
      item =>
        item?.description !== watch(`description_day${selectedDay}`) &&
        item?.title !== `Day ${selectedDay + 1}`,
    );

    setValue(
      'schedule',
      watch('schedule')
        ? [
            ...result,
            {
              title: `Day ${selectedDay + 1}`,
              description: watch(`description_day${selectedDay}`),
            },
          ]
        : [
            {
              title: `Day ${selectedDay + 1}`,
              description: watch(`description_day${selectedDay}`),
            },
          ],
    );
  };

  return (
    <View>
      <ButtonTabValidate
        title={t('tour_schedule')}
        onPress={viewGeneral}
        errors={errors}
        watch={watch}
        arrKeywords={arrKeywords}
      />

      <InViewPort
        noLoading={true}
        onChange={render => render && setIsRender(render)}>
        {isRender && (
          <Collapsible collapsed={!isView} style={styles.box}>
            <View
              style={{
                flexDirection: 'row',
                columnGap: scale(10),
              }}>
              <CustomInput
                label={t('Ngày bắt đầu')}
                styleWrapper={{
                  flex: 1,
                }}
                styleTextLabel={styles.label}
                style={styles.input}
                styleText={styles.textInput}
                value={formatDateTime(timeCheckStart)}
                onPress={() => setOpenCheckStart(true)}
              />

              <CustomInput
                label={t('Ngày kết thúc')}
                styleTextLabel={styles.label}
                styleWrapper={{
                  flex: 1,
                }}
                style={styles.input}
                styleText={styles.textInput}
                value={formatDateTime(timeCheckEnd)}
                onPress={() => setOpenCheckEnd(true)}
              />

              <>
                <DatePicker
                  mode="datetime"
                  title={t('check_in')}
                  modal
                  minimumDate={new Date()}
                  open={openCheckStart}
                  date={timeCheckStart}
                  onConfirm={time => {
                    setOpenCheckStart(false);
                    setTimeCheckStart(time);
                    setTimeCheckEnd(
                      new Date(time.getTime() + 24 * 60 * 60 * 1000),
                    );
                  }}
                  onCancel={() => {
                    setOpenCheckStart(false);
                  }}
                />

                <DatePicker
                  title={t('check_out')}
                  mode="datetime"
                  modal
                  // locale="en-FR"
                  // is24Hour={true}
                  open={openCheckEnd}
                  date={timeCheckEnd}
                  minimumDate={
                    new Date(
                      new Date(timeCheckStart).getTime() + 1 * 60 * 60 * 1000,
                    )
                  }
                  maximumDate={
                    new Date(timeCheckStart.getTime() + 7 * 24 * 60 * 60 * 1000)
                  }
                  onConfirm={time => {
                    setOpenCheckEnd(false);
                    setTimeCheckEnd(time);
                  }}
                  onCancel={() => {
                    setOpenCheckEnd(false);
                  }}
                />
              </>
            </View>
            <CustomText style={{...styles.label, alignSelf: 'flex-start'}}>
              {t('tour_duration')}: {numDays.days} {t('days')} {numDays.hours}{' '}
              {t('hours')}
            </CustomText>
            <ScrollView
              horizontal
              style={{alignSelf: 'flex-start'}}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                columnGap: scale(10),
              }}>
              {Array.from(
                {length: numDays.days || (numDays.hours ? 1 : 0)},
                (_, dayNumber) =>
                  selectedDay === dayNumber ? (
                    <LinearGradient
                      colors={['#F0B90B', '#FFE55A']}
                      start={{x: 0, y: 0}}
                      end={{x: 0, y: 1}}
                      style={{
                        padding: scale(5),
                        paddingHorizontal: scale(20),
                        borderRadius: scale(5),
                        borderColor: COLORS.grey,
                      }}>
                      <TouchableOpacity
                        key={dayNumber}
                        onPress={() => handleDayClick(dayNumber)}>
                        <CustomText style={{...styles.label}}>
                          {t('day')}: {dayNumber + 1}
                        </CustomText>
                      </TouchableOpacity>
                    </LinearGradient>
                  ) : (
                    <TouchableOpacity
                      key={dayNumber}
                      style={{
                        alignSelf: 'flex-start',
                        borderWidth: scale(1),
                        padding: scale(5),
                        borderRadius: scale(5),
                        borderColor: COLORS.grey,
                        backgroundColor: 'white',
                      }}
                      onPress={() => handleDayClick(dayNumber)}>
                      <CustomText style={{...styles.label}}>
                        {t('day')}: {dayNumber + 1}
                      </CustomText>
                    </TouchableOpacity>
                  ),
              )}
            </ScrollView>
            {Array.from(
              {length: numDays.days || (numDays.hours ? 1 : 0)},
              (_, dayNumber) =>
                dayNumber === selectedDay && (
                  <>
                    <CustomInput
                      ref={inputRef}
                      styleTextLabel={styles.label}
                      label={t('description_content')}
                      control={control}
                      name={`description_day${selectedDay}`}
                      maxLength={5000}
                      multiline
                      value={watch(`description_day${selectedDay}`)}
                      placeholder={t('enter_a_description')}
                      rules={[
                        requireField(t('this_field_required')),
                        validateMaxLengthText(`${5000} characters limit`, 5000),
                      ]}
                      style={[
                        styles.textDesc,
                        {
                          minHeight: scale(130),
                          maxHeight: scale(300),
                        },
                      ]}
                      componentRight={
                        <Text style={styles.numText}>
                          {watch(`description_${selectedDay}`)?.length || 0}/
                          {5000}
                        </Text>
                      }
                    />

                    <CustomButton
                      styleWrapper={{width: '20%', alignSelf: 'flex-end'}}
                      buttonType="small"
                      text={t('ok')}
                      onPress={() => handleConfirm(dayNumber + 1)}
                    />
                  </>
                ),
            )}
          </Collapsible>
        )}
      </InViewPort>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: SIZES.small,
    color: COLORS.black,
  },

  box: {
    paddingTop: scale(20),
    minHeight: scale(100),
    backgroundColor: '#FFFFFF',
    borderRadius: scale(6),
    paddingHorizontal: scale(10),
    alignItems: 'center',
    borderColor: '#F0B90B80',
    borderWidth: scale(1),
    width: '100%',
    paddingBottom: scale(20),
    rowGap: scale(16),
  },
  line: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#F0B90B',
  },

  textDesc: {
    backgroundColor: '#E3E3E3',
    borderColor: '#E3E3E3',
    borderRadius: scale(6),
  },
  numText: {
    fontSize: SIZES.small,
    position: 'absolute',
    top: scale(-20),
    right: 0,
    color: COLORS.black,
  },

  title: {
    fontSize: SIZES.xMedium,
    color: COLORS.black,
    marginBottom: scale(10),
  },
  input: {
    borderWidth: 0,
    backgroundColor: '#E3E3E3',
    borderRadius: scale(6),
  },
  textInput: {
    color: COLORS.black,
    textAlign: 'center',
    fontSize: SIZES.medium,
  },
});

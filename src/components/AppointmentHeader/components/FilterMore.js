import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, SIZES} from '~/assets/constants';
import {IconCalendar, IconDown, IconSearch} from '~/assets/icon/Icon';
import BottomSheet from '~/components/BottomSheet';
import Button from '~/components/Button';
import CalendarRange from '~/components/Calendar/CalendarRange';
import CText from '~/components/CText';
import Input from '~/components/Input';
import {useLanguage} from '~/hooks/useLanguage';
import {formatDate} from '~/utils/format';
import {scale} from '~/utils/scale';
import Budget from './Budget';
import ListSpecialty from '../../../screens/Appointment/User/ListSpecialtyScreen';
import TypeExamination from './TypeExamination';
import {useNavigation, useRoute} from '@react-navigation/native';
import Status from './Status';
import Category from '~/screens/Products/ListProduct/components/Category';

export default function FilterMore({onChangeText, watch, setValue, doctor}) {
  const {t} = useLanguage();

  const {navigate} = useNavigation();
  const minDate = formatDate(new Date());
  let dateEnd = formatDate(minDate, {addDays: 1});
  const [selectedStartDate, setSelectedStartDate] = useState(minDate);
  const [dataSpecialty, setDataSpecialty] = useState([]);
  const [dataFacility, setDataFacility] = useState();

  const [selectedEndDate, setSelectedEndDate] = useState(dateEnd);
  const bottomSheetRefFilter = useRef();
  const bottomSheetRefCalendar = useRef();
  const bottomSheetChildRef = useRef();

  const handleSelectDate = () => {
    bottomSheetRefCalendar.current.close();
  };

  const onDateChange = date => {
    setSelectedEndDate(date?.date_end);
    setSelectedStartDate(date?.date_start);
  };
  const handleSelectSpecialty = useCallback(value => {
    value && setValue('array_specialty_id', value);
  }, []);

  const handleCloseChild = () => {
    bottomSheetChildRef.current.closeChild();
  };
  return (
    <View>
      <View style={{flexDirection: 'row', columnGap: scale(10)}}>
        <Button
          title={t('filter_more')}
          sizeButton="small"
          styleContent={{
            borderRadius: scale(5),
            justifyContent: 'space-between',
            paddingHorizontal: scale(20),
          }}
          styleText={{fontSize: SIZES.small}}
          style={{flex: 0.6}}
          iconRight
          Icon={IconDown}
          backgroundColor={COLORS.BlueNavyBold}
          onPress={() => bottomSheetRefFilter.current.open()}
        />
        {!doctor ? (
          <Button
            sizeButton="small"
            title={t('scheduled_appointment')}
            styleContent={{
              borderRadius: scale(5),
              columnGap: scale(10),
            }}
            styleText={{fontSize: SIZES.small}}
            Icon={IconCalendar}
            iconProps={{stroke: COLORS.primary}}
            style={{flex: 1}}
            backgroundColor={COLORS.BlueNavyBold}
            onPress={() =>
              navigate('NoBottomTab', {screen: 'ScheduleAppointmentScreen'})
            }
          />
        ) : (
          <Button
            sizeButton="small"
            title={t('work_manage')}
            styleContent={{
              borderRadius: scale(5),
              columnGap: scale(10),
            }}
            styleText={{fontSize: SIZES.small}}
            Icon={IconCalendar}
            iconProps={{stroke: COLORS.primary}}
            style={{flex: 1}}
            backgroundColor={COLORS.BlueNavyBold}
            onPress={() =>
              navigate('NoBottomTab', {screen: 'WorkManageScreen'})
            }
          />
        )}
      </View>
      <BottomSheet
        ref={bottomSheetRefFilter}
        index={1}
        snapPoints={['60%', '80%']}
        snapPointsChild={['70%', '80%']}
        titleIndicator={t('filter_more')}
        refChild={bottomSheetChildRef}
        // onDismiss={!apply && reset}
        // handleChildBottom={() => (
        //   <BottomSheetChild
        //     data={listSpecialty}
        //     onChange={handleSelectSpecialty}
        //     onPress={handleCloseChild}
        //   />
        // )}
        styleContent={{
          paddingHorizontal: scale(16),
          rowGap: scale(30),
        }}>
        <Input
          styleContent={{...styles.input, alignSelf: 'center'}}
          sizeInput={'small'}
          placeholder={t('search')}
          placeholderTextColor={COLORS.grey}
          styleText={{color: COLORS.primary}}
          onChangeText={onChangeText}
          icon={IconSearch}
          propsIcon={{fill: COLORS.White}}
        />

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
        <Status />

        {!doctor && (
          <>
            <Budget
              value={watch('budget')}
              onBudget={value => {
                setValue('budget', value);
              }}
            />

            <View style={{rowGap: scale(10)}}>
              <CText
                style={{fontSize: SIZES.small, color: COLORS.White}}
                textType="bold">
                {t('choose_specialty_medical_facility')}
              </CText>
              <View style={{flexDirection: 'row', columnGap: scale(10)}}>
                <Button
                  title={
                    dataSpecialty?.length
                      ? `${t('selected')} ${dataSpecialty?.length} ${t(
                          'specialties',
                        )}`
                      : t('choose_specialty')
                  }
                  backgroundColor={
                    dataSpecialty?.length > 0
                      ? COLORS.bluecyan
                      : COLORS.blueView
                  }
                  style={{flex: 1}}
                  sizeButton="normal"
                  onPress={() => {
                    navigate('NoBottomTab', {
                      screen: 'ListSpecialtyScreen',
                      params: {
                        onGoBack: value => {
                          setDataSpecialty(value);
                        },
                        openBottomSheet: () => {
                          bottomSheetRefFilter.current.open();
                        },
                        dataSpecialty,
                      },
                    });
                    bottomSheetRefFilter.current.close();
                  }}
                />
                <Button
                  title={
                    dataFacility
                      ? `${t('selected')} 1 ${t('facility')}`
                      : t('choose_facility')
                  }
                  style={{flex: 1}}
                  backgroundColor={
                    dataFacility ? COLORS.bluecyan : COLORS.blueView
                  }
                  sizeButton="normal"
                  onPress={() => {
                    navigate('NoBottomTab', {
                      screen: 'ListFacilityScreen',
                      params: {
                        onGoBack: value => {
                          setDataFacility(value);
                        },
                        openBottomSheet: () => {
                          bottomSheetRefFilter.current.open();
                        },
                        dataFacility,
                      },
                    });
                    bottomSheetRefFilter.current.close();
                  }}
                />
              </View>
            </View>
          </>
        )}

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
        titleIndicator={t('Calendar')}
        // onDismiss={!apply && reset}
        styleContent={{
          paddingHorizontal: scale(16),
          rowGap: scale(16),
        }}>
        <CalendarRange
          theme={{
            calendarBackground: 'transparent',
            textSectionTitleColor: COLORS.White,
            monthTextColor: COLORS.White,
            arrowColor: COLORS.White,
            disabledArrowColor: COLORS.primary,
          }}
          onDateChange={onDateChange}
          startDate={selectedStartDate}
          endDate={selectedEndDate}
          colorRange={COLORS.blueView}
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
          onPress={handleSelectDate}
        />
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({});

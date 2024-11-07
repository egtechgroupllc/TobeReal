import {StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {scale} from '~/utils/scale';
import {Button, CText} from '~/components';
import {COLORS, SIZES} from '~/assets/constants';
import {IconCalendar, IconDown, IconSearch} from '~/assets/icon/Icon';
import BottomSheet from '~/components/BottomSheet';
import {useLanguage} from '~/hooks/useLanguage';
import {useNavigation} from '@react-navigation/native';
import {formatDate} from '~/utils/format';
import Input from '~/components/Input';
import TypeExamination from '~/components/AppointmentHeader/components/TypeExamination';
import Status from '~/components/AppointmentHeader/components/Status';
import CalendarRange from '~/components/Calendar/CalendarRange';
import Budget from '~/components/AppointmentHeader/components/Budget';

export default function FilterSpecialty({onChangeText, watch, setValue}) {
  const {t} = useLanguage();

  const {navigate} = useNavigation();
  const minDate = formatDate(new Date()); // Today
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
  return (
    <View style={{paddingHorizontal: scale(15), width: '60%'}}>
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
      </View>
      <BottomSheet
        ref={bottomSheetRefFilter}
        index={1}
        snapPoints={['80%', '90%']}
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
          styleText={{color: COLORS.White}}
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
                dataSpecialty?.length > 0 ? COLORS.bluecyan : COLORS.blueView
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
              backgroundColor={dataFacility ? COLORS.bluecyan : COLORS.blueView}
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

        <View style={{marginTop: scale(30)}}>
          <Button
            title="Confirm"
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
          onDateChange={onDateChange}
          startDate={selectedStartDate}
          endDate={selectedEndDate}
          theme={{
            calendarBackground: 'transparent',
            textSectionTitleColor: COLORS.White,
            monthTextColor: COLORS.White,
            arrowColor: COLORS.White,
            disabledArrowColor: COLORS.blueView,
          }}
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

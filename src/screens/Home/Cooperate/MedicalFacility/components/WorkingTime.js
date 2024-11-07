import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ButtonTabValidate from '~/components/ChoosePhoto/ButtonTabValidate';
import {useLanguage} from '~/hooks/useLanguage';
import Collapsible from 'react-native-collapsible';
import {scale} from '~/utils/scale';
import {COLORS, SIZES} from '~/assets/constants';
import {CText} from '~/components';
import CheckBox from '~/components/CheckBox';
import TimeInput from './TimeInput';

export default function WorkingTime({errors, watch, onGoBack, setValue}) {
  const {t} = useLanguage();

  // Define the list of days
  const listDay = [
    {id: 'monday', name: t('monday')},
    {id: 'tuesday', name: t('tuesday')},
    {id: 'wednesday', name: t('wednesday')},
    {id: 'thursday', name: t('thursday')},
    {id: 'friday', name: t('friday')},
    {id: 'saturday', name: t('saturday')},
    {id: 'sunday', name: t('sunday')},
  ];

  // Initialize state for selected days
  const [selectedDays, setSelectedDays] = useState([]);
  const [workingTimes, setWorkingTimes] = useState([]);

  const [isView, setView] = useState(false);
  useEffect(() => {
    const unselectedDays = listDay.filter(
      day => !selectedDays.includes(day.id),
    );

    setWorkingTimes(prevTimes => {
      const updatedTimes = {...prevTimes};

      // Set each unselected day to false
      unselectedDays.forEach(day => {
        updatedTimes[day.id] = false;
      });

      return updatedTimes;
    });
  }, [selectedDays]);

  const handleToggleDay = dayId => {
    setSelectedDays(prevSelected => {
      if (prevSelected.includes(dayId)) {
        const updatedDays = prevSelected.filter(id => id !== dayId);

        const updatedTimes = {...workingTimes};
        delete updatedTimes[dayId];

        setWorkingTimes(updatedTimes);
        return updatedDays;
      } else {
        return [...prevSelected, dayId];
      }
    });
  };

  // Update working times for a selected day
  const handleTimeChange = (dayId, timeData) => {
    setWorkingTimes(prevTimes => ({
      ...prevTimes,
      [dayId]: timeData,
    }));
  };
  const viewGeneral = () => {
    setView(prev => !prev);
  };
  useEffect(() => {
    setValue('working_plan', workingTimes);
  }, [workingTimes]);

  return (
    <View>
      <ButtonTabValidate
        title={t('working_time')}
        onPress={viewGeneral}
        errors={errors}
        watch={watch}
      />
      <Collapsible collapsed={!isView} style={styles.box}>
        {listDay.map((day, index) => (
          <View key={index} style={styles.row}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => handleToggleDay(day.id)}>
              <CheckBox
                isRadio
                isChecked={selectedDays.includes(day.id)}
                textBold
                onPress={() => handleToggleDay(day.id)}
              />
              <CText style={styles.dayText} textType="semiBold">
                {day.name}
              </CText>
            </TouchableOpacity>

            <View style={{flex: 1}}>
              {selectedDays.includes(day.id) && (
                <TimeInput
                  onChange={timeData => handleTimeChange(day.id, timeData)}
                />
              )}
            </View>
          </View>
        ))}
      </Collapsible>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    paddingTop: scale(20),
    minHeight: scale(100),
    borderRadius: scale(6),
    paddingHorizontal: scale(10),
    borderColor: COLORS.input,
    borderWidth: scale(1),
    width: '100%',
    paddingBottom: scale(20),
    rowGap: scale(10),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(10),
  },
  checkboxContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayText: {
    color: COLORS.White,
    fontSize: SIZES.xMedium,
  },
});

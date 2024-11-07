import {FlatList, StyleSheet, View} from 'react-native';
import React, {useMemo} from 'react';
import EmptyData from '~/components/EmptyData';
import {scale} from '~/utils/scale';
import {COLORS, SIZES} from '~/assets/constants';
import {CText} from '~/components';

export default function WorkingPlan({data}) {
  const daysOfWeek = [
    {day: 'Monday', key: 'monday'},
    {day: 'Tuesday', key: 'tuesday'},
    {day: 'Wednesday', key: 'wednesday'},
    {day: 'Thursday', key: 'thursday'},
    {day: 'Friday', key: 'friday'},
    {day: 'Saturday', key: 'saturday'},
    {day: 'Sunday', key: 'sunday'},
  ];
  const formatWorkingPlan = plan => {
    return daysOfWeek.map(({day, key}) => {
      const workingHours = plan[key];

      // Handle both false and undefined cases as "Nghỉ"
      if (workingHours === false || !workingHours) {
        return {day, status: 'Nghỉ'};
      }

      // Handle start and end times
      return {
        day,
        status: `${workingHours.start} - ${workingHours.end}`,
      };
    });
  };
  const workingPlan = data?.working_plan?.[0] || {};
  const dataEx = formatWorkingPlan(workingPlan);
  return (
    <View>
      <FlatList
        data={dataEx}
        keyExtractor={(_, index) => `key-list-doctor-appointment-${index}`}
        contentContainerStyle={styles.container}
        ListEmptyComponent={<EmptyData />}
        renderItem={({item}) => {
          return (
            <View style={styles.item}>
              <View
                style={{
                  height: scale(5),
                  aspectRatio: 1,
                  borderRadius: scale(99),
                  backgroundColor: COLORS.White,
                }}
              />
              <CText
                style={{fontSize: SIZES.small, color: COLORS.White, flex: 1}}>
                {item.day}
              </CText>
              <CText
                style={{
                  fontSize: SIZES.small,
                  color: item?.status === 'Nghỉ' ? COLORS.error : COLORS.White,
                }}>
                {item.status}
              </CText>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: '100%',
    paddingVertical: scale(10),
    rowGap: scale(5),
    borderWidth: 1,
    padding: scale(10),
    borderColor: COLORS.overlay,
    borderRadius: scale(10),
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(10),
  },
});

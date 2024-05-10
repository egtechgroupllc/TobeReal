import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import {
  COLORS,
  FONTS,
  SIZES,
  WIDTH,
  scale,
} from '../../../../../../../assets/constants';

import {useForm} from 'react-hook-form';

import ChooseCalendar from '../../../../FindAccommodation/ChooseCalendar';
import {useLanguage} from '../../../../../../../hooks/useLanguage';

export default function FindContent({isBuy, rental}) {
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  const params = useRoute().params;

  const {control, setValue, handleSubmit} = useForm();

  useEffect(() => {
    params && setValue('location', params);
  }, [params]);

  return (
    <View style={styles.findContent}>
      <View
        style={{
          paddingHorizontal: scale(16),
          rowGap: scale(10),
          width: '175%',
        }}>
        {!isBuy && (
          <>
            <ChooseCalendar rental={rental} />

            {/* {rental === 'Daily' && <ChooseOccupancy />} */}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  findContent: {
    marginTop: scale(10),
    alignItems: 'center',
    rowGap: scale(10),
  },
  optionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '4%',
  },
  boxIcon: {
    paddingHorizontal: scale(10),
    minWidth: scale(48),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    minHeight: scale(36),
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: scale(20),
    height: scale(20),
  },

  question: {
    backgroundColor: COLORS.primary,
    width: scale(16),
    height: scale(16),
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 0,
  },
});

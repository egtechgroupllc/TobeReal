import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, scale} from '../../../../../../assets/constants';
import {CustomInput} from '../../../../../../components';
import CustomText from '../../../../../../components/CustomText';
import {requireField} from '../../../../../../utils/validate';
import {useLanguage} from '../../../../../../hooks/useLanguage';

export default function SetNamePolicy({control}) {
  const {t} = useLanguage();

  return (
    <View style={styles.boxCheckMeal}>
      <CustomInput
        placeholder={t('name')}
        control={control}
        name="name"
        style={styles.textInput}
        rules={[requireField(t('this_field_required'))]}
        maxLength={200}
      />
      <View style={styles.note}>
        <View style={styles.arrowTop} />
        <CustomText style={{color: COLORS.white}}>
          {t('this_not_affect')}
        </CustomText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boxCheckMeal: {
    rowGap: scale(12),
  },
  textInput: {
    borderRadius: scale(6),
  },
  note: {
    backgroundColor: COLORS.pioPrimary,
    borderColor: COLORS.pioPrimary,
    padding: scale(10),
    borderRadius: scale(6),
    alignItems: 'flex-start',
    marginLeft: scale(10),
  },
  arrowTop: {
    borderWidth: scale(7),
    borderColor: '#00000000',
    borderBottomColor: COLORS.pioPrimary,
    position: 'absolute',
    top: scale(-12),
    left: scale(10),
  },
});

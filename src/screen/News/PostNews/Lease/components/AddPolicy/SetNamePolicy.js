import React from 'react';
import {StyleSheet, View} from 'react-native';
import {scale} from '../../../../../../assets/constants';
import {CustomInput} from '../../../../../../components';
import CustomText from '../../../../../../components/CustomText';
import {requireField} from '../../../../../../utils/validate';
import {useLanguage} from '../../../../../../hooks/useLanguage';

export default function SetNamePolicy({control}) {
  const {t} = useLanguage();

  return (
    <View style={styles.boxCheckMeal}>
      <CustomInput
        placeholder="Name"
        control={control}
        name="name"
        style={styles.textInput}
        rules={[requireField(t('this_field_required'))]}
        maxLength={200}
      />
      <View style={styles.note}>
        <View style={styles.arrowTop} />
        <CustomText>
          This will not affect any length of stay restrictions installed in your
          calendar.
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
    backgroundColor: '#E3E3E3',
    borderColor: '#E3E3E3',
    padding: scale(10),
    borderRadius: scale(6),
    alignItems: 'flex-start',
    marginLeft: scale(10),
  },
  arrowTop: {
    borderWidth: scale(7),
    borderColor: '#00000000',
    borderBottomColor: '#E3E3E3',
    position: 'absolute',
    top: scale(-12),
    left: scale(10),
  },
});

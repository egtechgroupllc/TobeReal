import React from 'react';
import {StyleSheet, View} from 'react-native';
import {scale} from '../../../../../../assets/constants';
import {CustomInput} from '../../../../../../components';
import CustomText from '../../../../../../components/CustomText';

export default function SetNamePolicy() {
  return (
    <View style={styles.boxCheckMeal}>
      <CustomInput placeholder="Name" style={styles.textInput} maxLength={2} />
      <View style={styles.note}>
        <View style={styles.arrowTop} />
        <CustomText>
          Điều này sẽ không ảnh hưởng đến bất kỳ giới hạn thời gian lưu trú nào
          đã cài trong lịch của Quý vị.
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

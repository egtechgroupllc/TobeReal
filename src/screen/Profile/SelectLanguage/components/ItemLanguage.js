import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {scale} from '../../../../assets/constants';
import CheckBox from '../../../../components/CheckBox';
import CustomImage from '../../../../components/CustomImage';

export default function ItemLanguage({item, onPress, check}) {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={1} onPress={onPress}>
      <CustomImage source={item.flag} style={styles.image} />
      <CheckBox
        text={item.name}
        textLeft
        isChecked={check}
        onPress={onPress}
        isRadio
        style={{
          justifyContent: 'space-between',
          height: '100%',
        }}
        styleWrapper={{
          flex: 1,
        }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: scale(4),
    height: scale(38),
    width: '100%',
    marginTop: scale(15),
    borderWidth: scale(1),
    borderColor: '#C2C2C2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    columnGap: scale(16),
  },
  image: {
    height: scale(20),
    width: scale(28),
  },
});

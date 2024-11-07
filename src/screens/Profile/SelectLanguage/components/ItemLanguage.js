import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '~/assets/constants';
import {CImage} from '~/components';
import CheckBox from '~/components/CheckBox';
import {scale} from '~/utils/scale';

export default function ItemLanguage({item, onPress, check}) {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={1} onPress={onPress}>
      <CImage source={item?.flag} style={styles.image} />
      <CheckBox
        text={item?.name}
        textStyle={{color: COLORS.White}}
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
    backgroundColor: COLORS.input,
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

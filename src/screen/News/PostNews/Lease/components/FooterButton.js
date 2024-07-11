import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CustomButton} from '../../../../../components';
import {SHADOW, scale} from '../../../../../assets/constants';
import {useLanguage} from '../../../../../hooks/useLanguage';
export default function FooterButton({onPressCancel, onPressConfirm}) {
  const {t} = useLanguage();

  return (
    <View style={styles.wrapper}>
      <CustomButton
        styleWrapper={{
          flex: 1,
        }}
        onPress={onPressCancel}
        outline
        text={t('cancel')}
      />
      <CustomButton
        styleWrapper={{
          flex: 1,
        }}
        onPress={onPressConfirm}
        text={t('confirm')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    paddingVertical: scale(30),
    paddingHorizontal: scale(20),
    ...SHADOW,
    shadowOffset: {
      width: 0,
      height: -1,
    },
    flexDirection: 'row',
    columnGap: scale(20),
  },
});

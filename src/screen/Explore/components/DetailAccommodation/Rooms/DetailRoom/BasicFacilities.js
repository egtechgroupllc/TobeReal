import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ItemUtil from '../components/ItemUtil';
import {
  IconConditioner,
  IconFridge,
  IconTV,
  IconWifi,
} from '../../../../../../assets/icon/Icon';
import {scale} from '../../../../../../assets/constants';

export default function BasicFacilities({data}) {
  return (
    <>
      <ItemUtil
        Icon={IconWifi}
        value={'Free wifi'}
        styleIcon={styles.iconFac}
        valueBold
        vertical
      />
      <ItemUtil
        Icon={IconConditioner}
        value={'Air conditioner '}
        styleIcon={styles.iconFac}
        valueBold
        vertical
      />
      <ItemUtil
        Icon={IconTV}
        value={'TV'}
        styleIcon={styles.iconFac}
        valueBold
        vertical
      />
      <ItemUtil
        Icon={IconFridge}
        value={'Fridge'}
        styleIcon={styles.iconFac}
        valueBold
        vertical
      />
    </>
  );
}

const styles = StyleSheet.create({
  iconFac: {
    width: scale(20),
    height: scale(20),
    color: '#000',
  },
});

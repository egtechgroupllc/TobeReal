import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useLanguage} from '~/hooks/useLanguage';
import ButtonTabValidate from '~/components/ChoosePhoto/ButtonTabValidate';
import Collapsible from 'react-native-collapsible';
import Input from '~/components/Input';
import {requireField} from '~/utils/validate';
import SelectCountry from '~/components/Country/SelectCountry';
import {scale} from '~/utils/scale';
import {COLORS} from '~/assets/constants';

export default function Address({control}) {
  const {t} = useLanguage();
  const [isView, setView] = useState(false);
  const viewGeneral = () => {
    setView(prev => !prev);
  };
  return (
    <View>
      <ButtonTabValidate title={t('Address')} onPress={viewGeneral} />
      <Collapsible collapsed={!isView} style={styles.box}>
        <SelectCountry />
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
    alignItems: 'center',
    borderColor: COLORS.input,
    borderWidth: scale(1),
    width: '100%',
    paddingBottom: scale(20),
    rowGap: scale(16),
  },
  dot: {
    backgroundColor: COLORS.White,
    borderRadius: scale(99),
    height: scale(10),
    aspectRatio: 1,
  },
});

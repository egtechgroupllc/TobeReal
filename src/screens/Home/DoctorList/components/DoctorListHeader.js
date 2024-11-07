import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {scale} from '~/utils/scale';
import {Button, CText} from '~/components';
import {IconArrowLeft} from '@tabler/icons-react-native';
import {COLORS, SIZES} from '~/assets/constants';
import {useNavigation} from '@react-navigation/native';
import Input from '~/components/Input';
import {IconSearch} from '~/assets/icon/Icon';
import {useLanguage} from '~/hooks/useLanguage';

export default function DoctorListHeader({onChangeText}) {
  const {navigate, goBack} = useNavigation();
  const {t} = useLanguage();

  return (
    <View style={{rowGap: scale(8)}}>
      <Input
        styleContent={{...styles.input, alignSelf: 'center'}}
        sizeInput={'small'}
        placeholder={t('search')}
        placeholderTextColor={COLORS.grey}
        onChangeText={onChangeText}
        icon={IconSearch}
        propsIcon={{fill: COLORS.White}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    color: COLORS.greyBold,
    backgroundColor: COLORS.input,
    borderWidth: 0,
  },
});

import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {scale} from '~/utils/scale';
import {Button, CText} from '~/components';
import {IconArrowLeft} from '@tabler/icons-react-native';
import {COLORS, SIZES} from '~/assets/constants';
import {useNavigation} from '@react-navigation/native';
import Input from '~/components/Input';
import {IconFamily, IconSearch} from '~/assets/icon/Icon';
import {useLanguage} from '~/hooks/useLanguage';

export default function FamilyHeader({onPressFamily}) {
  const {navigate, goBack} = useNavigation();
  const {t} = useLanguage();

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Button.Icon
        Icon={IconArrowLeft}
        color={COLORS.White}
        onPress={() => goBack()}
      />
      <CText
        style={{color: COLORS.White, fontSize: SIZES.medium}}
        textType="semiBold">
        {t('relatives')}
      </CText>
      <Button.Icon
        Icon={IconFamily}
        fill={COLORS.White}
        onPress={onPressFamily}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    color: COLORS.greyBold,
  },
});

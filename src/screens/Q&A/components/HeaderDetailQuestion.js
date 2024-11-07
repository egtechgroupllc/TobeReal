import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {scale} from '~/utils/scale';
import {Button, CText} from '~/components';
import {IconArrowLeft} from '@tabler/icons-react-native';
import {COLORS, SIZES, WIDTH} from '~/assets/constants';
import {useNavigation} from '@react-navigation/native';
import Input from '~/components/Input';
import {IconSearch} from '~/assets/icon/Icon';
import {useLanguage} from '~/hooks/useLanguage';
import ImageDetail from '~/components/ChoosePhoto/ImageDetail';

export default function HeaderDetailQuestion({data}) {
  const {navigate, goBack} = useNavigation();
  const {t} = useLanguage();

  return (
    <View style={{rowGap: scale(8), flex: 1}}>
      <View
        style={{
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
          style={{
            color: COLORS.White,
            fontSize: SIZES.medium,
          }}
          textType="semiBold">
          {t('detail_question')}
        </CText>
        <View></View>
      </View>
      {/* <ImageDetail arrImg={data?.images} styleWrapper={{height: scale(200)}} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    color: COLORS.greyBold,
  },
});

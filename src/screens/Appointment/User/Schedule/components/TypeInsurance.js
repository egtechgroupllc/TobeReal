import {StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import {Button, CText} from '~/components';
import {COLORS, SIZES} from '~/assets/constants';
import BottomSheet from '~/components/BottomSheet';
import {useLanguage} from '~/hooks/useLanguage';
import {scale} from '~/utils/scale';

export default function TypeInsurance() {
  const bottomSheetRef = useRef();
  const {t} = useLanguage();
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <CText
        style={{fontSize: SIZES.xMedium, color: COLORS.White}}
        textType="semiBold">
        {t('type_of_insurance')}
      </CText>
      <Button.Text
        title={t('detail')}
        color={COLORS.blue}
        onPress={() => bottomSheetRef.current.open()}
      />
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={['50%', '80%']}
        titleIndicator={t('type_of_insurance')}
        // onDismiss={!apply && reset}
        styleContent={{
          paddingHorizontal: scale(16),
          rowGap: scale(16),
        }}></BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({});

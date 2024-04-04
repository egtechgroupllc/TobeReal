import {StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import CustomText from '../../../../components/CustomText';
import {COLORS, SIZES, WIDTH, scale} from '../../../../assets/constants';
import {TabSelect} from '../../../../components';
import WrapperContent from '../WrapperContent';
import {useLanguage} from '../../../../hooks/useLanguage';
import BottomSheet from '../../../../components/BottomSheet';

const listTab = ['Description'];
export default function Introduction({data}) {
  const {t} = useLanguage();
  const bottomSheetRef = useRef();

  return (
    <WrapperContent
      isSeeAll
      onPressSeeAll={() => bottomSheetRef.current.open()}
      heading={t('introduction')}
      styleContent={{
        paddingHorizontal: scale(16),
        height: scale(100),
      }}>
      <CustomText
        numberOfLines={5}
        style={{
          lineHeight: 18,
        }}>
        {data?.description}
      </CustomText>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['50%', '80%']}
        titleIndicator={t('description_content')}
        styleContent={{
          paddingHorizontal: scale(16),
        }}>
        <CustomText
          textType="regular"
          style={{
            fontSize: SIZES.xMedium,
          }}>
          {data?.description}
        </CustomText>
      </BottomSheet>
    </WrapperContent>
  );
}

const styles = StyleSheet.create({
  introduction: {
    // backgroundColor: '#ccc',
    width: WIDTH.widthContain,
    rowGap: scale(10),
  },
  textIntroduction: {
    fontSize: SIZES.medium,
  },
  textSubIntroduction: {
    fontSize: SIZES.xMedium,
  },
});

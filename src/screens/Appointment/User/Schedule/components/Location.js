import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '~/assets/constants';
import {Button, CText} from '~/components';
import {scale} from '~/utils/scale';
import PriceDetail from './PriceDetail';
import TypeInsurance from './TypeInsurance';
import {IconBuildingHospital} from '@tabler/icons-react-native';
import {useLanguage} from '~/hooks/useLanguage';

export default function Location({data}) {
  const {t} = useLanguage();
  return (
    <View style={{rowGap: scale(15)}}>
      <View style={{rowGap: scale(3)}}>
        <CText
          style={{fontSize: SIZES.large, color: COLORS.White}}
          textType="bold">
          {t('examination_address')}
        </CText>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: scale(5),
          }}>
          <IconBuildingHospital
            width={scale(15)}
            height={scale(15)}
            fill={'transparent'}
            color={COLORS.White}
          />
          <CText
            style={{color: COLORS.White, fontSize: SIZES.xMedium}}
            numberOfLines={2}
            textType="semiBold">
            {data?.medical_facility_name}
          </CText>
        </View>
      </View>
      <PriceDetail data={data} />
      <TypeInsurance />
    </View>
  );
}

const styles = StyleSheet.create({});

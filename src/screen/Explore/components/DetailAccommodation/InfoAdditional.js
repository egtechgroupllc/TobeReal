import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import WrapperContent from '../WrapperContent';
import {SIZES, scale} from '../../../../assets/constants';
import {TabSelect} from '../../../../components';
import CustomText from '../../../../components/CustomText';
import {formatPrice} from '../../../../utils/format';
import { useLanguage } from '../../../../hooks/useLanguage';
const listTab = ['Building', 'Deposit'];

export default function InfoAdditional() {
  const {t}= useLanguage()
  const [tabSelect, setTabSelect] = useState(listTab[0]);

  return (
    <WrapperContent
      heading={t('additional_information')}
      styleContent={{
        paddingHorizontal: scale(16),
      }}>
      <TabSelect
        data={listTab}
        onChange={value => {
          setTabSelect(value);
        }}
        styleContent={{
          padding: scale(12),
          minHeight: scale(160),
        }}
        renderView={() =>
          tabSelect === listTab[0] ? (
            <View
              style={{
                rowGap: scale(20),
              }}>
              <CustomText style={{fontSize: SIZES.xMedium}}>
              {t('property_live_date')} {'\n'}
                <CustomText textType="bold" style={{fontSize: SIZES.xMedium}}>
                  14 Dec 2023
                </CustomText>
              </CustomText>
              <CustomText style={{fontSize: SIZES.xMedium}}>
              {t('check_in')}{'\n'}
                <CustomText textType="bold" style={{fontSize: SIZES.xMedium}}>
                {t('From')} 12:00
                </CustomText>
              </CustomText>
              <CustomText style={{fontSize: SIZES.xMedium}}>
              {t('check_out')} {'\n'}
                <CustomText textType="bold" style={{fontSize: SIZES.xMedium}}>
                {t('To')} 13:00
                </CustomText>
              </CustomText>
            </View>
          ) : (
            <CustomText style={{fontSize: SIZES.xMedium}}>
              {t('monthly_deposit')} {'\n'}
              <CustomText textType="bold" style={{fontSize: SIZES.xMedium}}>
                {formatPrice(2000000)}
              </CustomText>
            </CustomText>
          )
        }
      />
    </WrapperContent>
  );
}

const styles = StyleSheet.create({});

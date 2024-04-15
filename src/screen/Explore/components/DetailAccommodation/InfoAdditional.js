import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import WrapperContent from '../WrapperContent';
import {COLORS, SIZES, scale} from '../../../../assets/constants';
import {TabSelect} from '../../../../components';
import CustomText from '../../../../components/CustomText';
import {formatDateTime, formatPrice} from '../../../../utils/format';
import {useLanguage} from '../../../../hooks/useLanguage';
const listTab = ['Building', 'Deposit'];

export default function InfoAdditional({data}) {
  const {t} = useLanguage();
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
              <CustomText style={styles.text}>
                {t('property_live_date')} {'\n'}
                <CustomText textType="bold" style={styles.text}>
                  {formatDateTime(data?.createdAt) || '14 Dec 2023'}
                </CustomText>
              </CustomText>
              <CustomText style={styles.text}>
                {t('check_in')}
                {'\n'}
                <CustomText textType="bold" style={styles.text}>
                  {data?.check_in_time_start || '6:00'} -{' '}
                  {data?.check_in_time_end || '12:00'}
                </CustomText>
              </CustomText>
              <CustomText style={styles.text}>
                {t('check_out')} {'\n'}
                <CustomText textType="bold" style={styles.text}>
                  {data?.check_out_time_start || '13:00'} -{' '}
                  {data?.check_out_time_end || '17:00'}
                </CustomText>
              </CustomText>
            </View>
          ) : (
            <CustomText style={styles.text}>
              {t('monthly_deposit')} {'\n'}
              <CustomText textType="bold" style={styles.text}>
                {formatPrice(2000000)}
              </CustomText>
            </CustomText>
          )
        }
      />
    </WrapperContent>
  );
}

const styles = StyleSheet.create({
  text: {
    color: COLORS.white,
    fontSize: SIZES.xMedium,
  },
});

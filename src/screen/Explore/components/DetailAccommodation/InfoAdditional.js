import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import WrapperContent from '../WrapperContent';
import {SIZES, scale} from '../../../../assets/constants';
import {TabSelect} from '../../../../components';
import CustomText from '../../../../components/CustomText';
import {formatPrice} from '../../../../utils/format';
const listTab = ['Building', 'Deposit'];

export default function InfoAdditional() {
  const [tabSelect, setTabSelect] = useState(listTab[0]);

  return (
    <WrapperContent
      heading="Additional information"
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
                Property live date {'\n'}
                <CustomText textType="bold" style={{fontSize: SIZES.xMedium}}>
                  14 Dec 2023
                </CustomText>
              </CustomText>
              <CustomText style={{fontSize: SIZES.xMedium}}>
                Check-in{'\n'}
                <CustomText textType="bold" style={{fontSize: SIZES.xMedium}}>
                  From 12:00
                </CustomText>
              </CustomText>
              <CustomText style={{fontSize: SIZES.xMedium}}>
                Check-out {'\n'}
                <CustomText textType="bold" style={{fontSize: SIZES.xMedium}}>
                  To 13:00
                </CustomText>
              </CustomText>
            </View>
          ) : (
            <CustomText style={{fontSize: SIZES.xMedium}}>
              Monthly Deposit {'\n'}
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

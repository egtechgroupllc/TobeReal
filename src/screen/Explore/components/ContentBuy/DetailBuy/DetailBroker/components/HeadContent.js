import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  Avatar,
  IconBrokerCertificate,
  IconViewablePassword,
} from '../../../../../../../assets/icon/Icon';
import CustomText from '../../../../../../../components/CustomText';
import {COLORS, SIZES, scale} from '../../../../../../../assets/constants';
import {useLanguage} from '../../../../../../../hooks/useLanguage';

export default function HeadContent({data}) {
  const {t} = useLanguage();

  return (
    <View
      style={{
        marginTop: scale(50),
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: scale(50),
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: scale(30),
        }}>
        <View style={{rowGap: scale(10)}}>
          <Avatar width={scale(100)} height={scale(100)} />

          <CustomText
            textType="regular"
            style={{
              color: '#00A3FF',
              fontSize: SIZES.xSmall,
            }}>
            {t('professional_broker')}
          </CustomText>
        </View>

        <View style={{rowGap: scale(20)}}>
          <CustomText
            textType="bold"
            style={{
              color: COLORS.white,
              fontSize: SIZES.large,
              minWidth: scale(35),
            }}>
            {data?.contact_name}
          </CustomText>
          <View
            style={{
              flexDirection: 'row',
              columnGap: scale(10),
              alignItems: 'center',
            }}>
            <IconViewablePassword />
            <CustomText
              textType="regular"
              style={{
                color: COLORS.white,

                fontSize: SIZES.xSmall,
                minWidth: scale(35),
              }}>
              6.100+ {t('news_views')}
            </CustomText>
          </View>
        </View>
      </View>

      <View style={{position: 'absolute', top: scale(80), left: scale(115)}}>
        <IconBrokerCertificate />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

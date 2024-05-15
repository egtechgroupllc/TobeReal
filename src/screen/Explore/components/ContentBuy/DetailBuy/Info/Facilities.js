import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import InfoItem from './InfoItem';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import {COLORS, SIZES, scale} from '../../../../../../assets/constants';
import CustomText from '../../../../../../components/CustomText';
import {formatPrice} from '../../../../../../utils/format';
import {
  IconAcreage,
  IconBed,
  IconBookings,
  IconDirection,
  IconFurniture,
  IconRoom,
} from '../../../../../../assets/icon/Icon';
import {useCountry} from '../../../../../../hooks/useCountry';

export default function Facilities({data}) {
  const {t} = useLanguage();
  const {currency} = useCountry();
  return (
    <View style={styles.boxTourTime}>
      <View
        style={{
          backgroundColor: '#F5F5F5',
          height: scale(6),
        }}
      />

      <View
        style={{
          paddingHorizontal: scale(20),
        }}>
        <View style={styles.listInfo}>
          <CustomText textType="semiBold" style={{color: COLORS.black}}>
            {t('Price')}:{' '}
            <CustomText
              textType="bold"
              style={{...styles.name, color: COLORS.primary}}>
              {formatPrice(data?.price * currency?.exchange_rate, {
                currency: currency?.currency_code,
              })}
            </CustomText>
          </CustomText>

          <CustomText textType="regular" style={styles.text}>
            {t('acreage')}:{' '}
            <CustomText textType="semiBold" style={styles.name}>
              {formatPrice(data?.size_width * data?.size_length, {
                unit: 'm²',
              })}
            </CustomText>
          </CustomText>
        </View>

        <View style={styles.line} />
        <View
          style={{
            // justifyContent: 'space-between',
            marginTop: scale(10),
            rowGap: scale(7),
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          <InfoItem
            Icon={IconRoom}
            name={t('Bedroom')}
            value={3}
            styleIcon={{
              height: scale(16),
            }}
          />
          <InfoItem
            Icon={IconFurniture}
            name={t('Interior')}
            value={data?.furnish}
          />

          <InfoItem Icon={IconBed} name={t('Toilet')} value={3} />

          <InfoItem
            Icon={IconDirection}
            name={t('House direction')}
            value={data?.direction_main.name}
            styleIcon={{
              height: scale(16),
            }}
          />

          <InfoItem
            Icon={IconAcreage}
            value={`${data?.size_width}m x ${data?.size_length}m`}
            styleIcon={{
              width: scale(20),
              height: scale(20),
            }}
          />

          <InfoItem
            Icon={IconBookings}
            name={t('Juridical')}
            value={data?.legal_documents}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boxTourTime: {
    backgroundColor: COLORS.white,
    minHeight: scale(50),
    paddingVertical: scale(10),
  },
  name: {fontSize: SIZES.medium},
  listInfo: {
    flexDirection: 'row',
    paddingBottom: scale(6),
    paddingTop: scale(12),
    justifyContent: 'space-between',
  },
  line: {
    width: '100%',
    height: scale(1),
    backgroundColor: COLORS.grey,
  },
});

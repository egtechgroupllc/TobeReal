import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SIZES, scale} from '../../../../../assets/constants';
import {
  IconClock,
  IconDown,
  IconVoucher,
} from '../../../../../assets/icon/Icon';
import CustomImage from '../../../../../components/CustomImage';
import CustomText from '../../../../../components/CustomText';
import {formatDate} from '../../../../../utils/format';
import ItemUtil from '../../../../Explore/components/DetailAccommodation/Rooms/components/ItemUtil';
import PaymentMethods from './PaymentMethods';
import {useLanguage} from '../../../../../hooks/useLanguage';
import {useNavigation} from '@react-navigation/native';
import ApplyVoucher from './Voucher/components/ApplyVoucher';

export default function TopStep2({
  data,
  onChange,
  typePayment,
  onCheckVoucher,
  dataVoucher,
}) {
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  return (
    <View style={styles.top}>
      <View style={styles.topContent}>
        <View style={styles.heading}>
          <CustomImage
            source={data?.images?.[0]?.url}
            style={styles.imgHeading}
          />
          <View
            style={{
              alignItems: 'center',
              rowGap: scale(4),
            }}>
            <CustomText
              color={COLORS.black}
              textType="semiBold"
              style={{
                textAlign: 'center',
              }}>
              {data?.nameAccom}
            </CustomText>
            <CustomText color={COLORS.black}>
              {formatDate(data?.date?.selectedStartDate, {
                dateStyle: 'dd-MM-yyyy',
              })}
              , {data?.date?.numNight} {t('night')}{' '}
            </CustomText>
          </View>
          <IconDown fill={COLORS.black} />
        </View>

        <ItemUtil
          Icon={IconClock}
          styleIcon={{
            width: scale(16),
            height: scale(16),
          }}
          value={`${t('room')} id: ${data?.id}`}
          color={COLORS.black}
          valueBold
          styleWrapper={styles.roomCode}
        />

        <PaymentMethods onChange={onChange} />
      </View>
      {typePayment === 'VOUCHER' && (
        <ApplyVoucher
          data={data}
          onCheckVoucher={onCheckVoucher}
          dataVoucher={dataVoucher}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    backgroundColor: COLORS.primary,
    padding: scale(10),
    height: scale(100),
    borderBottomLeftRadius: scale(12),
    borderBottomRightRadius: scale(12),
  },
  topContent: {
    borderRadius: scale(6),
    backgroundColor: COLORS.white,
    overflow: 'hidden',
    zIndex: 99,
    alignItems: 'center',
  },

  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: scale(10),
    width: '100%',
    backgroundColor: COLORS.subPrimary,
    padding: scale(7),
    paddingHorizontal: scale(12),
  },
  imgHeading: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(6),
  },

  roomCode: {
    padding: scale(10),
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#f5f5f590',
  },
});

import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

// import ItemUtil from '../../../../Explore/components/DetailAccommodation/Rooms/components/ItemUtil';
import PaymentMethods from './PaymentMethods';
import {useNavigation} from '@react-navigation/native';
import ApplyVoucher from './Voucher/components/ApplyVoucher';
import {CImage, CText} from '~/components';
import {useLanguage} from '~/hooks/useLanguage';
import {COLORS} from '~/assets/constants';
import {scale} from '~/utils/scale';
import {IconClock, IconDown} from '~/assets/icon/Icon';
import {formatDate} from '~/utils/format';

export default function TopStep2({
  data,
  onChange,
  typePayment,
  onCheckVoucher,
  dataVoucher,
  onChangeBalance,
  isTour,
  checkDiffrentCountry,
  countryRate,
}) {
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  return (
    <View style={styles.top}>
      <View style={styles.heading}>
        {/* <CImage source={data?.images?.[0]?.url} style={styles.imgHeading} /> */}
        <CImage source={{uri: data?.documents}} style={styles.imgHeading} />
        <View
          style={{
            alignItems: 'center',
            rowGap: scale(4),
            flex: 1,
          }}>
          <CText color={COLORS.White} textType="semiBold">
            {data?.nameAccom || data?.name}
          </CText>
        </View>
        <IconDown fill={COLORS.White} />
      </View>
      <View style={styles.topContent}>
        {/* <ItemUtil
          Icon={IconClock}
          styleIcon={{
            width: scale(16),
            height: scale(16),
          }}
          value={
            !isTour
              ? `${t('room')} id: ${data?.id}`
              : `${t('tour_code')}: ${data?.id}`
          }
          color={COLORS.White}
          valueBold
          styleWrapper={styles.roomCode}
        /> */}

        <PaymentMethods
          onChange={onChange}
          onChangeBalance={onChangeBalance}
          isTour={isTour}
        />
      </View>
      {typePayment === 'VOUCHER' && (
        <ApplyVoucher
          checkDiffrentCountry={checkDiffrentCountry}
          countryRate={countryRate}
          isTour={isTour}
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
    height: scale(100),
    borderBottomLeftRadius: scale(12),
    borderBottomRightRadius: scale(12),
    borderColor: COLORS.White,
  },
  topContent: {
    marginTop: scale(10),
    borderRadius: scale(6),
    alignItems: 'center',
    marginHorizontal: scale(15),
  },

  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: scale(10),
    width: '100%',
    padding: scale(7),
    paddingHorizontal: scale(12),
    borderBottomWidth: scale(1),
    borderColor: COLORS.overlay,
    paddingBottom: scale(10),
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

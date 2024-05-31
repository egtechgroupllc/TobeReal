import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, scale} from '../../../../../assets/constants';
import {IconClock, IconDown} from '../../../../../assets/icon/Icon';
import CustomImage from '../../../../../components/CustomImage';
import CustomText from '../../../../../components/CustomText';
import {formatDate} from '../../../../../utils/format';
import ItemUtil from '../../../../Explore/components/DetailAccommodation/Rooms/components/ItemUtil';
import PaymentMethods from './PaymentMethods';

export default function TopStep2({data, onChange}) {
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
              color={COLORS.white}
              textType="semiBold"
              style={{
                textAlign: 'center',
              }}>
              {data?.nameAccom}
            </CustomText>
            <CustomText color={COLORS.white}>
              {formatDate(data?.date?.selectedStartDate, {
                dateStyle: 'dd-MM-yyyy',
              })}
              , {data?.date?.numNight} night{' '}
            </CustomText>
          </View>
          <IconDown fill={COLORS.white} />
        </View>

        <ItemUtil
          Icon={IconClock}
          styleIcon={{
            width: scale(16),
            height: scale(16),
          }}
          value={`Room code: ${data?.id}`}
          color={COLORS.blue}
          valueBold
          styleWrapper={styles.roomCode}
        />

        <PaymentMethods data={data} onChange={onChange} />
      </View>
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
    backgroundColor: '#255c9f',
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
    backgroundColor: '#edf8ff',
  },
});

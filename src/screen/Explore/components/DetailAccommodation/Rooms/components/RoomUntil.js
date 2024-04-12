import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  IconBookings,
  IconNews,
  IconPeople,
  IconRoom,
  IconWifi,
} from '../../../../../../assets/icon/Icon';
import {COLORS, SIZES, scale} from '../../../../../../assets/constants';
import CustomText from '../../../../../../components/CustomText';
import {formatPrice} from '../../../../../../utils/format';
import ItemUtil from './ItemUtil';

export default function RoomUntil({data, price}) {
  return (
    <>
      <ItemUtil
        Icon={IconBookings}
        value={`Miễn phí hủy phòng trước 10 Apr 13:00`}
        color={'#00875a'}
        backgroundColor={'#e8fef5'}
        styleWrapper={{
          borderRadius: 99,
        }}
      />
      <View>
        <ItemUtil Icon={IconPeople} value={`${2} khách`} />
        <ItemUtil Icon={IconRoom} value={data.room_bed_type.name} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <ItemUtil Icon={IconPeople} value={`Không gồm bữa sáng`} />
          <ItemUtil Icon={IconRoom} value={'Không hoàn tiền'} />
          <ItemUtil
            Icon={IconWifi}
            value={'Không hoàn tiền'}
            color={'#00875a'}
          />
        </View>

        <View
          style={{
            rowGap: scale(7),
            alignItems: 'flex-end',
          }}>
          <View>
            <View style={styles.boxDiscount}>
              <CustomText
                textType="semiBold"
                style={{
                  color: '#FF0000',
                  fontSize: SIZES.xSmall,
                }}>
                {' '}
                -20%
              </CustomText>
            </View>
            <CustomText style={styles.priceDiscount}>
              {formatPrice(23)}
            </CustomText>
          </View>

          <View>
            <CustomText textType="bold" style={styles.price}>
              {formatPrice(price)}
            </CustomText>
            <CustomText style={styles.night}>/Phòng/đêm</CustomText>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  boxDiscount: {
    position: 'absolute',
    right: 0,
    top: scale(-20),
    minWidth: scale(35),
    backgroundColor: '#FF000020',
    padding: scale(2),
    borderRadius: scale(4),
  },
  priceDiscount: {
    color: COLORS.text,
    textDecorationLine: 'line-through',
    fontSize: SIZES.xSmall,
  },
  price: {
    color: COLORS.primary,
    fontSize: SIZES.xMedium,
    textAlign: 'right',
  },
  night: {
    color: COLORS.text,
    fontSize: SIZES.xSmall,
  },
});

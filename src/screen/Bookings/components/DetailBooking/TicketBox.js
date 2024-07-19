import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES, scale} from '../../../../assets/constants';
import {CustomText} from '../../../../components';
import {useLanguage} from '../../../../hooks/useLanguage';

export default function TicketBox({data}) {
  const {t} = useLanguage();

  return (
    <View
      style={{
        minHeight: scale(100),
        borderRadius: scale(10),
        borderWidth: scale(1),
        borderColor: COLORS.grey,
        padding: scale(10),
      }}>
      <CustomText
        textType="bold"
        size={SIZES.small}
        style={{marginBottom: scale(5)}}>
        {data?.tour_ticket?.name}:
      </CustomText>

      {data?.tour_ticket_item_bookings?.map((item, index) => {
        return (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <CustomText
              textType="medium"
              size={SIZES.small}
              style={{marginBottom: scale(5)}}>
              <View
                style={{
                  height: scale(5),
                  width: scale(5),
                  backgroundColor: COLORS.black,
                  borderRadius: scale(99),
                }}
              />
              {'  '}
              {item?.quantity} (x) {item?.name}
            </CustomText>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({});

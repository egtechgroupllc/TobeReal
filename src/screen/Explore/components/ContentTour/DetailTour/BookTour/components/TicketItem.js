import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Counter, CustomText} from '../../../../../../../components';
import {COLORS, SIZES, scale} from '../../../../../../../assets/constants';
import {useLanguage} from '../../../../../../../hooks/useLanguage';
import {formatPrice} from '../../../../../../../utils/format';
import {useCountry} from '../../../../../../../hooks/useCountry';

export default function TicketItem({data, onChange, index, dataPriceTicket}) {
  const {t} = useLanguage();
  const {currency} = useCountry();
  return (
    <View>
      <CustomText textType="semiBold" numberOfLines={3}>
        {data?.name}
      </CustomText>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: scale(5),
        }}>
        <View>
          <CustomText
            textType="semiBold"
            style={{
              color: COLORS.primary,
            }}>
            {formatPrice(dataPriceTicket * data?.price_percent, {
              currency: currency?.currency_code,
            })}
          </CustomText>
          <CustomText
            textType="medium"
            style={{
              color: COLORS.grey,
            }}>
            {data?.description}
          </CustomText>
        </View>
        <Counter
          editable={false}
          max={data?.quantity_real}
          styleWrapper={{width: '45%'}}
          // value={numRooms > numAdult ? numAdult : numRooms}
          onChange={onChange}
          min={index ? 0 : 1}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

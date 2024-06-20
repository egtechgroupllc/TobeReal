import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import CustomText from '../../../../../../components/CustomText';
import {COLORS, SIZES, scale} from '../../../../../../assets/constants';
import CustomImage from '../../../../../../components/CustomImage';
import getDistance from 'geolib/es/getDistance';
import {IconMapView} from '../../../../../../assets/icon/Icon';

export default function Nearby({data, coordinate}) {
  const calculatorMeters = position => {
    const metters = getDistance(coordinate, position);

    return metters < 999
      ? `${metters} m`
      : `${(metters / 1000).toFixed(2).replace('.', ',')} km`;
  };
  console.log(data);
  return (
    <View>
      {data.length > 0 && (
        <View
          style={{
            marginTop: scale(10),
            rowGap: scale(10),
          }}>
          <CustomText
            textType="semiBold"
            style={{
              fontSize: SIZES.xMedium,
            }}>
            Địa điểm lân cận
          </CustomText>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              rowGap: scale(10),
              justifyContent: 'space-between',
            }}>
            {data.slice(0, 10).map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    columnGap: scale(10),
                    width: '49%',
                  }}>
                  <CustomImage
                    source={item?.icon}
                    style={{
                      width: scale(20),
                      height: scale(20),
                    }}
                  />
                  <View
                    style={{
                      rowGap: scale(2),
                      flex: 1,
                    }}>
                    <CustomText textType="semiBold" numberOfLines={1}>
                      {item?.name}
                    </CustomText>
                    <CustomText style={{color: '#687176'}} numberOfLines={1}>
                      {calculatorMeters({
                        latitude: item.geometry.location.lat,
                        longitude: item.geometry.location.lng,
                      })}
                    </CustomText>
                  </View>
                </View>
              );
            })}
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              flexDirection: 'row',
              columnGap: scale(6),
              alignSelf: 'center',
              padding: scale(6),
            }}>
            <IconMapView fill={COLORS.primary} />
            <CustomText
              textType="semiBold"
              numberOfLines={1}
              style={{
                color: COLORS.primary,
              }}>
              Xem thêm trên map
            </CustomText>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});

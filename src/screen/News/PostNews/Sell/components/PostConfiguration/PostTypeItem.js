import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {COLORS, SIZES, images, scale} from '../../../../../../assets/constants';
import {IconViewablePassword} from '../../../../../../assets/icon/Icon';
import {CustomButton} from '../../../../../../components';
import CustomImage from '../../../../../../components/CustomImage';
import CustomText from '../../../../../../components/CustomText';
import {formatPrice} from '../../../../../../utils/format';

export default function PostTypeItem({data, list, onPress, isSelect, seeMore}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        ...styles.box,
        borderColor: isSelect ? COLORS.primary : '#ddd',
        backgroundColor: isSelect ? '#fefaec' : '#fff',
      }}>
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          rowGap: scale(10),
        }}>
        <CustomText
          textType="semiBold"
          style={{
            color:
              data.name === list[1].name
                ? '#009ba1'
                : data.name === list[2].name
                ? COLORS.primary
                : data.name === list[3].name
                ? COLORS.error
                : '#000',
            fontSize: SIZES.xMedium,
            textTransform: 'uppercase',
          }}>
          {data?.name}
        </CustomText>
        <CustomText
          style={{
            color: COLORS.text,
          }}>
          From{' '}
          <CustomText textType="semiBold">
            {formatPrice(data?.price)}
          </CustomText>
          /ngày
        </CustomText>

        {!!data?.numView && (
          <View
            style={{
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: scale(8),
              }}>
              <IconViewablePassword />
              <CustomText
                textType="semiBold"
                style={{
                  color:
                    data.name === list[1].name
                      ? '#009ba1'
                      : data.name === list[2].name
                      ? COLORS.primary
                      : data.name === list[3].name
                      ? COLORS.error
                      : '#000',
                }}>
                X{data?.numView}
              </CustomText>
            </View>
            <CustomText
              textType="semiBold"
              style={{
                fontSize: SIZES.xSmall,
              }}>
              Lượt xem tin
            </CustomText>
          </View>
        )}
      </View>

      <Collapsible collapsed={seeMore}>
        <View
          style={{
            alignItems: 'center',
            marginTop: 'auto',
            rowGap: scale(4),
            paddingVertical: scale(10),
          }}>
          <CustomImage
            source={
              data.name === list[1].name
                ? images.ratingPostSilver
                : data.name === list[2].name
                ? images.ratingPostGold
                : data.name === list[3].name
                ? images.ratingPostDiamond
                : images.ratingPostNormal
            }
            resizeMode="contain"
            style={{
              width: scale(30),
              height: scale(20),
            }}
          />
          <CustomText
            style={{
              textAlign: 'center',
              color: COLORS.text,
              fontSize: SIZES.xSmall,
            }}>
            {data.searchRating}
          </CustomText>
        </View>
      </Collapsible>

      <CustomButton
        onPress={onPress}
        buttonType="normal"
        text={isSelect ? 'Đã chọn' : 'Chọn'}
        outline={isSelect}
        styleWrapper={{
          marginTop: 'auto',
        }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    width: scale(400 / 2.7),
    minHeight: scale(160),
    borderWidth: 1,

    borderRadius: scale(6),
    padding: scale(10),

    alignItems: 'center',
  },
});

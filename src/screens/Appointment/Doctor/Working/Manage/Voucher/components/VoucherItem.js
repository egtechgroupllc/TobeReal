import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';
import {Button, CImage, CText} from '~/components';
import {formatPrice} from '~/utils/format';
import {useLanguage} from '~/hooks/useLanguage';
import {IconClock, IconEditProfile, IconTrash} from '~/assets/icon/Icon';
import {useCountry} from '~/hooks/useCountry';
import ItemLoading from '~/screens/Home/DoctorList/components/DoctorItemLoading';

export default function VoucherItem({
  data,
  onPressUpdate = () => {},
  onPressDelete = () => {},
  isLoading,
}) {
  const {t} = useLanguage();
  const {currency} = useCountry();
  return !isLoading ? (
    <View
      style={{
        backgroundColor: COLORS.input,
        padding: scale(10),
        borderRadius: scale(10),
      }}>
      <View
        style={{
          flexDirection: 'row',
          columnGap: scale(10),
          alignItems: 'center',
        }}>
        <CImage
          source={{uri: data?.image}}
          style={{width: scale(120), height: scale(120)}}
          resizeMode="contain"
        />
        <View
          style={{
            rowGap: scale(3),
            flex: 1,
            padding: scale(10),
          }}>
          <CText
            textType="bold"
            numberOfLines={1}
            style={{
              color: COLORS.White,
              fontSize: SIZES.small,
            }}>
            {formatPrice(data?.price, {
              currency: 'TBH',
              locales: 'vi',
              decimalPlaces: 12,
            })}
          </CText>

          <CText
            textType="bold"
            style={{
              color: COLORS.White,
              fontSize: SIZES.xSmall,
            }}>
            {t('quantity')}: {data?.quantity}
          </CText>
          <CText
            textType="bold"
            style={{
              fontSize: SIZES.xSmall,
              color: data?.quantity_real > 0 ? COLORS.White : COLORS.error,
            }}>
            {t('quantity_real')}: {data?.quantity_real}
          </CText>
          <View
            style={{
              flexDirection: 'row',
              columnGap: scale(5),
              alignItems: 'center',
            }}>
            <IconClock
              fill={COLORS.White}
              width={scale(12)}
              height={scale(12)}
            />
            <CText
              textType="bold"
              style={{
                color: COLORS.White,
                fontSize: SIZES.xSmall,
              }}>
              {data?.date_start} {t('to')} {data?.date_end}
            </CText>
          </View>
          <CText
            style={{color: COLORS.cyan, fontSize: SIZES.xSmall}}
            textType="bold">
            {t('medical_examination_discount')}{' '}
            <CText
              style={{color: COLORS.cyan, fontSize: SIZES.xSmall}}
              textType="bold">
              {formatPrice(data?.price_discount, {
                currency: currency?.currency_code,
              })}
            </CText>
          </CText>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          columnGap: scale(10),
          alignItems: 'center',
          alignSelf: 'flex-end',
        }}>
        <Button
          title={t('update')}
          Icon={IconEditProfile}
          style={{flex: 0.5}}
          sizeButton="small"
          onPress={onPressUpdate}
        />
        <Button.Icon
          Icon={IconTrash}
          sizeButton="small"
          style={{
            borderWidth: 1,
            borderColor: COLORS.White + '60',
            borderRadius: scale(5),
          }}
          onPress={onPressDelete}
        />
      </View>
    </View>
  ) : (
    <ItemLoading />
  );
}

const styles = StyleSheet.create({});

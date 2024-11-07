import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {COLORS, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';
import {Button, CText} from '~/components';
import {
  IconCalendar,
  IconClock,
  IconLocation,
  IconPhone,
} from '~/assets/icon/Icon';
import ScheduleItemLoading from './ScheduleItemLoading';
import {useLanguage} from '~/hooks/useLanguage';

export default function ScheduleItem({data, onPress, isLoading, onValueId}) {
  const {t} = useLanguage();

  useEffect(() => {
    onValueId && onValueId(data?.id);
  }, [data?.id]);
  return (
    <View>
      {!isLoading ? (
        <View
          style={{
            backgroundColor: COLORS.input,
            padding: scale(10),
            borderRadius: scale(10),
            justifyContent: 'center',
            rowGap: scale(10),
          }}>
          {/* <View
            style={{
              backgroundColor: COLORS.text,
              position: 'absolute',
              top: scale(10),
              right: scale(10),
              borderRadius: scale(99),
              height: scale(20),
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CText
              style={{
                fontSize: SIZES.medium,
                color: COLORS.White,
              }}>
              {data?.number}
            </CText>
          </View> */}
          <View
            style={{
              backgroundColor:
                data?.status === 'CANCEL'
                  ? COLORS.OrangeBold
                  : data?.status === 'ACTIVE'
                  ? COLORS.green
                  : COLORS.error,
              padding: scale(5),
              borderRadius: scale(5),
              alignItems: 'center',
              position: 'absolute',
              top: 0,
              right: 0,
            }}>
            <CText style={{color: COLORS.White}}>{data?.status}</CText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              columnGap: scale(10),
            }}>
            <View style={{flex: 1, rowGap: scale(10)}}>
              <View style={{rowGap: scale(5)}}>
                <CText
                  numberOfLines={2}
                  style={{
                    color: COLORS.White,
                    fontSize: SIZES.small,
                    flex: 1,
                  }}
                  textType="bold">
                  {data?.name}
                </CText>
                <CText
                  numberOfLines={2}
                  style={{color: COLORS.blue, fontSize: SIZES.small}}
                  textType="bold">
                  [{data?.workingDoctor?.type}]
                </CText>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  columnGap: scale(20),
                }}>
                <View style={{flexDirection: 'row', columnGap: scale(5)}}>
                  <IconCalendar
                    fill={COLORS.White}
                    width={scale(15)}
                    height={scale(15)}
                  />
                  <CText style={{color: COLORS.White, fontSize: SIZES.small}}>
                    {data?.workingDoctor?.date}
                  </CText>
                </View>
                <View style={{flexDirection: 'row', columnGap: scale(5)}}>
                  <IconClock
                    fill={COLORS.White}
                    width={scale(15)}
                    height={scale(15)}
                  />
                  <CText style={{color: COLORS.White, fontSize: SIZES.small}}>
                    {data?.workingDoctor?.time_start} - {''}
                    {data?.workingDoctor?.time_end}
                  </CText>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: scale(5),
                }}>
                <IconLocation
                  width={scale(15)}
                  height={scale(15)}
                  fill={COLORS.White}
                />
                <CText
                  style={{color: COLORS.White, fontSize: SIZES.small}}
                  numberOfLines={2}>
                  {data?.address}
                </CText>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: scale(5),
                }}>
                <IconPhone
                  width={scale(15)}
                  height={scale(15)}
                  fill={COLORS.White}
                />
                <CText
                  style={{color: COLORS.White, fontSize: SIZES.small}}
                  numberOfLines={2}>
                  {data?.phone}
                </CText>
              </View>
              {data?.note && (
                <>
                  <View
                    style={{
                      width: '100%',
                      height: scale(1),
                      backgroundColor: COLORS.White,
                    }}
                  />
                  <CText
                    style={{color: COLORS.OrangeBold, fontSize: SIZES.small}}
                    textType="bold">
                    {t('Reason cancel')}:{' '}
                    <CText style={{color: COLORS.White, fontSize: SIZES.small}}>
                      {data?.note}
                    </CText>
                  </CText>
                </>
              )}
            </View>
          </View>

          {data?.status !== 'CANCEL' && (
            <View style={{alignSelf: 'flex-end', width: '30%'}}>
              <Button
                title={t('cancel')}
                sizeButton="small"
                onPress={onPress}
                styleText={{fontSize: SIZES.small}}
                backgroundColor={COLORS.OrangeSemi}
                styleContent={{height: scale(25)}}
              />
            </View>
          )}
        </View>
      ) : (
        <ScheduleItemLoading />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});

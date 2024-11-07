import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, images, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';
import {Button, CImage, CText} from '~/components';
import {IconCalendar, IconClock, IconLocation} from '~/assets/icon/Icon';
import AppointItemLoading from '../../components/AppointItemLoading';
import {useLanguage} from '~/hooks/useLanguage';

export default function HistoryScheduleItem({
  onPress,
  data,
  isLoading,
  onPressReview,
  onPressDetail,
}) {
  const {t} = useLanguage();
  return (
    <View>
      {!isLoading ? (
        <TouchableOpacity
          disabled={
            data?.hasCheckIn || data?.status === 'CANCEL' ? true : false
          }
          onPress={onPressDetail}
          style={{
            backgroundColor: COLORS.input,
            paddingTop: scale(20),
            paddingBottom: scale(10),
            borderRadius: scale(10),
            justifyContent: 'center',
            paddingHorizontal: scale(15),
            rowGap: scale(10),
          }}>
          <View
            style={{
              backgroundColor:
                data?.status === 'CANCEL'
                  ? COLORS.OrangeBold
                  : data?.status === 'ACTIVE'
                  ? COLORS.green
                  : COLORS.blue,
              padding: scale(5),
              borderRadius: scale(5),
              alignItems: 'center',
              position: 'absolute',
              top: 0,
            }}>
            <CText style={{color: COLORS.White}}>{data?.status}</CText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              columnGap: scale(10),
              alignItems: 'center',
            }}>
            <View
              style={{
                aspectRatio: 1,
                height: scale(90),
                backgroundColor: COLORS.White,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: scale(99),
              }}>
              <CImage.Avatar
                source={
                  data?.user?.image
                    ? {uri: data?.user?.image}
                    : images.iconProfile
                }
                style={{
                  width: scale(80),
                  height: scale(80),
                  borderRadius: scale(99),
                }}
              />
            </View>
            <View style={{flex: 1, rowGap: scale(10)}}>
              <CText
                numberOfLines={2}
                style={{color: COLORS.White, fontSize: SIZES.small}}
                textType="semiBold">
                {data?.user?.fullname}
              </CText>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    columnGap: scale(10),
                  }}>
                  {data?.specialties?.map(value => {
                    return (
                      <View
                        style={{
                          backgroundColor: COLORS.bluecyan,
                          borderRadius: scale(10),
                          padding: scale(4),
                          alignItems: 'center',
                          flex: 1,
                        }}>
                        <CText
                          style={{
                            color: COLORS.White,
                            fontSize: SIZES.small,
                          }}
                          numberOfLines={3}>
                          {value?.name}
                        </CText>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  columnGap: scale(20),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    columnGap: scale(5),
                    alignItems: 'center',
                  }}>
                  <IconCalendar
                    fill={COLORS.White}
                    width={scale(12)}
                    height={scale(12)}
                  />
                  <CText style={{color: COLORS.White, fontSize: SIZES.small}}>
                    {data?.workingDoctor?.[0]?.date}
                  </CText>
                </View>
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
                  <CText style={{color: COLORS.White, fontSize: SIZES.small}}>
                    {data?.workingDoctor?.[0]?.time_start} -{' '}
                    {data?.workingDoctor?.[0]?.time_end}
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
                  {data?.user?.address}
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
                    numberOfLines={4}
                    style={{color: COLORS.OrangeBold, fontSize: SIZES.small}}
                    textType="bold">
                    {t('reason_cancel')}:{' '}
                    <CText style={{color: COLORS.White, fontSize: SIZES.small}}>
                      {data?.note}
                    </CText>
                  </CText>
                </>
              )}
            </View>
          </View>

          <View style={{width: '30%', alignSelf: 'flex-end'}}>
            {data?.status === 'ACTIVE' && data?.hasCheckIn && (
              <Button
                disabled={data?.hasReview ? true : false}
                title={data?.hasReview ? t('reviewed') : t('reviewed')}
                sizeButton="small"
                onPress={onPressReview}
                styleContent={{height: scale(25)}}
                styleText={{fontSize: SIZES.small}}
                backgroundColor={
                  !data?.hasReview ? COLORS.GreenBlue : COLORS.grey
                }
              />
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              columnGap: scale(10),
              alignSelf: 'flex-end',
            }}>
            {data?.status !== 'CANCEL' && !data?.hasCheckIn && (
              <View style={{width: '30%'}}>
                <Button
                  title={t('check_in')}
                  sizeButton="small"
                  onPress={onPressDetail}
                  styleContent={{height: scale(25)}}
                  styleText={{fontSize: SIZES.small}}
                  backgroundColor={COLORS.cyan}
                />
              </View>
            )}
            {data?.status !== 'CANCEL' && !data?.hasCheckIn && (
              <View style={{width: '30%'}}>
                <Button
                  title={t('cancel')}
                  sizeButton="small"
                  onPress={onPress}
                  styleContent={{height: scale(25)}}
                  styleText={{fontSize: SIZES.small}}
                  backgroundColor={COLORS.OrangeSemi}
                />
              </View>
            )}
          </View>
        </TouchableOpacity>
      ) : (
        <AppointItemLoading style={{width: '100%', height: scale(200)}} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});

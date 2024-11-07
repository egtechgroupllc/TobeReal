import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, images, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';
import {Button, CImage, CText} from '~/components';
import {IconLocation} from '~/assets/icon/Icon';
import {useNavigation} from '@react-navigation/native';
import AppointItemLoading from './AppointItemLoading';
import {IconBuildingHospital} from '@tabler/icons-react-native';
import {useLanguage} from '~/hooks/useLanguage';

export default function AppointItem({data, isLoading, style}) {
  const {navigate} = useNavigation();
  const {t} = useLanguage();
  return (
    <View>
      {!isLoading ? (
        <View style={[styles.box, style]}>
          <View
            style={{
              flexDirection: 'row',
              columnGap: scale(10),
              alignItems: 'center',
            }}>
            <View
              style={{
                width: scale(95),
                height: scale(100),
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
                  width: scale(90),
                  height: scale(90),
                  borderRadius: scale(99),
                }}
              />
            </View>
            <View style={{flex: 1, rowGap: scale(5)}}>
              <CText
                numberOfLines={1}
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
                          padding: scale(5),
                          alignItems: 'center',
                          paddingHorizontal: scale(10),
                          flex: 1,
                        }}>
                        <CText
                          style={{
                            color: COLORS.White,
                            fontSize: SIZES.small,
                          }}
                          numberOfLines={1}>
                          {t(value?.name)}
                        </CText>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: scale(5),
                  width: scale(230),
                }}>
                <IconBuildingHospital
                  width={scale(12)}
                  height={scale(12)}
                  fill={'transparent'}
                  color={COLORS.White}
                />
                <CText
                  style={{color: COLORS.White, fontSize: SIZES.small}}
                  numberOfLines={2}>
                  {data?.medical_facility_name}
                </CText>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: scale(5),
                  width: scale(230),
                }}>
                <IconLocation width={scale(12)} height={scale(12)} />
                <CText
                  style={{color: COLORS.White, fontSize: SIZES.small}}
                  numberOfLines={2}>
                  {data?.user?.address}
                </CText>
              </View>

              <View style={{width: '60%'}}>
                <Button
                  title={t('book_now')}
                  sizeButton="small"
                  backgroundColor={COLORS.cyan}
                  onPress={() =>
                    navigate('NoBottomTab', {
                      screen: 'DetailScheduleScreen',
                      params: data,
                    })
                  }
                  styleText={{fontSize: SIZES.small}}
                  styleContent={{height: scale(25)}}
                />
              </View>
            </View>
          </View>
        </View>
      ) : (
        <AppointItemLoading style={{width: '100%'}} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: COLORS.input,
    height: scale(160),
    borderRadius: scale(10),
    justifyContent: 'center',
    paddingHorizontal: scale(10),
  },
});

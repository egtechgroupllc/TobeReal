import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button, CImage, CText} from '~/components';
import {COLORS, images, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';
import {IconLocation} from '~/assets/icon/Icon';
import {IconBuildingHospital} from '@tabler/icons-react-native';
import DoctorItemLoading from './DoctorItemLoading';
import {useLanguage} from '~/hooks/useLanguage';

export default function DoctorItem({data, isLoading}) {
  const {navigate} = useNavigation();
  const {t} = useLanguage();
  return !isLoading ? (
    <View>
      <View style={styles.viewRow}>
        <CImage.Avatar
          source={
            data?.user?.image ? {uri: data?.user?.image} : images.iconProfile
          }
          style={{
            width: scale(100),
            height: scale(100),
            borderRadius: scale(99),
          }}
        />
        <View style={{rowGap: scale(5), flex: 1}}>
          <CText
            style={{fontSize: SIZES.xMedium, color: COLORS.White}}
            textType="semiBold"
            numberOfLines={1}>
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
                    key={value?.id} // Add a unique key for each element
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
      <View style={styles.viewLine} />
    </View>
  ) : (
    <DoctorItemLoading />
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: scale(20),
    rowGap: scale(20),
    // backgroundColor: colors.WHITE,
  },
  viewTextIP: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: scale(40),
    backgroundColor: COLORS.White,
    borderRadius: scale(20),
    marginHorizontal: scale(20),
  },
  viewRow: {
    flexDirection: 'row',
    width: '100%',
    columnGap: scale(10),
    alignItems: 'center',
    height: scale(140),
  },
  txtInputSearch: {
    height: scale(42),
    width: scale(220),
    marginLeft: scale(5),
    color: COLORS.White,
  },

  viewLine: {
    height: 2 * StyleSheet.hairlineWidth,
    backgroundColor: COLORS.BlueBold,
    marginVertical: scale(10),
  },
  txtNmSmb: {
    color: COLORS.White,
    width: scale(240),
  },
  txtMduRgl: {
    color: COLORS.White,

    marginLeft: scale(20),
    marginTop: scale(10),
  },
  imageSearch: {
    height: scale(14),
    width: scale(14),
  },
  imageBg: {
    height: scale(60),
    width: scale(60),
    borderRadius: scale(60 / 2),
  },
  imageBG: {
    flex: 1,
    justifyContent: 'center',
  },
});

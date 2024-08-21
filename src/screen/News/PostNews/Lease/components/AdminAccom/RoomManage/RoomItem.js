import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  COLORS,
  SHADOW,
  SIZES,
  scale,
} from '../../../../../../../assets/constants';
import {IconReset, IconTrash} from '../../../../../../../assets/icon/Icon';
import {CustomButton} from '../../../../../../../components';
import CustomImage from '../../../../../../../components/CustomImage';
import CustomText from '../../../../../../../components/CustomText';
import {useLanguage} from '../../../../../../../hooks/useLanguage';
import {getListPriceRoomDate} from '../../../../../../../Model/api/apiAccom';
import {useQuery} from '@tanstack/react-query';
import {formatDate, formatPrice} from '../../../../../../../utils/format';

export default function RoomItem({
  data,
  isTour,
  onPressMore,
  onEdit,
  onRepost,
  onRoomLastDate,
}) {
  const {navigate} = useNavigation();
  const {t} = useLanguage();
  const today = formatDate(new Date(), {dateStyle: 'yyyy-MM-dd'});

  const {data: dataListRoomDate, isLoading} = useQuery({
    queryKey: [
      'accommodation',
      'detail',
      'list-room-date',
      {
        id_room: data?.id,
      },
    ],
    queryFn: () =>
      getListPriceRoomDate({
        id_room: data?.id,
      }),
  });
  const RoomLast = useMemo(() => {
    const rows = dataListRoomDate?.data?.data?.rows;
    return rows?.[rows.length - 1];
  }, [dataListRoomDate]);
  const handleContinue = () => {
    navigate(isTour ? 'AddTicketScreen' : 'AddRoomTypeScreen', data);
  };

  // const navigateDetail = () => {
  //   navigate(isTour ? 'DetailTourScreen' : 'DetailAccommodationScreen', {
  //     ...data,
  //   });
  // };
  const handleTouch = () => {
    // data?.rooms?.length <= 0 || data?.tour_tickets?.length <= 0
    //   ? handleContinue()
    //   : navigateDetail();
    // handleContinue();
    navigate('NoBottomTab', {screen: 'DetailRoomManageScreen', params: data});
  };
  useEffect(() => {
    onRoomLastDate && onRoomLastDate(RoomLast?.date);
  }, [RoomLast?.date, onRoomLastDate]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={today > RoomLast?.date}
      onPress={() => {
        handleTouch();
      }}>
      {today > RoomLast?.date && (
        <View
          style={{
            position: 'absolute',
            zIndex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: COLORS.black + '80',
            rowGap: scale(20),
            borderRadius: scale(6),
          }}>
          <CustomText
            textType="semiBold"
            style={{
              color: COLORS.primary,
              fontSize: SIZES.medium,
              textAlign: 'center',
              width: '80%',
            }}>
            {t('please_repost')}!
          </CustomText>
          <View style={{flexDirection: 'row', columnGap: scale(10)}}>
            <CustomButton
              onPress={onRepost}
              activeOpacity={0.9}
              text={t('repost')}
              buttonType="small"
              iconRight={IconReset}
              styleIcon={{color: COLORS.white}}
              styleWrapper={{width: '30%'}}
            />
            <TouchableOpacity
              style={{...styles.box, backgroundColor: COLORS.white}}
              activeOpacity={0.7}
              onPress={onPressMore}>
              {/* <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} /> */}
              <IconTrash
                style={{
                  width: scale(20),
                  height: scale(20),
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <CustomImage
        source={data?.images[0]?.url}
        style={{
          borderRadius: scale(7),
          minHeight: scale(160),
          width: scale(400 / 1.4),
        }}>
        <View
          style={{
            backgroundColor: COLORS.overlay,
            flex: 1,
          }}>
          {data?.accommodation_policies?.length < 1 && (
            <View
              style={{
                backgroundColor: COLORS.white,
                padding: scale(5),
                borderRadius: scale(5),
                minWidth: scale(50),
                maxWidth: scale(280),
                margin: scale(5),
              }}>
              <CustomText
                textType="medium"
                style={{
                  color: COLORS.error,
                }}>
                {t('room_not_link_policy')}
              </CustomText>
            </View>
          )}
          <View style={styles.content}>
            <CustomText
              textType="semiBold"
              style={{
                color: COLORS.white,
                ...SHADOW,
              }}
              numberOfLines={2}>
              {data?.name}
            </CustomText>

            <CustomText
              textType="semiBold"
              style={{
                color: COLORS.white,
                fontSize: SIZES.xSmall,
                ...SHADOW,
              }}>
              {t('room')} id: {data?.id}
            </CustomText>
            <CustomText
              textType="semiBold"
              style={{
                color: COLORS.white,
                fontSize: SIZES.xSmall,
                ...SHADOW,
              }}>
              {t('acreage')}:{' '}
              <CustomText
                textType="semiBold"
                style={{
                  color: COLORS.white,
                  fontSize: SIZES.xSmall,
                }}>
                {formatPrice(data?.size_width * data?.size_length, {
                  unit: 'm²',
                })}
              </CustomText>
            </CustomText>
          </View>

          {/* <View style={styles.bottom}>
              <CustomButton
                text={
                  !data?.rooms?.length <= 0 || !data?.tour_tickets?.length <= 0
                    ? isTour
                      ? 'Thêm Vé'
                      : 'Add Room'
                    : 'Incomplete Property Information'
                }
                buttonType="normal"
                style={styles.btnInfo}
                styleText={{
                  fontSize: SIZES.xSmall,
                }}
                onPress={handleContinue}
              />
  
              <CustomButton
                text="Continue"
                buttonType="normal"
                style={styles.continue}
                outline
                iconRight={IconArrowRight}
                styleIcon={styles.iconCon}
                styleText={{
                  fontSize: SIZES.xSmall,
                }}
                onPress={handleContinue}
              />
            </View> */}
          <View style={styles.bottom}>
            <CustomButton
              buttonType="normal"
              text={t('manage')}
              style={styles.btnInfo}
              styleText={{
                fontSize: SIZES.xSmall,
              }}
              onPress={onEdit}
            />
            <TouchableOpacity
              style={styles.box}
              activeOpacity={0.7}
              onPress={onPressMore}>
              <IconTrash
                style={{
                  width: scale(20),
                  height: scale(20),
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </CustomImage>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: scale(10),
    rowGap: scale(3),
  },
  box: {
    borderRadius: scale(4),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    backgroundColor: COLORS.white,
    borderColor: '#ccc',
    flexDirection: 'row',
    columnGap: scale(2),
  },
  type: {
    position: 'absolute',
    zIndex: 1,
    right: scale(8),
    top: scale(6),
    backgroundColor: COLORS.white,
    borderRadius: 99,
    paddingHorizontal: scale(6),
  },
  bottom: {
    // backgroundColor: COLORS.white,
    flexDirection: 'row',
    // width: '50%',
    padding: scale(8),
    paddingHorizontal: scale(50),
    alignItems: 'center',
    // justifyContent: 'center',
    marginTop: 'auto',
    columnGap: scale(4),
    justifyContent: 'space-between',
  },
  btnInfo: {
    height: scale(26),
    minWidth: scale(150),
    maxWidth: scale(260),
    paddingHorizontal: scale(6),
  },
  continue: {
    height: scale(26),
    borderWidth: 0,
    minWidth: scale(80),
    columnGap: scale(4),
    paddingHorizontal: 0,
  },
  iconCon: {
    color: COLORS.primary,
    width: scale(8),
    height: scale(8),
    marginTop: scale(1),
  },
});

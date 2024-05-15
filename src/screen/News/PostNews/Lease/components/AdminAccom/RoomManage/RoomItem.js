import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SIZES, scale} from '../../../../../../../assets/constants';
import {CustomButton} from '../../../../../../../components';
import CustomImage from '../../../../../../../components/CustomImage';
import CustomText from '../../../../../../../components/CustomText';
import {
  IconEditProfile,
  IconTrash,
} from '../../../../../../../assets/icon/Icon';

export default function RoomItem({data, isTour, onPressMore, onEdit}) {
  const {navigate} = useNavigation();

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
    navigate('DetailRoomManageScreen', {...data});
  };
  return (
    <View
      activeOpacity={0.7}
      onPress={() => {
        handleTouch();
      }}>
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
          <View style={styles.content}>
            <CustomText
              textType="semiBold"
              style={{
                color: COLORS.white,
              }}
              numberOfLines={2}>
              {data?.name}
            </CustomText>
            <CustomText
              textType="semiBold"
              style={{
                color: COLORS.white,
                fontSize: SIZES.xSmall,
              }}>
              Room id: {data?.id}
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
              text="Edit"
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
    </View>
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

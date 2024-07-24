import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect, useMemo, useState} from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SIZES, scale} from '../../../../../../../assets/constants';
import CustomImage from '../../../../../../../components/CustomImage';
import CustomText from '../../../../../../../components/CustomText';
import MainWrapper from '../../../../../../../components/MainWrapper';
import {CustomButton} from '../../../../../../../components';
import {useLanguage} from '../../../../../../../hooks/useLanguage';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {
  deleteRoom,
  getListPriceRoomDate,
  getListTypeBed,
  getListTypeRoom,
} from '../../../../../../../Model/api/apiAccom';
import {showMess} from '../../../../../../../assets/constants/Helper';
import {IconHome} from '../../../../../../../assets/icon/Icon';
import {formatDate, formatPrice} from '../../../../../../../utils/format';
import {useCountry} from '../../../../../../../hooks/useCountry';

export default function DetailRoomManageScreen() {
  const params = useRoute().params;

  const {setOptions, goBack} = useNavigation();
  const {t} = useLanguage();
  const {currency} = useCountry();
  const {navigate} = useNavigation();
  const [adminScreen, setAdminScreen] = useState(false);
  const queryClient = useQueryClient();

  const dataRoomPrice = useQuery({
    queryKey: ['accommodation', 'detail', 'list-room-date', params?.id],
    queryFn: () =>
      getListPriceRoomDate({
        id_room: params?.id,
        date_end: formatDate(new Date(), {addDays: 1}),
        date_start: formatDate(),
      }),
  });

  const price = dataRoomPrice?.data?.data?.data?.rows?.[0]?.price;
  const dataTypeRoom = useQuery({
    queryKey: ['room', 'list-type'],
    queryFn: () => getListTypeRoom(),
  });

  const roomType = useMemo(() => {
    const filterType = dataTypeRoom?.data?.data?.filter(item => {
      return item?.id === params?.room_type_id;
    });
    const result = filterType?.map(item => {
      return item?.name;
    });
    return result;
  }, [dataTypeRoom?.data?.data]);

  useLayoutEffect(() => {
    return setOptions({
      headerTitle: 'Room management detail',
      headerRight: () => (
        <TouchableOpacity onPress={() => navigate('PostNewsScreen')}>
          <IconHome style={{width: scale(20)}} />
        </TouchableOpacity>
      ),
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  useEffect(() => {
    setAdminScreen(true);
  }, [adminScreen]);

  const deleteRoomMu = useMutation({
    mutationFn: deleteRoom,
  });

  const Delete = value => {
    deleteRoomMu.mutate(
      {
        id_room: data?.id,
      },
      {
        onSuccess: dataInside => {
          showMess(
            dataInside.message,
            dataInside?.status ? 'success' : 'error',
          );

          if (dataInside?.status) {
            navigate('LeaseScreen');
            // queryClient.invalidateQueries(['room', 'my-list']);
          }
        },

        onError: err => {
          console.log({err});
        },
      },
    );
  };

  const handleDelete = () =>
    Alert.alert(t('delete_room'), t('delete_room_not_restore'), [
      {
        text: t('cancel'),
        // onPress: () => Alert.alert('Cancel Pressed'),
        style: 'cancel',
      },
      {text: t('ok'), onPress: () => Delete()},
    ]);

  return (
    <MainWrapper scrollEnabled={false} refreshControl>
      <View
        style={{alignItems: 'center', rowGap: scale(20), marginTop: scale(20)}}>
        <CustomText textType="semiBold" style={{fontSize: SIZES.large}}>
          {params?.name}
        </CustomText>
        <CustomImage
          source={params?.images[0]?.url}
          style={{
            borderRadius: scale(7),
            minHeight: scale(180),
            width: scale(450 / 1.4),
          }}>
          <View style={styles.type}>
            <CustomText
              textType="semiBold"
              style={{
                color: COLORS.error,
              }}>
              {roomType}
            </CustomText>
          </View>

          <CustomText
            textType="bold"
            style={{
              color: COLORS.white,
              fontSize: SIZES.xSmall,
              padding: scale(15),
            }}>
            RegID: {params?.id}
          </CustomText>
          <View
            style={{
              ...styles.content,
              marginTop: scale(85),
            }}>
            <View
              style={{
                maxWidth: scale(150),
                borderRadius: scale(5),
                height: scale(30),
                padding: scale(5),
                backgroundColor: COLORS.primary,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <CustomText
                numberOfLines={1}
                textType="semiBold"
                style={{
                  color: COLORS.white,
                }}>
                {formatPrice(price, {currency: currency?.currency_code})}
              </CustomText>
            </View>
          </View>
        </CustomImage>
        {/* <CustomButton
          text={t('booking_count')}
          style={{width: '85%', height: scale(45)}}
        /> */}

        <CustomButton
          text={t('edit')}
          style={{width: '85%', height: scale(45)}}
          onPress={() => {
            navigate('AddRoomTypeScreen', {
              ...params,
              update: true,
            });
          }}
        />
        <CustomButton
          text={t('link_policy_to_room')}
          style={{width: '85%', height: scale(45)}}
          onPress={() => {
            navigate('PolicyToRoomScreen', {
              ...params,
              admin: adminScreen,
              price: price,
            });
          }}
        />
        {/* <CustomButton
          text={t('room_manage')}
          style={{width: '85%', height: scale(45)}}
          // onPress={() =>
          //   navigate('AddRoomTypeScreen', {...params, admin: adminScreen})
          // }
          onPress={() =>
            navigate('RoomManageScreen', {...params, admin: adminScreen})
          }
        /> */}
        <CustomButton
          text={t('policy_manage')}
          style={{width: '85%', height: scale(45)}}
          onPress={() =>
            navigate('PolicyManageScreen', {
              ...params,
              admin: adminScreen,
              price: price,
            })
          }
        />

        <CustomButton
          text={t('delete_room')}
          style={{
            width: '85%',
            height: scale(45),
            backgroundColor: '#f04f5c',
          }}
          onPress={handleDelete}
        />
      </View>
    </MainWrapper>
  );
}
const styles = StyleSheet.create({
  content: {
    justifyContent: 'flex-end',
    padding: scale(10),
    rowGap: scale(3),
  },
  type: {
    position: 'absolute',
    zIndex: 1,
    right: scale(10),
    top: scale(10),
    backgroundColor: COLORS.white,
    borderRadius: 99,
    paddingHorizontal: scale(15),
    paddingVertical: scale(5),
  },
  bottom: {
    // backgroundColor: COLORS.white,
    // flexDirection: 'row',
    width: '50%',
    padding: scale(8),
    alignSelf: 'center',
    marginTop: 'auto',
    columnGap: scale(4),
    // justifyContent: 'space-between',
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

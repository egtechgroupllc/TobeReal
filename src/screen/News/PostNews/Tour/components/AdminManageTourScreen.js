import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SIZES, scale} from '../../../../../assets/constants';
import CustomImage from '../../../../../components/CustomImage';
import CustomText from '../../../../../components/CustomText';
import MainWrapper from '../../../../../components/MainWrapper';
import {CustomButton} from '../../../../../components';
import {QueryClient, useMutation, useQueryClient} from '@tanstack/react-query';
import {deleteAccom} from '../../../../../Model/api/apiAccom';
import {showMess} from '../../../../../assets/constants/Helper';
import {IconHome} from '../../../../../assets/icon/Icon';
import {deleteTour} from '../../../../../Model/api/apiTour';
import {useLanguage} from '../../../../../hooks/useLanguage';

export default function AdminManageTourScreen() {
  const params = useRoute().params;
  const {t} = useLanguage();
  const {setOptions} = useNavigation();
  const {navigate, goBack} = useNavigation();
  const [adminScreen, setAdminScreen] = useState(false);
  const queryClient = useQueryClient();
  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('tour_management'),
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
  const deleteTourMu = useMutation({
    mutationFn: deleteTour,
  });

  const Delete = value => {
    deleteTourMu.mutate(
      {
        id_tour: params?.id,
      },
      {
        onSuccess: dataInside => {
          showMess(
            dataInside.message,
            dataInside?.status ? 'success' : 'error',
          );

          if (dataInside?.status) {
            queryClient.invalidateQueries(['tour', 'my-list']);
            goBack();
          }
        },

        onError: err => {
          console.log({err});
        },
      },
    );
  };
  const handleDelete = () =>
    Alert.alert(
      t('are_you_sure_delete_tour'),
      t('deleted_tour_cannot_restored'),
      [
        {
          text: t('cancel'),
          // onPress: () => Alert.alert('Cancel Pressed'),
          style: 'cancel',
        },
        {text: t('confirm'), onPress: () => Delete()},
      ],
    );
  return (
    <MainWrapper scrollEnabled={false} refreshControl>
      <View
        style={{alignItems: 'center', rowGap: scale(20), marginTop: scale(20)}}>
        <CustomText textType="semiBold" style={{fontSize: SIZES.medium}}>
          {params?.name}
        </CustomText>
        <CustomImage
          source={params?.images[0]?.url}
          style={{
            borderRadius: scale(7),
            minHeight: scale(180),
            width: scale(450 / 1.4),
          }}>
          {params?.status && (
            <View
              style={{
                ...styles.type,
                left: scale(8),
                right: 'auto',
                borderRadius: scale(5),
                paddingVertical: scale(5),
                backgroundColor:
                  params?.status === 'VERIFIED'
                    ? '#42b00b'
                    : params?.status === 'VERIFYING'
                    ? COLORS.primary
                    : '#e03c31',
              }}>
              <CustomText
                textType="semiBold"
                style={{
                  color: COLORS.white,
                }}>
                {params?.status}
              </CustomText>
            </View>
          )}

          <View style={{...styles.content}}>
            <CustomText
              textType="bold"
              numberOfLines={2}
              style={{
                color: COLORS.white,
                fontSize: SIZES.xSmall,
              }}>
              {params?.address}
            </CustomText>
            <CustomText
              textType="semiBold"
              style={{
                color: COLORS.white,
                fontSize: SIZES.xSmall,
              }}>
              Id: {params?.id}
            </CustomText>
          </View>
        </CustomImage>

        <CustomButton
          text={t('tour_ticket_management')}
          style={{width: '85%', height: scale(45)}}
          // onPress={() =>
          //   navigate('AddRoomTypeScreen', {...params, admin: adminScreen})
          // }
          onPress={() =>
            navigate('TicketManageScreen', {...params, admin: adminScreen})
          }
        />
        <CustomButton
          text={t('voucher_manage')}
          style={{width: '85%', height: scale(45)}}
          // onPress={() =>
          //   navigate('AddRoomTypeScreen', {...params, admin: adminScreen})
          // }
          onPress={() =>
            navigate('VoucherManageScreen', {...params, isTour: true})
          }
        />
        <CustomButton
          text={t('manage_video_short')}
          style={{width: '85%', height: scale(45)}}
          // onPress={() =>
          //   navigate('AddRoomTypeScreen', {...params, admin: adminScreen})
          // }
          onPress={() =>
            navigate('ManageVideoShortScreen', {
              tour: {id: params?.id, isTour: true},
            })
          }
        />
        {/* <CustomButton
          text={t('edit_tour')}
          style={{width: '85%', height: scale(45)}}
          // onPress={() =>
          //   navigate('AddRoomTypeScreen', {...params, admin: adminScreen})
          // }
          onPress={() =>
            navigate('PostNewTourScreen', {...params, admin: adminScreen})
          }
        /> */}
        {/* <CustomButton
          text="Policy management"
          style={{width: '85%', height: scale(45)}}
          onPress={() =>
            navigate('PolicyManageScreen', {...params, admin: adminScreen})
          }
        /> */}
        <CustomButton
          text={t('remove_tour')}
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
    flex: 1,
    justifyContent: 'flex-end',
    padding: scale(10),
    rowGap: scale(3),
  },
  type: {
    position: 'absolute',
    zIndex: 1,
    right: scale(8),
    top: scale(6),
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

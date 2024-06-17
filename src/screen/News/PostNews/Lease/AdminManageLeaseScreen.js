import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SIZES, scale} from '../../../../assets/constants';
import CustomImage from '../../../../components/CustomImage';
import CustomText from '../../../../components/CustomText';
import MainWrapper from '../../../../components/MainWrapper';
import {CustomButton} from '../../../../components';
import {QueryClient, useMutation, useQueryClient} from '@tanstack/react-query';
import {deleteAccom} from '../../../../Model/api/apiAccom';
import {showMess} from '../../../../assets/constants/Helper';
import HeaderRight from '../../../../navigation/components/HeaderRight';
import {IconHome} from '../../../../assets/icon/Icon';
import {useLanguage} from '../../../../hooks/useLanguage';

export default function AdminManageLeaseScreen() {
  const params = useRoute().params;
  const {t} = useLanguage();
  const queryClient = useQueryClient();

  const {setOptions} = useNavigation();
  const {navigate, goBack} = useNavigation();
  const [adminScreen, setAdminScreen] = useState(false);
  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('accom_management'),
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
  const deleteAccomMu = useMutation({
    mutationFn: deleteAccom,
  });
  const Delete = value => {
    deleteAccomMu.mutate(
      {
        id_accom: params?.id,
      },
      {
        onSuccess: dataInside => {
          showMess(
            dataInside.message,
            dataInside?.status ? 'success' : 'error',
          );

          if (dataInside?.status) {
            goBack();
            queryClient.invalidateQueries(['accommodation', 'my-list']);
            queryClient.invalidateQueries(['accommodation', 'list-rent']);
          }
        },

        onError: err => {
          console.log({err});
        },
      },
    );
  };
  const handleDelete = () =>
    Alert.alert(t('delete_property'), t('delete_property_not_restore'), [
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
              {params?.accommodation_type?.name}
            </CustomText>
          </View>
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
              RegID: {params?.id}
            </CustomText>
          </View>
        </CustomImage>
        <CustomButton
          text={t('booking_count')}
          style={{width: '85%', height: scale(45)}}
        />
        <CustomButton
          text={t('review')}
          style={{width: '85%', height: scale(45)}}
        />
        <CustomButton
          text={t('room_manage')}
          style={{width: '85%', height: scale(45)}}
          // onPress={() =>
          //   navigate('AddRoomTypeScreen', {...params, admin: adminScreen})
          // }
          onPress={() =>
            navigate('RoomManageScreen', {...params, admin: adminScreen})
          }
        />
        <CustomButton
          text={t('policy_manage')}
          style={{width: '85%', height: scale(45)}}
          onPress={() =>
            navigate('PolicyManageScreen', {...params, admin: adminScreen})
          }
        />
        <CustomButton
          text={t('remove_accom')}
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

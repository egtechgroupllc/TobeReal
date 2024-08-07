import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {COLORS, SHADOW, SIZES, images, scale} from '../../../assets/constants';
import {CustomImage, CustomText} from '../../../components';
import {formatTimeAgo} from '../../../utils/format';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {postCheckStatus} from '../../../Model/api/common';
import {showMess} from '../../../assets/constants/Helper';
import {useNavigation} from '@react-navigation/native';
import {useLanguage} from '../../../hooks/useLanguage';

export default function BoxChatItem({dataUser, dataItem, token}) {
  const {navigate, setOptions} = useNavigation();
  const [checkState, setCheckState] = useState();
  const {t} = useLanguage();

  const queryClient = useQueryClient();

  const dataPro = queryClient.getQueryData(['user', 'profile'])?.data;

  const userId = dataUser?.chat_group__user?.userId;
  const {data, isLoading, error} = useQuery({
    queryKey: ['chat', 'status', userId],
    queryFn: () => postCheckStatus({data: {user_id: userId}, token: token}),
    enabled: !!token,
    refetchInterval: 5000, // Refetch every 3 seconds
  });
  const countImage = dataItem?.chat_messages?.[0]?.images?.length;
  const userChatId = dataItem?.chat_messages?.[0]?.user_id;
  useEffect(() => {
    if (data) {
      setCheckState(data?.data?.is_connected);
    }
  }, [data]);
  const checkMessage = () => {
    if (countImage > 0) {
      if (userChatId === dataPro?.id) {
        return `${t('you')} ${t('sent')} ${
          dataItem?.chat_messages?.[0]?.images?.length
        } ${t('image')}`;
      } else {
        return `${dataUser?.username} ${t('sent')} ${
          dataItem?.chat_messages?.[0]?.images?.length
        } ${t('image')}`;
      }
    } else {
      return dataItem?.chat_messages?.[0]?.content;
    }
  };
  const navigateGroupChat = value => {
    navigate('ChatBoxScreen', {
      chat_group_id: value?.chat_group__user?.chatGroupId,
      value,
      checkState,
    });
  };

  return (
    <TouchableOpacity
      onPress={() => navigateGroupChat(dataUser)}
      style={{
        backgroundColor: COLORS.white,
        minHeight: scale(60),
        width: '100%',
        borderRadius: scale(10),
        ...SHADOW,
        padding: scale(10),
        rowGap: scale(3),
        paddingHorizontal: scale(15),
      }}>
      {dataItem?.number_message_not_seen > 0 && (
        <View
          style={{
            position: 'absolute',
            backgroundColor: 'red',
            width: scale(18),
            height: scale(18),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: scale(10),
            top: scale(-5),
            right: scale(-5),
          }}>
          <CustomText style={{color: COLORS.white}}>
            {dataItem?.number_message_not_seen}
          </CustomText>
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: scale(15),
        }}>
        <CustomImage
          source={
            !dataUser?.image_avatar ? images.avatar : dataUser?.url_image_avatar
          }
          style={{
            width: scale(40),
            height: scale(40),
            borderRadius: scale(99),
            ...SHADOW,
          }}
        />
        <View
          style={{
            height: scale(15),
            width: scale(15),
            backgroundColor: checkState ? COLORS.green : COLORS.grey,
            borderRadius: scale(99),
            borderWidth: 2,
            borderColor: COLORS.white,
            position: 'absolute',
            alignSelf: 'flex-end',
            left: scale(30),
          }}
        />

        <View style={{rowGap: scale(3), flex: 1}}>
          <CustomText
            numberOfLines={1}
            style={{fontSize: SIZES.medium, width: scale(250)}}
            textType="semiBold">
            {dataUser?.username}
          </CustomText>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <CustomText
              numberOfLines={1}
              style={{flex: 1}}
              textType={
                dataItem?.chat_messages?.[0]?.user_id !== dataPro?.id &&
                !dataItem?.chat_messages?.[0]?.is_seen
                  ? 'bold'
                  : 'regular'
              }>
              {checkMessage()}
            </CustomText>
            <CustomText
              numberOfLines={1}
              style={{
                color: COLORS.grey,
                textAlign: 'right',
                flex: 0.5,
              }}>
              {formatTimeAgo(dataItem?.chat_messages?.[0]?.updatedAt)}
            </CustomText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});

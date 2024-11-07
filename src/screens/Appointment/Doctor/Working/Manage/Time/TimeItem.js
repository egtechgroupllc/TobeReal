import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {scale} from '~/utils/scale';
import {COLORS, SIZES} from '~/assets/constants';
import {Button, CText} from '~/components';
import {IconLock, IconX} from '~/assets/icon/Icon';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {getDateWorkingDoctor, postDeleteDateWorking} from '~/api/doctor';
import {showMess} from '~/assets/constants/Helper';
import {useLanguage} from '~/hooks/useLanguage';
import TimeItemLoading from './TimeItemLoading';

export default function TimeItem({data, selectedStartDate, isLoading}) {
  const {navigate} = useNavigation();
  const {t} = useLanguage();
  const queryClient = useQueryClient();
  const deleteDateWorkingMutation = useMutation({
    mutationFn: postDeleteDateWorking,
  });
  const handleDeleteDateWorking = value => {
    deleteDateWorkingMutation.mutate(value, {
      onSuccess: dataInside => {
        showMess(
          t(dataInside?.message),
          dataInside?.error ? 'error' : 'success',
        );
        if (!dataInside?.error) {
          queryClient.invalidateQueries([...getDateWorkingDoctor.queryKey]);
        }
      },
      onError: err => {
        if (err.response) {
          showMess(err?.response?.data?.message, 'error');
        }
      },
    });
  };
  const handleAlert = item => {
    Alert.alert(
      t('are_you_sure_want_to_delete_time_marker'),
      t('time_marker_cant_be_restored'),
      [
        {
          text: t('cancel'),
          // onPress: () => Alert.alert('Cancel Pressed'),
          style: 'cancel',
        },
        {text: t('ok'), onPress: () => handleDeleteDateWorking(item?.id)},
      ],
    );
  };
  return (
    <>
      {!isLoading ? (
        <TouchableOpacity
          onPress={() =>
            navigate('ManageTimeMakerScreen', {
              update: true,
              ...data,
              date: selectedStartDate,
            })
          }
          style={{
            backgroundColor: COLORS.input,
            padding: scale(10),
            borderRadius: scale(10),
            justifyContent: 'center',
            alignItems: 'center',
            width: scale(105),
            rowGap: scale(3),
          }}>
          <View style={styles.cancel}>
            <Button.Icon
              Icon={IconX}
              padding={0}
              fill={COLORS.error}
              width={scale(15)}
              height={scale(15)}
              onPress={() => handleAlert(data)}
            />
          </View>

          <CText
            style={{color: COLORS.White, fontSize: SIZES.xSmall}}
            textType="bold"
            numberOfLines={1}>
            {data?.time_start} - {data?.time_end}
          </CText>
          <CText
            style={{color: COLORS.blue, fontSize: SIZES.xSmall}}
            textType="bold"
            numberOfLines={1}>
            [{data?.type}]
          </CText>

          {data?.status === 'CLOSED' ? (
            <IconLock
              width={scale(15)}
              height={scale(15)}
              fill={COLORS.error}
            />
          ) : data?.status === 'AVAILABLE' ? (
            <CText
              style={{color: COLORS.green, fontSize: SIZES.xSmall}}
              textType="bold">
              AVAILABLE
            </CText>
          ) : (
            <CText
              textType="bold"
              style={{color: COLORS.yellow, fontSize: SIZES.xSmall}}>
              FULL
            </CText>
          )}
        </TouchableOpacity>
      ) : (
        <View>
          <TimeItemLoading />
        </View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  cancel: {
    alignSelf: 'flex-end',
    position: 'absolute',
    overflow: 'hidden',
    top: scale(-7),
    zIndex: 99,
    right: scale(-7),
    backgroundColor: COLORS.White,
    borderRadius: scale(99),
  },
});

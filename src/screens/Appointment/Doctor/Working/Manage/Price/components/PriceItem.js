import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import {COLORS, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';
import {Button, CText} from '~/components';
import {formatPrice} from '~/utils/format';
import {IconEdit} from '@tabler/icons-react-native';
import {IconTrash} from '~/assets/icon/Icon';
import {useNavigation} from '@react-navigation/native';
import BottomSheet from '~/components/BottomSheet';
import {useLanguage} from '~/hooks/useLanguage';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {getExaminationPrice, postDeletePriceExamination} from '~/api/doctor';
import {showMess} from '~/assets/constants/Helper';

export default function PriceItem({data}) {
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  const queryClient = useQueryClient();
  const deletePriceExaminationMutation = useMutation({
    mutationFn: postDeletePriceExamination,
  });

  const handleDeletePrice = value => {
    deletePriceExaminationMutation.mutate(value, {
      onSuccess: dataInside => {
        showMess(
          t(dataInside?.message),
          dataInside?.error ? 'error' : 'success',
        );
        if (!dataInside?.error) {
          queryClient.invalidateQueries([...getExaminationPrice.queryKey]);
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
      t('are_you_sure_want_to_delete_price_examination'),
      t('price_examination_cant_be_restored'),
      [
        {
          text: t('cancel'),
          // onPress: () => Alert.alert('Cancel Pressed'),
          style: 'cancel',
        },
        {text: t('ok'), onPress: () => handleDeletePrice(item?.id)},
      ],
    );
  };
  return (
    <View style={{rowGap: scale(10)}}>
      <CText
        numberOfLines={2}
        style={{
          color: COLORS.White,
          fontSize: SIZES.xMedium,
          width: '70%',
        }}
        textType="bold">
        {data?.specialties?.name}
      </CText>
      <View
        style={{
          backgroundColor: COLORS.input,
          padding: scale(20),
          paddingHorizontal: scale(20),
          borderRadius: scale(10),
          rowGap: scale(10),
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <CText
            numberOfLines={2}
            style={{
              color: COLORS.White,
              fontSize: SIZES.xMedium,
              width: '70%',
            }}
            textType="bold">
            {data?.name}
          </CText>
          <CText
            style={{
              color: COLORS.White,
              fontSize: SIZES.xMedium,
              width: '30%',
              textAlign: 'right',
            }}
            textType="bold">
            {formatPrice(data?.price)}
          </CText>
        </View>
        <CText
          numberOfLines={2}
          style={{
            color: COLORS.White,
            fontSize: SIZES.xMedium,
          }}
          textType="regular">
          {data?.description}
        </CText>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{width: '50%'}}>
            <Button
              title={t('manage')}
              sizeButton="small"
              backgroundColor={COLORS.input}
              onPress={() => navigate('ManageServicePrice', data)}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              columnGap: scale(15),
              alignItems: 'center',
            }}>
            <Button.Icon
              Icon={IconEdit}
              padding={0}
              width={25}
              height={25}
              color={COLORS.blue}
              onPress={() =>
                navigate('AddPriceExamScreen', {...data, update: true})
              }
            />
            <Button.Icon
              Icon={IconTrash}
              padding={0}
              width={25}
              height={25}
              onPress={() => handleAlert(data)}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

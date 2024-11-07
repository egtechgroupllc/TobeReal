import {Alert, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';
import {Button, CText} from '~/components';
import {formatPrice} from '~/utils/format';
import {IconEdit} from '@tabler/icons-react-native';
import {IconTrash} from '~/assets/icon/Icon';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {getExaminationPrice, postDeleteServicePrice} from '~/api/doctor';
import {showMess} from '~/assets/constants/Helper';
import {useLanguage} from '~/hooks/useLanguage';
import {useNavigation} from '@react-navigation/native';

export default function ServicePriceItem({data}) {
  const queryClient = useQueryClient();
  const {t} = useLanguage();
  const {navigate, goBack} = useNavigation();
  const deleteServicePriceMutation = useMutation({
    mutationFn: postDeleteServicePrice,
  });

  const handleDeletePrice = value => {
    deleteServicePriceMutation.mutate(value, {
      onSuccess: dataInside => {
        showMess(
          t(dataInside?.message),
          dataInside?.error ? 'error' : 'success',
        );
        if (!dataInside?.error) {
          queryClient.invalidateQueries([...getExaminationPrice.queryKey]);
          goBack();
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
      t('are_you_sure_want_to_delete_service_price'),
      t('service_price_cant_be_restored'),
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
    <View
      style={{
        backgroundColor: COLORS.input,
        padding: scale(20),
        paddingHorizontal: scale(20),
        borderRadius: scale(10),
        rowGap: scale(10),
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
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
          columnGap: scale(15),
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        <Button.Icon
          Icon={IconEdit}
          padding={0}
          width={25}
          height={25}
          color={COLORS.blue}
          onPress={() =>
            navigate('AddServicePriceScreen', {...data, update: true})
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
  );
}

const styles = StyleSheet.create({});

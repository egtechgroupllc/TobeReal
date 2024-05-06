import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainWrapper from '../../../../components/MainWrapper';
import {SHADOW, SIZES, scale} from '../../../../assets/constants';
import CustomText from '../../../../components/CustomText';
import RulesPolicy1 from './components/AddPolicy/RulesPolicy1';
import RulesPolicy2 from './components/AddPolicy/RulesPolicy2';
import RulesPolicy4 from './components/AddPolicy/RulesPolicy4';
import RulesPolicy5 from './components/AddPolicy/RulesPolicy5';
import SetNamePolicy from './components/AddPolicy/SetNamePolicy';
import RulesPolicy6 from './components/AddPolicy/RulesPolicy6';
import RulesPolicy3 from './components/AddPolicy/RulesPolicy3';
import {useForm} from 'react-hook-form';
import {useMutation} from '@tanstack/react-query';
import {postCreatePolicyToAccom} from '../../../../Model/api/apiAccom';
import {CustomButton} from '../../../../components';

export default function AddPolicyScreen({route}) {
  const dataParams = route?.params;
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    unregister,
    formState: {errors},
  } = useForm();

  const createPolicy = useMutation({
    mutationFn: postCreatePolicyToAccom,
  });

  const handleCreatePolicy = value => {
    const price_percent = value?.isDiscount
      ? value?.price_percent / 100
      : value?.price_percent / 100 + 1;

    delete value?.isDiscount;
    createPolicy.mutate(
      {
        accommodation_id: dataParams?.id,
        ...value,
        refund_fee: value?.refund_fee ? value?.refund_fee / 100 : 1,
        price_percent,
      },
      {
        onSuccess: dataInside => {
          console.log(dataInside);

          if (dataInside?.status) {
            reset();
          }
        },

        onError: err => {
          console.log(err);
        },
      },
    );
  };

  return (
    <MainWrapper
      noImgColor
      styleContent={{
        paddingHorizontal: scale(10),
      }}>
      <View style={styles.content}>
        <Box
          title="Quý vị muốn sử dụng chính sách hủy phòng nào cho loại giá này?"
          num="1">
          <RulesPolicy1
            setValue={setValue}
            control={control}
            unregister={unregister}
          />
        </Box>

        <Box num="2" title="Quý vị có muốn bao gồm bữa ăn trong loại giá này?">
          <RulesPolicy2 setValue={setValue} unregister={unregister} />
        </Box>

        <Box
          num="3"
          title="Quý vị muốn thêm dịch vụ giá trị gia tăng vào loại giá này?">
          <RulesPolicy3 setValue={setValue} unregister={unregister} />
        </Box>

        <Box
          num="4"
          title="Quý vị có muốn thiết lập thời gian lưu trú tối thiểu cho loại giá này không?">
          <RulesPolicy4
            setValue={setValue}
            control={control}
            unregister={unregister}
          />
        </Box>

        <Box
          num="5"
          title="Khách có thể đặt với loại giá này bao nhiêu ngày trước khi nhận phòng?">
          <RulesPolicy5 control={control} unregister={unregister} />
        </Box>

        <Box
          num="6"
          title="Quý vị muốn loại giá mới này rẻ hơn hay đắt hơn Loại giá cho khách đặt sớm (15+ ngày)?">
          <RulesPolicy6
            control={control}
            unregister={unregister}
            setValue={setValue}
          />
        </Box>

        <Box num="7" title="Quý vị có muốn đặt tên cho loại giá này là gì?">
          <SetNamePolicy control={control} />
        </Box>
        <CustomButton
          text="Submit"
          onPress={handleSubmit(handleCreatePolicy)}
        />
      </View>
    </MainWrapper>
  );
}
const Box = ({title, num, children}) => {
  return (
    <View
      style={{
        rowGap: scale(12),
      }}>
      <View
        style={{
          flexDirection: 'row',
          columnGap: scale(10),
          alignItems: 'flex-start',
        }}>
        <View
          style={{
            padding: scale(6),
            backgroundColor: '#ddd',
            borderRadius: scale(6),
          }}>
          <CustomText textType="bold">{num}</CustomText>
        </View>

        <CustomText textType="bold" size={SIZES.xMedium} style={{flex: 1}}>
          {title}
        </CustomText>
      </View>

      {children}
    </View>
  );
};
const styles = StyleSheet.create({
  content: {
    backgroundColor: '#fff',
    flex: 1,
    minHeight: scale(300),
    padding: scale(12),
    borderRadius: scale(9),
    ...SHADOW,
    rowGap: scale(30),
  },
});

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import MainWrapper from '../../../../components/MainWrapper';
import {COLORS, SHADOW, SIZES, scale} from '../../../../assets/constants';
import CustomText from '../../../../components/CustomText';
import RulesPolicy1 from './components/AddPolicy/RulesPolicy1';
import RulesPolicy2 from './components/AddPolicy/RulesPolicy2';
import RulesPolicy4 from './components/AddPolicy/RulesPolicy4';
import RulesPolicy5 from './components/AddPolicy/RulesPolicy5';
import SetNamePolicy from './components/AddPolicy/SetNamePolicy';
import RulesPolicy6 from './components/AddPolicy/RulesPolicy6';
import RulesPolicy3 from './components/AddPolicy/RulesPolicy3';
import {useForm} from 'react-hook-form';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {postCreatePolicyToAccom} from '../../../../Model/api/apiAccom';
import {CustomButton} from '../../../../components';
import {useNavigation} from '@react-navigation/native';
import {IconHome} from '../../../../assets/icon/Icon';
import {showMess} from '../../../../assets/constants/Helper';
import {useLanguage} from '../../../../hooks/useLanguage';

export default function AddPolicyScreen({route}) {
  const dataParams = route?.params;
  const {t} = useLanguage();

  const {navigate, setOptions} = useNavigation();
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    unregister,
    formState: {errors},
  } = useForm();
  const queryClient = useQueryClient();
  const createPolicy = useMutation({
    mutationFn: postCreatePolicyToAccom,
  });
  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('policy_screen'),
      headerTitleStyle: {
        textAlign: 'center',
      },
      headerRight: () => (
        <TouchableOpacity onPress={() => navigate('PostNewsScreen')}>
          <IconHome style={{width: scale(20)}} />
        </TouchableOpacity>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
          // navigate('NoBottomTab', {
          //   screen: 'AccommoManagementScreen',
          // });

          if (dataInside?.status) {
            queryClient.invalidateQueries([
              'accommodation',
              'list-policy',
              dataParams?.id,
            ]);
            showMess(
              dataInside?.message,
              dataInside?.status ? 'success' : 'error',
            );
            !dataParams?.policyScreen
              ? navigate('NoBottomTab', {
                  screen: 'AddRoomTypeScreen',
                  params: {id: dataParams?.id},
                })
              : navigate('NoBottomTab', {
                  screen: 'PolicyManageScreen',
                  params: {id: dataParams?.id},
                });
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
      imgBackground
      styleContent={{
        paddingHorizontal: scale(10),
      }}>
      <View style={styles.content}>
        <Box title={t('which_cancel_policy')} num="1">
          <RulesPolicy1
            setValue={setValue}
            control={control}
            unregister={unregister}
          />
        </Box>

        <Box num="2" title={t('do_you_want_meal')}>
          <RulesPolicy2 setValue={setValue} unregister={unregister} />
        </Box>

        <Box num="3" title={t('do_you_want_service')}>
          <RulesPolicy3 setValue={setValue} unregister={unregister} />
        </Box>

        <Box num="4" title={t('do_you_want_minimum_lenghth')}>
          <RulesPolicy4
            setValue={setValue}
            control={control}
            unregister={unregister}
          />
        </Box>

        <Box num="5" title={t('how_many_days')}>
          <RulesPolicy5 control={control} unregister={unregister} />
        </Box>

        <Box num="6" title={t('do_you_want_new_price')}>
          <RulesPolicy6
            control={control}
            unregister={unregister}
            setValue={setValue}
          />
        </Box>

        <Box num="7" title={t('name_of_policy')}>
          <SetNamePolicy control={control} />
        </Box>
        <CustomButton
          text={t('submit')}
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
          <CustomText textType="bold" style={{color: COLORS.black}}>
            {num}
          </CustomText>
        </View>

        <CustomText
          textType="bold"
          size={SIZES.xMedium}
          style={{flex: 1, color: COLORS.black}}>
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

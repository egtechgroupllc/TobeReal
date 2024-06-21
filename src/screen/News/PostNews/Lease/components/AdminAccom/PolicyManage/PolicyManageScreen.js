import {useNavigation, useRoute} from '@react-navigation/native';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  getListPolicy,
  postPolicyToRoom,
} from '../../../../../../../Model/api/apiAccom';
import {COLORS, SIZES, scale} from '../../../../../../../assets/constants';
import {IconHome, IconTrash} from '../../../../../../../assets/icon/Icon';
import {CustomButton} from '../../../../../../../components';
import BottomSheet from '../../../../../../../components/BottomSheet';
import CustomText from '../../../../../../../components/CustomText';
import DeletePolicy from './DeletePolicy';
import {useLanguage} from '../../../../../../../hooks/useLanguage';
import CheckBox from '../../../../../../../components/CheckBox';
import MainWrapper from '../../../../../../../components/MainWrapper';
import {showMess} from '../../../../../../../assets/constants/Helper';

export default function PolicyManageScreen() {
  const params = useRoute().params;
  const {setOptions, navigate, goBack} = useNavigation();

  const {t} = useLanguage();
  const [policy, setPolicy] = useState([]);
  const queryClient = useQueryClient();

  const policyCheckBox = item => {
    setPolicy(prev => {
      const check = prev?.includes(item);

      if (check) {
        return prev?.filter(policy => policy !== item);
      }

      return [...prev, item];
    });
  };
  const bottomSheetRef = useRef();
  const [dataItemAccom, setDataItemAccom] = useState(null);
  // useEffect(() => {
  //   setValue('policy', JSON.stringify(policy));
  // }, [policy]);
  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('policy_manage'),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigate('PostNewsScreen')}>
          <IconHome style={{width: scale(20)}} />
        </TouchableOpacity>
      ),
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {data, isLoading, error} = useQuery({
    queryKey: ['accommodation', 'list-policy', params?.accommodation_id],
    queryFn: () =>
      getListPolicy({
        accommodation_id: params?.accommodation_id,
      }),
  });

  const createAddPolicyToRoom = useMutation({
    mutationFn: postPolicyToRoom,
  });
  const LinkPolicy = value => {
    if (value?.length === 0) {
      showMess('Chọn ít nhất một chính sách để tiếp tục', 'error');
      return;
    }

    createAddPolicyToRoom.mutate(
      {
        array_policy_id: value,
        room_id: params?.roomId,
        is_add: 1,
      },
      {
        onSuccess: dataInside => {
          if (dataInside?.status) {
            queryClient.invalidateQueries([
              'accommodation',
              'list-policy',
              params?.accommodation_id,
              params?.id,
            ]);
            goBack();
          }
          console.log({dataInside}, 132);
        },
        onError: err => {
          console.log({err});
        },
      },
    );
  };

  return (
    <MainWrapper>
      <View style={{marginTop: scale(30), paddingHorizontal: scale(10)}}>
        <View
          style={{
            borderWidth: scale(1),
            borderColor: COLORS.primary,
            marginVertical: scale(10),
            borderRadius: scale(10),
            backgroundColor: '#FFFFFF99',
          }}>
          <View
            style={{
              borderBottomWidth: scale(1),
              padding: scale(10),
              borderRadius: scale(10),
              borderColor: COLORS.primary,
              backgroundColor: COLORS.subPrimary,
            }}>
            <CustomText
              textType="semiBold"
              style={{
                alignSelf: 'center',
                fontSize: SIZES.medium,
              }}>
              {t('list_policies')}
            </CustomText>
          </View>
          <FlatList
            // key={`accommodation/my-list-1-${page}_${data?.data?.count}_${numColumns}`}
            data={data?.data?.rows}
            // numColumns={numColumns}

            keyExtractor={(item, index) => `$key_${item.id}-policy-${index}`}
            // columnWrapperStyle={
            //   numColumns >= 2 && {
            //     columnGap: scale(10),
            //   }
            // }
            contentContainerStyle={{
              marginTop: scale(10),
              borderRadius: 10,
              borderWidth: 1,
              borderColor: COLORS.primary,
              margin: scale(15),
              overflow: 'hidden',
            }}
            renderItem={({item, index}) => {
              return (
                <View
                  //   onPress={() => navigate('AddPolicyScreen')}
                  key={`$key_${item.id}-policy-${index}`}
                  style={{
                    height: scale(35),
                    backgroundColor: index % 2 ? COLORS.subPrimary : '#fefae0',
                    borderColor: COLORS.primary,
                    borderTopWidth: !index === 0 && 1,

                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    paddingHorizontal: scale(10),
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {params?.PolicyToRoom && (
                      <CheckBox
                        key={index}
                        textBold
                        isRadio
                        style={{height: scale(20)}}
                        onPress={evt => {
                          policyCheckBox(item?.id);
                        }}
                        isChecked={policy?.includes(item?.id)}
                        textStyle={{
                          fontSize: SIZES.xMedium,
                        }}
                      />
                    )}

                    <CustomText>{item?.name}</CustomText>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      columnGap: scale(10),
                    }}>
                    <TouchableOpacity
                      style={{
                        borderColor: COLORS.primary,

                        borderLeftWidth: scale(1),
                        borderRightWidth: scale(1),
                      }}
                      onPress={() => {
                        setDataItemAccom(item);
                        bottomSheetRef.current.open();
                      }}>
                      <IconTrash />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
                      <CustomText>{t('detail')}</CustomText>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
          <TouchableOpacity
            style={{
              alignItems: 'center',
              marginBottom: scale(10),
              color: COLORS.primary,
            }}
            activeOpacity={0.7}
            onPress={() =>
              navigate('AddPolicyScreen', {
                ...params,
                admin: true,
              })
            }>
            <CustomText style={{color: COLORS.primary}}>
              {t('create_new_policy')}
            </CustomText>
          </TouchableOpacity>
        </View>
        {params?.PolicyToRoom && (
          <View style={{alignItems: 'center', marginTop: scale(30)}}>
            <CustomButton
              text={t('confirm')}
              style={{width: '50%'}}
              onPress={() => {
                LinkPolicy(policy);
              }}
            />
          </View>
        )}

        <BottomSheet
          ref={bottomSheetRef}
          titleIndicator={'Operation'}
          snapPoints={['30%']}
          disableScroll
          styleContent={styles.bottomSheet}>
          <DeletePolicy
            data={dataItemAccom}
            onSuccess={() => {
              bottomSheetRef.current.close();
              setDataItemAccom(null);
            }}
            onCancel={() => {
              bottomSheetRef.current.close();
              setDataItemAccom(null);
            }}
          />
        </BottomSheet>
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});

import {useNavigation, useRoute} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import React, {useLayoutEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {getListPolicy} from '../../../../../../../Model/api/apiAccom';
import {COLORS, SIZES, scale} from '../../../../../../../assets/constants';
import {IconHome, IconTrash} from '../../../../../../../assets/icon/Icon';
import {CustomButton} from '../../../../../../../components';
import BottomSheet from '../../../../../../../components/BottomSheet';
import CustomText from '../../../../../../../components/CustomText';
import DeletePolicy from './DeletePolicy';
import {useLanguage} from '../../../../../../../hooks/useLanguage';
import MainWrapper from '../../../../../../../components/MainWrapper';

export default function PolicyManageScreen() {
  const params = useRoute().params;
  const {t} = useLanguage();

  const {setOptions, navigate} = useNavigation();
  const bottomSheetRef = useRef();
  const [dataItemAccom, setDataItemAccom] = useState(null);

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
    queryKey: ['accommodation', 'list-policy', params?.id],
    queryFn: () =>
      getListPolicy({
        accommodation_id: params?.id,
      }),
  });

  return (
    <MainWrapper>
      <View style={{marginTop: scale(30)}}>
        <CustomText
          textType="semiBold"
          style={{
            alignSelf: 'center',
            fontSize: SIZES.large,
            color: COLORS.white,
          }}>
          {t('list_policies')}
        </CustomText>
        <FlatList
          // key={`accommodation/my-list-1-${page}_${data?.data?.count}_${numColumns}`}
          data={data?.data?.rows}
          // numColumns={numColumns}
          alwaysBounceVertical={false}
          directionalLockEnabled={true}
          keyExtractor={(item, index) => `$key_${item.id}-policy-${index}`}
          // columnWrapperStyle={
          //   numColumns >= 2 && {
          //     columnGap: scale(10),
          //   }
          // }
          contentContainerStyle={{
            paddingHorizontal: scale(20),
            rowGap: scale(10),
            marginTop: scale(10),
          }}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                //   onPress={() => navigate('AddPolicyScreen')}
                key={`$key_${item.id}-policy-${index}`}
                style={{
                  backgroundColor: COLORS.green,
                  borderRadius: scale(10),
                  height: scale(30),
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  paddingHorizontal: scale(30),
                }}>
                <CustomText style={{color: COLORS.white}}>
                  {item?.name}
                </CustomText>
                <TouchableOpacity
                  onPress={() => {
                    setDataItemAccom(item);
                    bottomSheetRef.current.open();
                  }}>
                  <IconTrash />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          }}
        />
        <View style={{alignItems: 'center', marginTop: scale(30)}}>
          <CustomButton
            text={t('add_more_policy')}
            style={{width: '50%'}}
            onPress={() =>
              navigate('AddPolicyScreen', {
                id: params?.id,
                policyScreen: true,
              })
            }
          />

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
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});

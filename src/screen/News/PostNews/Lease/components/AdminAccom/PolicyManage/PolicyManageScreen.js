import {useNavigation, useRoute} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import React, {useLayoutEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {getListPolicy} from '../../../../../../../Model/api/apiAccom';
import {COLORS, SIZES, scale} from '../../../../../../../assets/constants';
import {IconTrash} from '../../../../../../../assets/icon/Icon';
import {CustomButton} from '../../../../../../../components';
import BottomSheet from '../../../../../../../components/BottomSheet';
import CustomText from '../../../../../../../components/CustomText';
import DeletePolicy from './DeletePolicy';

export default function PolicyManageScreen() {
  const params = useRoute().params;
  const {setOptions, navigate} = useNavigation();
  const bottomSheetRef = useRef();
  const [dataItemAccom, setDataItemAccom] = useState(null);

  useLayoutEffect(() => {
    return setOptions({
      headerTitle: 'Quản lý chính sách',
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
    <View style={{marginTop: scale(30)}}>
      <CustomText
        textType="semiBold"
        style={{alignSelf: 'center', fontSize: SIZES.large}}>
        Danh sách các chính sách
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
                backgroundColor: COLORS.primary,
                borderRadius: scale(10),
                height: scale(30),
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingHorizontal: scale(30),
              }}>
              <CustomText>{item?.name}</CustomText>
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
          text="Add more policy"
          style={{width: '50%'}}
          onPress={() =>
            navigate('AddPolicyScreen', {
              id: params?.id,
              policyScreen: true,
            })
          }
        />
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        titleIndicator={'Thao Tác'}
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
  );
}

const styles = StyleSheet.create({});

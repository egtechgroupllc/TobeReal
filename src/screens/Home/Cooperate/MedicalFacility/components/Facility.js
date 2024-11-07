import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {Button, CImage, CText} from '~/components';
import {scale} from '~/utils/scale';
import {COLORS, SIZES} from '~/assets/constants';
import EmptyData from '~/components/EmptyData';
import {useNavigation} from '@react-navigation/native';
import {
  IconEditProfile,
  IconEmail,
  IconLocation,
  IconPhone,
  IconTrash,
} from '~/assets/icon/Icon';
import {IconEdit} from '@tabler/icons-react-native';
import FacilityItem from './FacilityItem';
import BottomSheet from '~/components/BottomSheet';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {
  getListMedicalFacilityUser,
  postDeleteMedicalFacility,
} from '~/api/common';
import {showMess} from '~/assets/constants/Helper';
import {useLanguage} from '~/hooks/useLanguage';

export default function Facility({data}) {
  const {navigate} = useNavigation();
  const bottomSheetRef = useRef();
  const [selectedId, setSelectedId] = useState(null);
  const deleteMedicalFacilityMutation = useMutation({
    mutationFn: postDeleteMedicalFacility,
  });
  const {t} = useLanguage();
  const queryClient = useQueryClient();

  const handleDelete = () => {
    deleteMedicalFacilityMutation.mutate(
      {id: selectedId},
      {
        onSuccess: dataInside => {
          showMess(
            t(dataInside?.message),
            dataInside?.error ? 'error' : 'success',
          );
          if (!dataInside?.error) {
            bottomSheetRef.current.close();
            queryClient.invalidateQueries([
              ...getListMedicalFacilityUser.queryKey,
            ]);
          }
        },
        onError: err => {
          if (err.response) {
            showMess(err?.response?.data?.message, 'error');
          }
        },
      },
    );
  };

  return (
    <View style={{rowGap: scale(10), flex: 1}}>
      <View style={{rowGap: scale(10)}}>
        <CText
          style={{
            color: COLORS.White,
            fontSize: SIZES.medium,
          }}>
          {t('list_medical_facility_registed')}
        </CText>
        <View
          style={{
            backgroundColor: COLORS.White,
            width: '100%',
            height: scale(1),
          }}
        />
      </View>
      <FlatList
        data={data}
        keyExtractor={(_, index) => `key-list-history${index}`}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyData />}
        contentContainerStyle={{rowGap: scale(10)}}
        renderItem={({item}) => {
          return (
            <FacilityItem
              data={item}
              onPress={() => {
                bottomSheetRef.current.open();
                setSelectedId(item?.id);
              }}
            />
          );
        }}
      />
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={['30%', '50%']}
        titleIndicator={t('remove_medical_facility')}
        styleContent={{
          paddingHorizontal: scale(16),
          rowGap: scale(30),
        }}>
        <View style={{rowGap: scale(10)}}>
          <View
            style={{
              backgroundColor: COLORS.input,
              height: scale(40),
              width: '100%',
              borderRadius: scale(10),
              justifyContent: 'center',
              paddingHorizontal: scale(10),
            }}>
            <CText
              style={{fontSize: SIZES.small, color: COLORS.White}}
              textType="semiBold">
              {t('medical_facility_id')}: 1
            </CText>
          </View>
          <CText style={{color: 'red'}} textType="regular">
            {t('are_you_sure_you_want_to_remove_this_medical_facility')} {'\n'}
            {t('this_action_cannot_be_undone')}
          </CText>
          <View style={{width: '40%', alignSelf: 'flex-end'}}>
            <Button
              title={t('remove')}
              onPress={handleDelete}
              linearGradientProps={{colors: COLORS.linearButton}}
            />
          </View>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({});

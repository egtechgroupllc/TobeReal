import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {MainWrapper} from '~/components';
import {images} from '~/assets/constants';
import AppointItem from '~/screens/Appointment/User/components/AppointItem';
import {scale} from '~/utils/scale';
import FilterSpecialty from './components/FilterSpecialty';
import {useForm} from 'react-hook-form';
import EmptyData from '~/components/EmptyData';
import {getDetailDoctorSpecialty} from '~/api/common';
import {useRoute} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {useLanguage} from '~/hooks/useLanguage';

export default function DetailSpecialtyScreen() {
  const {watch, setValue} = useForm();
  const params = useRoute().params;
  const {data, isLoading, error} = useQuery({
    queryKey: [...getDetailDoctorSpecialty.queryKey, {id: params?.id}],
    queryFn: () => getDetailDoctorSpecialty({id: params?.id}),
  });
  const {t} = useLanguage();
  return (
    <MainWrapper
      sourceImage={images.backgroundHome}
      headerTitle={t('specialty')}
      scrollEnabled={false}>
      <View
        style={{
          flex: 1,
          paddingTop: scale(15),
          rowGap: scale(15),
        }}>
        <FilterSpecialty watch={watch} setValue={setValue} />
        <FlatList
          data={data?.data?.doctors}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => `key-list-doctor-appointment${index}`}
          ListEmptyComponent={<EmptyData />}
          contentContainerStyle={{
            rowGap: scale(20),
            paddingBottom: scale(100),
            paddingHorizontal: scale(15),
          }}
          renderItem={({item, index}) => {
            return <AppointItem data={item} isLoading={isLoading} />;
          }}
        />
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});

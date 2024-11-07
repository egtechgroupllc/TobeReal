import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, MainWrapper} from '~/components';
import {images} from '~/assets/constants';
import ButtonTabValidate from '~/components/ChoosePhoto/ButtonTabValidate';
import {useLanguage} from '~/hooks/useLanguage';
import {useNavigation} from '@react-navigation/native';
import {scale} from '~/utils/scale';
import FacilityItem from './components/Facility';
import Facility from './components/Facility';
import {IconHome} from '~/assets/icon/Icon';
import {getListMedicalFacilityUser} from '~/api/common';
import {useQuery} from '@tanstack/react-query';

export default function ManageFacilityScreen() {
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  const {data, isLoading, error} = useQuery({
    queryKey: [...getListMedicalFacilityUser.queryKey],
    queryFn: () => getListMedicalFacilityUser(),
  });

  return (
    <MainWrapper
      sourceImage={images.backgroundHome}
      scrollEnabled={false}
      optionsHeader={{
        headerStyle: {
          paddingBottom: 0,
        },
        headerRight: () => {
          return (
            <Button.Icon
              Icon={IconHome}
              onPress={() => {
                navigate('BottomTab');
              }}
            />
          );
        },
      }}
      headerTitle={t('manage_medical_facility')}>
      <View
        style={{
          paddingHorizontal: scale(20),
          rowGap: scale(10),
          marginTop: scale(20),
          flex: 1,
        }}>
        <ButtonTabValidate
          title={t('create_medical_facility')}
          onPress={() => navigate('CreateMedicalFacilityScreen')}
        />
        <Facility data={data?.data?.rows} />
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});

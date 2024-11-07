import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Button, CText, MainWrapper} from '~/components';
import {COLORS, images, SIZES} from '~/assets/constants';
import ButtonTabValidate from '~/components/ChoosePhoto/ButtonTabValidate';
import {useLanguage} from '~/hooks/useLanguage';
import {useNavigation} from '@react-navigation/native';
import {scale} from '~/utils/scale';
import AppointmentHeader from '~/components/AppointmentHeader/AppointmentHeader';
import {colors} from '@styles';
import EmptyData from '~/components/EmptyData';
import {IconEmail, IconLocation, IconPhone} from '~/assets/icon/Icon';
import CooperateItem from './components/CooperateItem';
import {getListContactCooperate} from '~/api/common';
import {useQuery} from '@tanstack/react-query';

export default function ManageCooperateScreen() {
  const {t} = useLanguage();
  const [isView, setView] = useState(false);
  const {navigate} = useNavigation();
  const {data, isLoading, error} = useQuery({
    queryKey: [...getListContactCooperate.queryKey],
    queryFn: () => getListContactCooperate(),
  });

  return (
    <MainWrapper
      sourceImage={images.backgroundHome}
      headerTitle={t('manage_cooperate_medical_facility')}
      scrollEnabled={false}
      optionsHeader={{
        headerTitleStyle: {
          textAlign: 'left',
        },
        headerStyle: {
          paddingBottom: 0,
        },
      }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: scale(20),
          marginTop: scale(20),
          rowGap: scale(10),
        }}>
        <ButtonTabValidate
          title={t('cooperate_register')}
          onPress={() => navigate('CooperateRegisterScreen')}
        />
        <CooperateItem data={data?.data?.rows} />
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});

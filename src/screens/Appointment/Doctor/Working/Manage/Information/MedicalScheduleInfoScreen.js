import {Alert, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {MainWrapper} from '~/components';
import {images} from '~/assets/constants';
import TopContent from '~/screens/Appointment/User/Schedule/components/TopContent';
import {scale} from '~/utils/scale';
import Scheldule from '~/screens/Appointment/User/Schedule/components/Scheldule';
import Location from '~/screens/Appointment/User/Schedule/components/Location';
import {useLanguage} from '~/hooks/useLanguage';

export default function MedicalScheduleInfoScreen() {
  const {t} = useLanguage();
  const handleAlert = () => {
    Alert.alert(
      t('are_you_sure_want_to_delete_time_marker'),
      t('time_marker_cant_be_restored'),
      [
        {
          text: t('cancel'),
          // onPress: () => Alert.alert('Cancel Pressed'),
          style: 'cancel',
        },
        {text: t('ok'), onPress: () => {}},
      ],
    );
  };
  return (
    <MainWrapper
      scrollEnabled={false}
      sourceImage={images.backgroundHome}
      headerTitle={'Medical schedule information'}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: scale(20),
          rowGap: scale(20),
          marginTop: scale(20),
        }}>
        <TopContent />
        <Scheldule isDoctor onPressCancel={() => handleAlert()} />
        <Location />
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});

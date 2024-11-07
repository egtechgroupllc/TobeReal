import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {CImage, CText, MainWrapper} from '~/components';
import {animations, COLORS, images, SIZES} from '~/assets/constants';
import {useNavigation, useRoute} from '@react-navigation/native';
import {scale} from '~/utils/scale';
import TopContent from './components/TopContent';
import Scheldule from './components/Scheldule';
import Location from './components/Location';
import BotContent from './components/BotContent';
import ListReview from './components/ListReview';
import {IconHome} from '~/assets/icon/Icon';
import {useQuery} from '@tanstack/react-query';
import {getDetailDoctor} from '~/api/doctor';
import MedicalSpecialty from '~/screens/Home/DetailMedical/components/MedicalSpecialty';
import {useLanguage} from '~/hooks/useLanguage';
import AnimatedLottieView from 'lottie-react-native';

export default function DetailScheduleScreen() {
  const {t} = useLanguage();
  const params = useRoute().params;
  const {navigate} = useNavigation();

  const {data, isLoading} = useQuery({
    queryKey: [...getDetailDoctor.queryKey, {id: params?.id}],
    queryFn: () => getDetailDoctor({id: params?.id}),
  });

  return (
    <MainWrapper
      refreshControl
      optionsHeader={{
        headerRight: () => (
          <TouchableOpacity onPress={() => navigate('BottomTab')}>
            <IconHome style={{width: scale(20)}} />
          </TouchableOpacity>
        ),
      }}
      sourceImage={images.backgroundHome}
      styleContent={{padding: scale(20)}}
      headerTitle={t('detail_schedule')}>
      <View style={{...styles.contain, opacity: isLoading ? 0.2 : 1}}>
        <TopContent data={data?.data} />
        <CText
          style={{fontSize: SIZES.large, color: COLORS.White}}
          textType="bold">
          {t('medical_specialty')}
        </CText>
        <MedicalSpecialty
          data={data?.data?.specialties}
          isLoading={isLoading}
        />
        <Scheldule data={data?.data} />
        <Location data={data?.data} />
        <View style={styles.line} />
        <ListReview data={data?.data} />
        <View style={styles.line} />
        <BotContent data={data?.data} />
      </View>
      {isLoading && (
        <View
          style={{
            flex: 1,
            position: 'absolute',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            paddingTop: scale(200),
            alignSelf: 'center',
          }}>
          <AnimatedLottieView
            source={animations.medicalLoading}
            autoPlay
            loop
            style={{
              width: scale(250),
              height: scale(250),
            }}
          />
        </View>
      )}
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    rowGap: scale(20),
  },
  line: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#ccc',
    margin: -1,
    marginBottom: 0,
    overflow: 'hidden',
  },
});

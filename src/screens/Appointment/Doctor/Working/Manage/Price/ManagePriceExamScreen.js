import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, MainWrapper} from '~/components';
import {COLORS, images} from '~/assets/constants';
import AppointmentHeader from '~/components/AppointmentHeader/AppointmentHeader';
import PriceItem from './components/PriceExamination';
import {IconHome} from '~/assets/icon/Icon';
import {useNavigation} from '@react-navigation/native';
import PriceExamination from './components/PriceExamination';
import {useLanguage} from '~/hooks/useLanguage';

export default function ManagePriceExamScreen() {
  const {navigate} = useNavigation();
  const {t} = useLanguage();
  return (
    <MainWrapper
      sourceImage={images.backgroundHome}
      headerTitle={t('manage_price_examination')}
      optionsHeader={{
        headerTitleStyle: {
          textAlign: 'left',
        },
        headerStyle: {
          paddingBottom: 0,
        },
        headerRight: () => {
          return (
            <Button.Icon
              Icon={IconHome}
              color={COLORS.White}
              onPress={() => navigate('BottomTab')}
            />
          );
        },
      }}>
      <View style={{flex: 1}}>
        <PriceExamination />
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});

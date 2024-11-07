import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {MainWrapper} from '~/components';
import {images} from '~/assets/constants';
import {scale} from '~/utils/scale';
import ButtonTabValidate from '~/components/ChoosePhoto/ButtonTabValidate';
import {useLanguage} from '~/hooks/useLanguage';
import {useNavigation} from '@react-navigation/native';

export default function CooperateShopManage() {
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  return (
    <MainWrapper
      scrollEnabled={false}
      sourceImage={images.backgroundHome}
      headerTitle={'Cooperate Shop Manage'}>
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: scale(15),
            rowGap: scale(20),
            marginTop: scale(20),
          }}>
          <ButtonTabValidate
            title={t('Cooperate shop register')}
            onPress={() => navigate('ShopRegisterScreen')}
          />
          <ButtonTabValidate
            title={t('Product manage')}
            onPress={() => navigate('CreateMedicalFacilityScreen')}
          />
        </View>
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});

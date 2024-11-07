import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, CText, MainWrapper} from '~/components';
import {COLORS, images, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';
import EmptyData from '~/components/EmptyData';
import {formatPrice} from '~/utils/format';
import {useNavigation, useRoute} from '@react-navigation/native';
import ServicePriceItem from './components/ServicePriceItem';
import {useLanguage} from '~/hooks/useLanguage';

export default function ManageServicePrice() {
  const {navigate} = useNavigation();
  const params = useRoute().params;
  const {t} = useLanguage();
  return (
    <MainWrapper
      scrollEnabled={false}
      sourceImage={images.backgroundHome}
      headerTitle={t('manage_service_price')}>
      <View
        style={{
          rowGap: scale(20),
          paddingHorizontal: scale(20),
          paddingTop: scale(20),
        }}>
        <CText
          style={{color: COLORS.White, fontSize: SIZES.medium}}
          textType="semiBold'">
          {t('related_service_prices')}
        </CText>
        <FlatList
          data={params?.parent}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => `key-list-doctor-appointment${index}`}
          ListEmptyComponent={<EmptyData />}
          contentContainerStyle={{
            rowGap: scale(20),
          }}
          renderItem={({item, index}) => {
            return <ServicePriceItem data={item} />;
          }}
        />
        <Button
          title={t('add_more_price')}
          linearGradientProps={{colors: COLORS.linearButton}}
          onPress={() => navigate('AddServicePriceScreen', params)}
        />
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});

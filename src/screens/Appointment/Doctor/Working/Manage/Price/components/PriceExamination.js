import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, images, SIZES} from '~/assets/constants';
import EmptyData from '~/components/EmptyData';
import {scale} from '~/utils/scale';
import {Button, CImage, CText} from '~/components';
import {
  IconCalendar,
  IconClock,
  IconEditProfile,
  IconLocation,
  IconPhone,
  IconTrash,
} from '~/assets/icon/Icon';
import {formatPrice} from '~/utils/format';
import {useNavigation} from '@react-navigation/native';
import {IconEdit} from '@tabler/icons-react-native';
import {useQuery} from '@tanstack/react-query';
import {getExaminationPrice} from '~/api/doctor';
import PriceItem from './PriceItem';
import {useLanguage} from '~/hooks/useLanguage';
const fake = [
  {
    name: 'Khám tổng quát',
    price: 10000,
    des: 'Giá khám chưa bao gồm chi phí chụp chiếu xét nghiệm',
  },
];

export default function PriceExamination({onPress}) {
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  const {data, isLoading} = useQuery({
    queryKey: [...getExaminationPrice.queryKey],
    queryFn: () => getExaminationPrice(),
  });
  return (
    <View style={{rowGap: scale(10), paddingHorizontal: scale(20)}}>
      <CText
        style={{color: COLORS.White, fontSize: SIZES.large}}
        textType="semiBold'">
        {t('price_examination')}
      </CText>
      <FlatList
        data={data?.data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => `key-list-doctor-appointment${index}`}
        ListEmptyComponent={<EmptyData />}
        contentContainerStyle={{
          rowGap: scale(20),
        }}
        renderItem={({item, index}) => {
          return <PriceItem data={item} />;
        }}
      />

      <Button
        title={t('add_more_price')}
        linearGradientProps={{colors: COLORS.linearButton}}
        onPress={() => navigate('AddPriceExamScreen')}
        style={{marginTop: scale(20)}}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

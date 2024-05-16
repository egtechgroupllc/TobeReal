import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WrapperContent from '../../WrapperContent';
import BoxPlaceItem from '../../ContentAccommodation/BoxPlaceItem';
import {useLanguage} from '../../../../../hooks/useLanguage';
import {getListRent} from '../../../../../Model/api/apiAccom';
import {formatDate} from '../../../../../utils/format';
import {useQuery} from '@tanstack/react-query';
import {scale} from '../../../../../assets/constants';
import {useCountry} from '../../../../../hooks/useCountry';

export default function SimilarApartmentsNearby() {
  const {t} = useLanguage();
  const {currency} = useCountry();
  const {data, isLoading, isError, error} = useQuery({
    queryKey: [
      'accommodation',
      'list-rent',
      {
        accommodation_type_id: 1,
        country_id: 241,
        currency_id: currency?.id,
        // province_id: 1,
      },
    ],
    queryFn: () =>
      getListRent({
        date_end: formatDate(new Date(), {addDays: 14}),
        date_start: formatDate(new Date(), {addDays: 2}),
        country_id: 241,
        currency_id: currency?.id,
        // province_id: 1,
      }),
  });
  return (
    <WrapperContent heading={t('browse_similar')}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data?.data?.rows?.slice(0, 9)}
        contentContainerStyle={styles.content}
        renderItem={({item, index}) => (
          <BoxPlaceItem
            data={item}
            key={`key-${item}-${index}`}
            seeViewNumber={1.5}
            rating={4}
            textRating={index % 2 !== 0 && 'New'}
            isHeart
            isStar
            isViewMap
          />
        )}
      />
    </WrapperContent>
  );
}

const styles = StyleSheet.create({
  content: {
    columnGap: scale(14),
    paddingVertical: scale(6),
    paddingHorizontal: scale(16),
  },
});

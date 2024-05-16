import {StyleSheet, Text, FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import WrapperContent from '../WrapperContent';
import BoxPlaceItem from './BoxPlaceItem';
import {useLanguage} from '../../../../hooks/useLanguage';
import {scale} from '../../../../assets/constants';
import InViewPort from '../../../../components/InViewport';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getListRent} from '../../../../Model/api/apiAccom';
import {formatDate} from '../../../../utils/format';
import {useQuery} from '@tanstack/react-query';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useCountry} from '../../../../hooks/useCountry';

export default function AccommodationPremium({currency}) {
  const {t} = useLanguage();
  const [isRender, setIsRender] = useState(false);
  const title = [t('Popular in the area')];
  const {navigate} = useNavigation();
  const {country} = useCountry();

  const {data, isLoading, isError, error} = useQuery({
    queryKey: [
      'accommodation',
      'list-rent',
      {
        accommodation_type_id: 1,
        country_id: country?.id,
        currency_id: currency?.id,
      },
    ],
    queryFn: () =>
      getListRent({
        date_end: formatDate(new Date(), {addDays: 1}),
        date_start: formatDate(),
        // date_end: formatDate(new Date(), {addDays: 14}),
        // date_start: formatDate(new Date(), {addDays: 2}),
        country_id: country?.id,
        currency_id: currency?.id,
      }),
  });

  if (!(data?.data?.count !== 0)) return null;
  return (
    <InViewPort onChange={render => render && setIsRender(render)} delay={160}>
      {isRender && (
        <WrapperContent
          // isSeeAll
          // onPressSeeAll={() =>
          //   navigate('NoBottomTab', {
          //     screen: 'SeeAllRentScreen',
          //     params: {
          //       title: title || '',
          //     },
          //   })
          // }
          heading={title}
          subHeading={t('Find popular accomodation in your area')}
          styleWrapper={{backgroundColor: '#f8eede'}}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data?.data?.rows?.slice(0, 9)}
            contentContainerStyle={styles.content}
            renderItem={({item}) => (
              <BoxPlaceItem
                isHeart
                isDiscount
                isStar
                isRating
                rating={3}
                data={item}
                seeViewNumber={1.6}
                isViewMap
              />
            )}
          />
        </WrapperContent>
      )}
    </InViewPort>
  );
}

const styles = StyleSheet.create({
  content: {
    columnGap: scale(14),
    paddingVertical: scale(6),
    paddingHorizontal: scale(16),
  },
});

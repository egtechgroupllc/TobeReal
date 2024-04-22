import {StyleSheet, Text, FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import WrapperContent from '../WrapperContent';
import BoxPlaceItem from './BoxPlaceItem';
import {useLanguage} from '../../../../hooks/useLanguage';
import {scale} from '../../../../assets/constants';
import InViewPort from '../../../../components/InViewport';
import {useNavigation} from '@react-navigation/native';
import {getListRent} from '../../../../Model/api/apiAccom';
import {formatDate} from '../../../../utils/format';
import {useQuery} from '@tanstack/react-query';

export default function AccommodationPremium() {
  const {t} = useLanguage();
  const [isRender, setIsRender] = useState(false);
  const title = [t('saveloka_premium')];
  const {navigate} = useNavigation();
  const {data, isLoading, isError, error} = useQuery({
    queryKey: [
      'accommodation',
      'list-rent',
      {
        accommodation_type_id: 1,
        country_id: 241,
      },
    ],
    queryFn: () =>
      getListRent({
        date_end: formatDate(new Date(), {addDays: 1}),
        date_start: formatDate(),
        country_id: 241,
      }),
  });
  return (
    <InViewPort onChange={render => render && setIsRender(render)} delay={160}>
      {isRender && (
        <WrapperContent
          isSeeAll
          onPressSeeAll={() =>
            navigate('NoBottomTab', {
              screen: 'SeeAllRentScreen',
              params: {
                title: title || '',
              },
            })
          }
          heading={title}
          subHeading={t('selected_premium')}
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
                data={item}
                rental="night"
                jsonImage={item?.imgdetail}
                name={item?.name}
                price={item?.price}
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

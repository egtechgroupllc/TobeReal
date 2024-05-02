import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useLanguage} from '../../../../hooks/useLanguage';
import WrapperContent from '../WrapperContent';
import BoxPlaceItem from './BoxPlaceItem';
import InViewPort from '../../../../components/InViewport';
import {scale} from '../../../../assets/constants';
import {useNavigation} from '@react-navigation/native';
import {getListRent} from '../../../../Model/api/apiAccom';
import {formatDate} from '../../../../utils/format';
import {useQuery} from '@tanstack/react-query';
import {getListCountry} from '../../../../Model/api/common';

export default function FindBest() {
  const {t} = useLanguage();
  const [isRender, setIsRender] = useState(false);
  const title = [t('find_best')];
  const {navigate} = useNavigation();
  const [filter, setFilter] = useState();
  const {data, isLoading, isError, error} = useQuery({
    queryKey: [
      'accommodation',
      'list-rent',
      {
        accommodation_type_id: 1,
        province_id: filter?.id,
        country_id: 241,
      },
    ],
    queryFn: () =>
      getListRent({
        date_end: formatDate(new Date(), {addDays: 1}),
        date_start: formatDate(),
        country_id: 241,
        province_id: filter?.id,
      }),
  });
  const listCountry = useQuery({
    queryKey: ['common', 'list-country', 1562822],
    queryFn: () => getListCountry(1562822),
  });
  useEffect(() => {
    setFilter(listCountry.data?.data?.[0]);
  }, [listCountry.data?.data]);
  return (
    <InViewPort onChange={render => render && setIsRender(render)} delay={130}>
      {isRender && (
        <WrapperContent
          isSeeAll
          isCategory
          dataCategory={listCountry.data?.data?.slice(0, 9)}
          onPressSeeAll={() =>
            navigate('NoBottomTab', {
              screen: 'SeeAllRentScreen',
              params: {
                title: title || '',
              },
            })
          }
          onPressCategory={item => setFilter(item)}
          heading={title}
          subHeading={t('disc_upto') + ` 30%!`}
          styleWrapper={{backgroundColor: '#91F2FF'}}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data?.data?.rows}
            contentContainerStyle={styles.content}
            renderItem={({item}) => (
              <BoxPlaceItem
                isHeart
                isDiscount
                isStar
                rating={5}
                data={item}
                rental="night"
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

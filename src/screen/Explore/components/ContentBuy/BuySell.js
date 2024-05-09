import {StyleSheet, Text, FlatList, View} from 'react-native';
import React, {useState} from 'react';

import {formatPrice} from '../../../../utils/format';

import InViewPort from '../../../../components/InViewport';
import {useLanguage} from '../../../../hooks/useLanguage';
import {images, scale} from '../../../../assets/constants';
import BoxPlaceItem from './BoxPlaceItem';
import WrapperContent from '../WrapperContent';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {getListSell} from '../../../../Model/api/apiEstate';

export default function BuySell({data}) {
  const {t} = useLanguage();
  const [isRender, setIsRender] = useState(false);
  const {navigate} = useNavigation();
  const title = [t('Recently viewed')];

  // const {data, isLoading, isError, error} = useQuery({
  //   queryKey: [
  //     'estate',
  //     'list-post',
  //     {
  //       estate_type_id: 1,
  //       country_id: 241,
  //     },
  //   ],
  //   queryFn: () => getListSell({country_id: 241}),
  // });
  return (
    <InViewPort onChange={render => render && setIsRender(render)} delay={70}>
      {isRender && (
        <WrapperContent
          isSeeAll
          onPressSeeAll={() =>
            navigate('NoBottomTab', {
              screen: 'SeeAllBuyScreen',
              params: {
                title: title || '',
              },
            })
          }
          onPressCategory={item => console.log(item)}
          heading={title}
          subHeading={t('There are 1,000,000 Real Estate')}
          styleWrapper={{backgroundColor: 'transparent'}}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data}
            contentContainerStyle={styles.content}
            renderItem={({item}) => (
              <BoxPlaceItem
                isHeart
                isStar
                textRating={2}
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

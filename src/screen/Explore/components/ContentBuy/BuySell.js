import {StyleSheet, Text, FlatList, View} from 'react-native';
import React, {useState} from 'react';

import {formatPrice} from '../../../../utils/format';

import InViewPort from '../../../../components/InViewport';
import {useLanguage} from '../../../../hooks/useLanguage';
import {SHADOW, images, scale} from '../../../../assets/constants';
import BoxPlaceItem from './BoxPlaceItem';
import WrapperContent from '../WrapperContent';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {getListSell} from '../../../../Model/api/apiEstate';
import InViewport from '../../../../components/InViewport';
import BoxPlaceItemLoading from './BoxPlaceItem/BoxPlaceItemLoading';

export default function BuySell({data}) {
  const {t} = useLanguage();
  const [isRender, setIsRender] = useState(false);
  const {navigate} = useNavigation();
  const title = [t('recent_view')];

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
    <InViewport
      delay={40}
      loadingMap
      ComponentLoading={
        <BoxPlaceItemLoading
          style={[
            styles.wrapper,
            {
              width: scale(400 / 1.6),
            },
            SHADOW,
          ]}
        />
      }>
      <WrapperContent
        // isSeeAll
        onPressSeeAll={() =>
          navigate('NoBottomTab', {
            screen: 'SeeAllBuyScreen',
            params: {
              title: title || '',
            },
          })
        }
        // onPressCategory={item => console.log(item)}
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
    </InViewport>
  );
}

const styles = StyleSheet.create({
  content: {
    columnGap: scale(14),
    paddingVertical: scale(6),
    paddingHorizontal: scale(16),
  },
});

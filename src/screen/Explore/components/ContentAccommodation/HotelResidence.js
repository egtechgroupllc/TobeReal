import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import BoxPlaceItem from './BoxPlaceItem';
import WrapperContent from '../WrapperContent';
import {useLanguage} from '../../../../hooks/useLanguage';
import {images, scale} from '../../../../assets/constants';
import InViewPort from '../../../../components/InViewport';
import {useQuery} from '@tanstack/react-query';
import {getListRent} from '../../../../Model/api/apiAccom';
import {formatDate} from '../../../../utils/format';
import {useNavigation} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';

export default function HotelResidence({data}) {
  const {t} = useLanguage();
  const [isRender, setIsRender] = useState(false);
  const {navigate} = useNavigation();

  // const {data, isLoading, isError, error} = useQuery({
  //   queryKey: [
  //     'accommodation',
  //     'list-rent',
  //     {
  //       accommodation_type_id: 1,
  //       country_id: 241,
  //       // province_id: 1,
  //     },
  //   ],
  //   queryFn: () =>
  //     getListRent({
  //       date_end: formatDate(new Date(), {addDays: 1}),
  //       date_start: formatDate(),
  //       country_id: 241,

  //       // province_id: 1,
  //     }),
  // });
  const title = [t('Recently viewed')];
  return (
    <InViewPort onChange={render => render && setIsRender(render)} delay={30}>
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
          subHeading={t('seamless_living')}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data}
            contentContainerStyle={styles.content}
            renderItem={({item, index}) => (
              <BoxPlaceItem
                key={index}
                seeViewNumber={1.6}
                isViewMap
                isStar
                isRating
                isDiscount
                // rating={2}
                isHeart
                data={item}
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

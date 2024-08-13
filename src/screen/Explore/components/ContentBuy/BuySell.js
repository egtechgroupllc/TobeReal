import {StyleSheet, Text, FlatList, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';

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
import EncryptedStorage from 'react-native-encrypted-storage';
import BoxPlaceItemLoading from '../ContentAccommodation/BoxPlaceItem/BoxPlaceItemLoading';

export default function BuySell({data, isLoading, country}) {
  const {t} = useLanguage();
  const [isRender, setIsRender] = useState(false);
  const {navigate} = useNavigation();
  const [listSavedName, setListSavedName] = useState([]);
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

  useEffect(() => {
    const loadSavedName = async () => {
      const result = await EncryptedStorage.getItem('@save_name_estate');

      setListSavedName(JSON.parse(result));
    };
    loadSavedName();
  }, []);

  const dataNew = useMemo(() => {
    const filterSaved = listSavedName?.filter(item => {
      return item?.country_id === country?.id;
    });

    const dataIds = data?.data?.rows?.map(element => element?.id) || [];
    const result = filterSaved?.filter(item => {
      return dataIds.includes(item?.id);
    });

    return result;
  }, [listSavedName, country?.id, data?.data?.count]);
  if (!(dataNew?.length !== 0) && !isLoading) return null;
  if (!dataNew?.length && !isLoading) return null;

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
          data={!isLoading ? dataNew : [...Array(4)]}
          contentContainerStyle={styles.content}
          renderItem={({item}) => (
            <BoxPlaceItem
              isHeart
              isStar
              textRating={2}
              data={item}
              rental="night"
              isLoading={!item}
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

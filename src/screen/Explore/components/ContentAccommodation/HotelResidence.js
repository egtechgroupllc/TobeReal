import {useNavigation} from '@react-navigation/native';
import React, {memo, useEffect, useMemo, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {COLORS, SHADOW, scale} from '../../../../assets/constants';
import {useLanguage} from '../../../../hooks/useLanguage';
import WrapperContent from '../WrapperContent';
import BoxPlaceItem from './BoxPlaceItem';
import {InViewport} from '../../../../components';
import BoxPlaceItemLoading from './BoxPlaceItem/BoxPlaceItemLoading';
import EmptyData from '../../../../components/EmptyData';

export default memo(function HotelResidence({data, isLoading, country}) {
  const {t} = useLanguage();
  const {navigate} = useNavigation();

  const title = [t('recent_view')];

  const [listSavedName, setListSavedName] = useState([]);
  useEffect(() => {
    const loadSavedName = async () => {
      const result = await EncryptedStorage.getItem('save_name');
      // const result = await EncryptedStorage.removeItem('save_name');
      setListSavedName(JSON.parse(result));
    };
    loadSavedName();
  }, []);

  const dataNew = useMemo(() => {
    const filterSaved = listSavedName?.filter(item => {
      return item?.country_id === country?.id;
    });

    const dataIds = data?.map(element => element?.id) || [];
    const result = filterSaved?.filter(item => {
      return dataIds.includes(item?.id);
    });

    return result;
  }, [listSavedName, country?.id, data]);

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
        heading={title}
        styleWrapper={{backgroundColor: COLORS.grey50}}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={!isLoading ? dataNew : [...Array(4)]}
          contentContainerStyle={styles.content}
          ListEmptyComponent={<EmptyData />}
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
              isLoading={!item}
            />
          )}
        />
      </WrapperContent>
    </InViewport>
  );
});

const styles = StyleSheet.create({
  content: {
    columnGap: scale(14),
    paddingVertical: scale(6),
    paddingHorizontal: scale(16),
  },
});

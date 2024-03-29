import {StyleSheet, Text, FlatList, View} from 'react-native';
import React, {useState} from 'react';
import WrapperContent from '../WrapperContent';
import BoxPlaceItem from './BoxPlaceItem';
import {useLanguage} from '../../../../hooks/useLanguage';
import {scale} from '../../../../assets/constants';
import InViewPort from '../../../../components/InViewport';
import { useNavigation } from '@react-navigation/native';

export default function BestSelling({data}) {
  const {t} = useLanguage();
  const [isRender, setIsRender] = useState(false);
  console.log('BestSelling', isRender);
  const title = [t('best_selling')]
  const {navigate} = useNavigation();
  return (
    <InViewPort onChange={render => render && setIsRender(render)} delay={270}>
      {isRender && (
        <WrapperContent
          isSeeAll
          isCategory
          onPressSeeAll={() =>
            navigate('NoBottomTab', {
              screen: 'SeeAllRentScreen',
              params: {
                title: title || '',
              },
            })
          }
          onPressCategory={item => console.log(item)}
          heading={title}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data}
            contentContainerStyle={styles.content}
            renderItem={({item}) => (
              <BoxPlaceItem
                seeViewNumber={1.5}
                multiPrice
                isUnitAvailable
                isHeart
                data={item}
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

import {StyleSheet, Text, FlatList, } from 'react-native';
import React, {useState} from 'react';
import WrapperContent from '../WrapperContent';
import {formatPrice} from '../../../../utils/format';

import InViewPort from '../../../../components/InViewport';
import {useLanguage} from '../../../../hooks/useLanguage';
import {images, scale} from '../../../../assets/constants';
import BoxPlaceItem from './BoxPlaceItem';
import BoxDiscoveryItem from './BoxDiscoveryItem';
import { useNavigation } from '@react-navigation/native';

const funcFallBack = () => {};
export default function DiscoveryTour({data, onPressCategory = funcFallBack}) {
  const {t} = useLanguage();
  const [isRender, setIsRender] = useState(false);
  const {navigate} = useNavigation();
  const title = [t('discover_more_tour')]
  return (
    <InViewPort onChange={render => render && setIsRender(render)} delay={70}>
      {isRender && (
        <WrapperContent
          isSeeAll
          discoveryTour
          onPressSeeAll={() =>
            navigate('NoBottomTab', {
              screen: 'SeeAllBuyScreen',
              params: {
                title: title || '',
              },
            })
          }
          onPressCategory={onPressCategory}
          heading={title}
          subHeading={t('the_place_discovery')}
          styleWrapper={{backgroundColor: 'transparent'}}>
          <FlatList
            numColumns={2} 
            showsHorizontalScrollIndicator={false}
            data={data}
            contentContainerStyle={styles.content}
            renderItem={({item}) => (
              <BoxDiscoveryItem
                isHeart
                isStar
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
    // columnGap: scale(14),
    rowGap:scale(14),
    paddingVertical: scale(6),
    alignItems:'center'
  },
});

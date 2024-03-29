import {StyleSheet, Text, FlatList, View} from 'react-native';
import React, {useState} from 'react';
import WrapperContent from '../WrapperContent';
import {formatPrice} from '../../../../utils/format';

import InViewPort from '../../../../components/InViewport';
import {useLanguage} from '../../../../hooks/useLanguage';
import {images, scale} from '../../../../assets/constants';
import BoxExploreEstate from './BoxExploreEstate';
import { useNavigation } from '@react-navigation/native';


export default function ExploreNearbyEstate({data}) {
  const {t} = useLanguage();
  const [isRender, setIsRender] = useState(false);
  const {navigate} = useNavigation();
  const title = [t('Explore Nearby Estates')]
  return (
    <InViewPort onChange={render => render && setIsRender(render)} delay={70}>
      {isRender && (
        <WrapperContent
          // background={images.bgPackageTour}
          isSeeAll
          // worldTour
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
          // subHeading={t('Discover the 5D4D package tour for families!!') + ` ${formatPrice(1000000)}`}
          styleWrapper={{backgroundColor: 'transparent'}}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data}
            contentContainerStyle={styles.content}
            renderItem={({item}) => (
              <BoxExploreEstate
                isHeart
                isStar
                data={item}
                rental="night"
                jsonImage={item?.imgdetail}
                name={item?.name}
                price={item?.price}
                type={item?.type}
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
    rowGap:scale(14),
    paddingVertical: scale(6),
    paddingHorizontal: scale(16),
  },
});

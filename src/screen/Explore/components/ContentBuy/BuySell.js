import {StyleSheet, Text, FlatList, View} from 'react-native';
import React, {useState} from 'react';

import {formatPrice} from '../../../../utils/format';

import InViewPort from '../../../../components/InViewport';
import {useLanguage} from '../../../../hooks/useLanguage';
import {images, scale} from '../../../../assets/constants';
import BoxPlaceItem from './BoxPlaceItem';
import WrapperContent from '../WrapperContent';



export default function BuySell({data}) {
  const {t} = useLanguage();
  const [isRender, setIsRender] = useState(false);

  return (
    <InViewPort onChange={render => render && setIsRender(render)} delay={70}>
      {isRender && (
        <WrapperContent
          isSeeAll
          onPressSeeAll={() => console.log(1)}
          onPressCategory={item => console.log(item)}
          heading={t('Buy and sell real estate nationwide')}
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

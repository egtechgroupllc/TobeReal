import {StyleSheet, Text, FlatList, View, ImageBackground} from 'react-native';
import React, {useState} from 'react';

import {formatPrice} from '../../../../utils/format';

import InViewPort from '../../../../components/InViewport';
import {useLanguage} from '../../../../hooks/useLanguage';
import {images, scale} from '../../../../assets/constants';
import BoxPlaceItem from './BoxPlaceItem';
import WrapperContent from '../WrapperContent';
import {useNavigation} from '@react-navigation/native';

export default function PackageTour({data}) {
  const {t} = useLanguage();
  const [isRender, setIsRender] = useState(false);
  const {navigate} = useNavigation();
  const title = [t('package_tour_aboard')];
  return (
    <InViewPort onChange={render => render && setIsRender(render)} delay={70}>
      {isRender && (
        <WrapperContent
          background={images.bgPackageTour}
          isSeeAll
          packageTour
          onPressSeeAll={() =>
            navigate('NoBottomTab', {
              screen: 'SeeAllTourScreen',
              params: {
                title: title || '',
              },
            })
          }
          onPressCategory={item => console.log(item)}
          heading={title}
          subHeading={t('discover_package_family') + ` ${formatPrice(1000000)}`}
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

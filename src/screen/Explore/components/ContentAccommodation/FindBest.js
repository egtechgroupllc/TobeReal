import React, {useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useLanguage} from '../../../../hooks/useLanguage';
import WrapperContent from '../WrapperContent';
import BoxPlaceItem from './BoxPlaceItem';
import InViewPort from '../../../../components/InViewport';
import {scale} from '../../../../assets/constants';
import { useNavigation } from '@react-navigation/native';

export default function FindBest({data}) {
  const {t} = useLanguage();
  const [isRender, setIsRender] = useState(false);
  const title = [t('find_best')]
  const {navigate} = useNavigation();
  return (
    <InViewPort onChange={render => render && setIsRender(render)} delay={130}>
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
          heading={title}
          subHeading={t('disc_upto') + ` 30%!`}
          styleWrapper={{backgroundColor: '#91F2FF'}}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data}
            contentContainerStyle={styles.content}
            renderItem={({item}) => (
              <BoxPlaceItem
                isDiscount
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

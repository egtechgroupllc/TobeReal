import {StyleSheet, Text, FlatList, View} from 'react-native';
import React, {useState} from 'react';
import WrapperContent from '../WrapperContent';
import BoxPlaceItem from './BoxPlaceItem';
import {useLanguage} from '../../../../hooks/useLanguage';
import {scale} from '../../../../assets/constants';
import InViewPort from '../../../../components/InViewport';
import { useNavigation } from '@react-navigation/native';

export default function AccommodationPremium({data}) {
  const {t} = useLanguage();
  const [isRender, setIsRender] = useState(false);
  const title = [t('saveloka_premium')]
  const {navigate} = useNavigation();
  return (
    <InViewPort onChange={render => render && setIsRender(render)} delay={160}>
      {isRender && (
        <WrapperContent
          isSeeAll
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
          subHeading={t('selected_premium')}
          styleWrapper={{backgroundColor: '#f8eede'}}>
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

import {StyleSheet, Text, FlatList, View} from 'react-native';
import React, {useState} from 'react';
import WrapperContent from '../WrapperContent';
import BoxPlaceItem from './BoxPlaceItem';
import InViewPort from '../../../../components/InViewport';
import {useLanguage} from '../../../../hooks/useLanguage';
import {scale} from '../../../../assets/constants';

export default function WeeklyHotDeal({data}) {
  const {t} = useLanguage();
  const [isRender, setIsRender] = useState(false);
  console.log('WeeklyHotDeal', isRender);

  return (
    <InViewPort onChange={render => render && setIsRender(render)} delay={240}>
      {isRender && (
        <WrapperContent
          isSeeAll
          isCategory
          onPressSeeAll={() => console.log(1)}
          onPressCategory={item => console.log(item)}
          heading={t('weekly_hot_deal')}
          subHeading={t('ends_in')}
          dayEndDeals={6}>
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
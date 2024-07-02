import {StyleSheet, Text, FlatList, View} from 'react-native';
import React, {useState} from 'react';
import WrapperContent from '../WrapperContent';
import RecommendedUnitItem from './RecommendedUnitItem';
import {useLanguage} from '../../../../hooks/useLanguage';
import InViewPort from '../../../../components/InViewport';
import {scale} from '../../../../assets/constants';

export default function RecommendedUnit({data}) {
  const {t} = useLanguage();
  const [isRender, setIsRender] = useState(false);

  return (
    <InViewPort>
      <WrapperContent
        onPressSeeAll={() => console.log(1)}
        heading={t('saveloka_recommended')}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          contentContainerStyle={styles.content}
          renderItem={({item}) => <RecommendedUnitItem isButtonBottom />}
        />
      </WrapperContent>
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

import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {images, scale} from '../../../../assets/constants';
import {Skeleton} from '../../../../components';
import InViewPort from '../../../../components/InViewport';
import {useLanguage} from '../../../../hooks/useLanguage';
import WrapperContent from '../WrapperContent';
import RecommendedUnitItem from './RecommendedUnitItem';
const dataInternational = [
  {
    id: 1,
    src: images.singapore,
    name: 'Singapore',
    price: 224000,
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
  {
    id: 2,
    src: images.thailan,
    name: 'Thailand',
    price: 995000,
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
  {
    id: 3,
    src: images.indo,
    name: 'Indonesia',
    price: 280000,
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
  {
    id: 4,
    src: images.malay,
    name: 'Malaysia',
    price: 280000,
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
  {
    id: 5,
    src: images.philip,
    name: 'Philippines',
    price: 280000,
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
  {
    id: 6,
    src: images.korea,
    name: 'Korea',
    price: 280000,
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
  {
    id: 7,
    src: images.japan,
    name: 'Japan',
    price: 280000,
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
  {
    id: 8,
    src: images.taiwan,
    name: 'Taiwan',
    price: 280000,
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
];

export default function BigCity({
  styleItem,
  styleWrapper,
  styesTextTitle,
  onPress,
  renderReply = true,
  noContain,
}) {
  return (
    <InViewPort
      loadingMap
      ComponentLoading={
        <Skeleton
          style={{
            width: scale(400 / 2.5),
            height: scale(400 / 2.5),
          }}
        />
      }>
      <ComponentContain noContain={noContain}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={dataInternational}
          contentContainerStyle={[styles.content, styleWrapper]}
          renderItem={({item, index}) => (
            <RecommendedUnitItem
              viewShow={2.5}
              isCenter
              title={item?.name}
              data={item}
              img={item?.src}
              styesWrapper={styleItem}
              styesTextTitle={styesTextTitle}
              onPress={() => onPress && onPress({item, index})}
            />
          )}
        />
      </ComponentContain>
    </InViewPort>
  );
}
const ComponentContain = ({children, noContain}) => {
  const {t} = useLanguage();

  return noContain ? (
    children
  ) : (
    <WrapperContent
      heading={t('looking_for_a_place')}
      subHeading={t('find_by_saveloka')}>
      {children}
    </WrapperContent>
  );
};
const styles = StyleSheet.create({
  content: {
    columnGap: scale(14),
    paddingVertical: scale(6),
    paddingHorizontal: scale(16),
  },
});

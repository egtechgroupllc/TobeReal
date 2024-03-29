import React, {useRef, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {COLORS, SIZES, images, scale} from '../../../../../assets/constants';

import WrapperContent from '../../WrapperContent';
import {useLanguage} from '../../../../../hooks/useLanguage';
import ItemBox from './components/ItemBox';
import {StackActions, useNavigation} from '@react-navigation/native';
const dataRom = [
  {
    id: 1,
    title: 'STANDARD',
    description: 'Maximum two adults, 1 baby (0-12 years) in free',
    acreage: '20m2',
    info: '1 large double bed',
    img: images.a3,
    price: '$ 25,06',
  },
  {
    id: 2,
    title: 'DELUXE',
    description: 'Maximum two adults, 1 baby (0-12 years) in free',
    acreage: '22m2',
    info: '1 large double bed',
    img: images.b15_2,
    price: '$ 100,06',
  },
  {
    id: 3,
    title: 'VIP',
    description: 'Maximum two adults, 1 baby (0-12 years) in free',
    acreage: '25m2',
    info: '1 large double bed',
    img: images.b15,
    price: '$ 50,06',
  },
  {
    id: 4,
    title: 'VIP DELUXE',
    description: 'Maximum two adults, 1 baby (0-12 years) in free',
    acreage: '30m2',
    info: '2 large double bed',
    img: images.c127,
    price: '$ 40,06',
  },
];
export default function Room({name, data}) {
  const {t} = useLanguage();
  const {isFocused, dispatch} = useNavigation();
  return (
    <WrapperContent
      // isSeeAll
      // onPressSeeAll={() => bottomSheetRef.current.open()}
      heading={t('room')}>
      {/* <View style={styles.overview}>
        <View style={styles.overviewNumberRating}>
          <CustomText textType="bold" style={styles.numberRating}>
            4.5
          </CustomText>
        </View>

        <View
          style={{
            rowGap: scale(3),
          }}>
          <CustomText
            textType="bold"
            style={{fontSize: SIZES.xMedium, color: COLORS.primary}}>
            {t('overview')}
          </CustomText>
          <CustomText style={{fontSize: SIZES.xMedium}}>
            146 {t('reviews')}
          </CustomText>
        </View>
      </View> */}

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={dataRom}
        contentContainerStyle={{
          columnGap: scale(10),
          marginVertical: scale(10),
          paddingHorizontal: scale(16),
        }}
        renderItem={({item, index}) => (
          <ItemBox
            key={`key-${item}-${index}`}
            image={item.img}
            acreage={item.acreage}
            info={item.info}
            title={item.name || item.title}
            description={item.description}
            price={item.price}
            onPress={() => {
              if (isFocused()) {
                dispatch(
                  StackActions.push('NoBottomTab', {
                    screen: 'DetailRoomScreen',
                    params: {
                      name: name || '',
                      description: item.description || '',
                      image: item.img || [],
                      title: item.title || '',
                      acreage: item.acreage || '',
                      info: item.info || '',
                      price: item.price || '',
                    },
                  }),
                );
              }
            }}
          />
        )}
      />

      {/* <BottomSheet
        ref={bottomSheetRef}
        refChild={bottomSheetChildRef}
        snapPoints={['50%', '86%']}
        handleChildBottom={() => (
          <ListSelect
            data={listSort}
            onSelect={value => {
              bottomSheetChildRef.current.closeChild();
              setSelect(value);
            }}
          />
        )}
        titleIndicator="Đánh giá">
        <ReviewAll
          onSort={() => bottomSheetChildRef.current.openChild()}
          valueSort={select}
        />
      </BottomSheet> */}
    </WrapperContent>
  );
}

const styles = StyleSheet.create({
  overview: {
    flexDirection: 'row',
    columnGap: scale(10),
    alignItems: 'center',
    paddingHorizontal: scale(16),
  },
  overviewNumberRating: {
    backgroundColor: COLORS.primary,
    borderRadius: scale(6),
  },
  numberRating: {
    fontSize: SIZES.xMedium,
    color: COLORS.white,
    padding: scale(10),
  },
});

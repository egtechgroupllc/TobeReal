import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';

import {getMyListCreateAccom} from '../../../../../../api/Accommodation/apiAccom';
import {COLORS, SIZES, scale} from '../../../../../../assets/constants';
import CustomText from '../../../../../../components/CustomText';
import CreateAccomItem from './CreateAccomItem';

export default function ListCreateAccom({data}) {
  const numColumns = Math.ceil(data?.rows?.length / 2);

  if (!numColumns) return null;
  return (
    <View
      style={{
        backgroundColor: COLORS.primary,
        rowGap: scale(20),
        paddingVertical: scale(20),
      }}>
      <CustomText
        textType="bold"
        style={{
          fontSize: SIZES.medium,
          paddingHorizontal: scale(20),
          color: COLORS.white,
        }}>
        Incomplete Registration Process
      </CustomText>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        alwaysBounceVertical={false}
        directionalLockEnabled={true}
        contentContainerStyle={{
          gap: scale(10),
          alignItems: 'center',
        }}>
        <FlatList
          key={'accommodation/my-list-0'}
          data={data?.rows}
          numColumns={numColumns}
          alwaysBounceVertical={false}
          directionalLockEnabled={true}
          keyExtractor={(item, index) => `$key_${item.id}-${index}`}
          columnWrapperStyle={
            numColumns >= 2 && {
              columnGap: scale(10),
            }
          }
          contentContainerStyle={{
            paddingHorizontal: scale(20),
            rowGap: scale(10),
          }}
          renderItem={({item, index}) => (
            <CreateAccomItem key={`key_${item?.id}-${index}`} data={item} />
          )}
        />
      </ScrollView>
    </View>
  );
}

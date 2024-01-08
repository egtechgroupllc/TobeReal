import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WrapperContent from '../WrapperContent';
import BoxPlaceItem from './BoxPlaceItem';
import {scale} from '../../../../assets/constants';
import {formatPrice} from '../../../../utils/formatPrice';

export default function ContentAccommodation() {
  return (
    <View style={styles.wrapper}>
      <WrapperContent
        heading="Hotel Residence"
        subHeading="Seamless Living, Make Hotel Your Permanent Home!">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[...Array(10)]}
          contentContainerStyle={{
            columnGap: scale(16),
            paddingVertical: scale(10),
            paddingHorizontal: scale(16),
          }}
          renderItem={({item}) => <BoxPlaceItem seeViewNumber={1.5} />}
        />
      </WrapperContent>

      <WrapperContent
        isSeeAll
        onPressSeeAll={() => console.log(1)}
        heading="Stay Monthly For Cheaper Prices 🤑"
        subHeading={`Disc. up to ${formatPrice(1000000)} VND`}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[...Array(10)]}
          contentContainerStyle={{
            columnGap: scale(16),
            paddingVertical: scale(10),
            paddingHorizontal: scale(16),
          }}
          renderItem={({item}) => <BoxPlaceItem />}
        />
      </WrapperContent>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: scale(16),
    rowGap: scale(10),
  },
});

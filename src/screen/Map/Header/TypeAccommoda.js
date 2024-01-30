import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WrapperContent from '../../Explore/components/WrapperContent';
import {SIZES, scale} from '../../../assets/constants';
import {Category} from '../../../components';

export default function TypeAccommoda() {
  return (
    <WrapperContent
      heading="Type"
      styleHeading={{
        paddingHorizontal: 0,
      }}
      styleTextHeading={{
        fontSize: SIZES.xMedium,
      }}
      styleContent={{
        rowGap: scale(4),
        alignItem: 'center',
      }}>
      <Category
        noSelect
        isShadow={false}
        data={['Rent', 'Tour', 'Buy']}
        // onPress={value => setCategory(value)}
        styleWrapper={{
          marginTop: scale(10),
        }}
      />
    </WrapperContent>
  );
}

const styles = StyleSheet.create({});

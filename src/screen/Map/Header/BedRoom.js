import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {SIZES, scale} from '../../../assets/constants';
import WrapperContent from '../../Explore/components/WrapperContent';
import CheckBox from '../../../components/CheckBox';
import CustomText from '../../../components/CustomText';

const listSort = ['Studio', '1 Bedroom', '2 Bedrooms', '3 Bedrooms +'];
export default function BedRoom() {
  const [checked, setChecked] = useState(undefined);

  return (
    <WrapperContent
      heading="Number of Bedrooms"
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
      {listSort.map((item, index) => (
        <CheckBox
          key={index}
          textLeft
          defaultValue={checked === index}
          text={<CustomText>{item}</CustomText>}
          style={{
            justifyContent: 'space-between',
            paddingVertical: scale(5),
          }}
          // onPress={e => setChecked(index)}
        />
      ))}
    </WrapperContent>
  );
}

const styles = StyleSheet.create({});

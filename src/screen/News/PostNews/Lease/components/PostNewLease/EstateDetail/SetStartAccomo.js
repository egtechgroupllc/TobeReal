/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {scale} from '../../../../../../../assets/constants';
import CustomText from '../../../../../../../components/CustomText';
import RadioButton from '../../../../../../components/RadioButton';
import StarAccomo from './StarAccomo';

export default function SetStartAccomo({onChange}) {
  const [select, setSelect] = useState(0);

  useEffect(() => {
    onChange && onChange(select);
  }, [select]);

  return (
    <View
      style={{
        alignItems: 'flex-start',
        width: '100%',
        rowGap: scale(6),
      }}>
      {[...Array(6)].map((_, index) => (
        <RadioButton
          key={index}
          isCheck={select === index}
          title={!index && 'Không áp dụng'}
          onPress={() => setSelect(index)}
          textComponent={
            !!index && (
              <View style={{flexDirection: 'row', columnGap: scale(6)}}>
                <CustomText>{index} sao</CustomText>
                <StarAccomo isSetRating rating={index} />
              </View>
            )
          }
        />
      ))}
    </View>
  );
}

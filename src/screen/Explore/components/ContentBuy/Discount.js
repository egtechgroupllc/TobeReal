import {StyleSheet, Text, FlatList, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import WrapperContent from '../WrapperContent';
import {formatPrice} from '../../../../utils/format';

import InViewPort from '../../../../components/InViewport';
import {useLanguage} from '../../../../hooks/useLanguage';
import {images, scale} from '../../../../assets/constants';
import BoxPlaceItem from './BoxPlaceItem';
import CustomImage from '../../../../components/CustomImage';
import {ScrollView} from 'react-native-gesture-handler';

export default function Discount() {
  const {t} = useLanguage();
  const [isRender, setIsRender] = useState(false);

  return (
    <InViewPort onChange={render => render && setIsRender(render)} delay={70}>
      {isRender && (
        <View style={{flexDirection: 'row', marginLeft: scale(20)}}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity>
              <CustomImage
                source={images.halloween}
                style={{width: scale(270), height: scale(181)}}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <CustomImage
                source={images.summer}
                style={{width: scale(270), height: scale(181)}}
              />
            </TouchableOpacity>
          </ScrollView>
        </View>
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

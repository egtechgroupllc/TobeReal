import React,{useState} from 'react';
import {
  FlatList,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {COLORS, SIZES, scale} from '../../../../../../assets/constants';
import CustomText from '../../../../../../components/CustomText';

export default function ContentFilter({data, title}) {
  const {navigate} = useNavigation();
  const numColumns = Math.ceil(data.length / 2);
  const [checked, setChecked] = useState([]);
  const toggleItem = item => {
    if (checked.includes(item)) {
      setChecked(prevItems => prevItems.filter(prevItem => prevItem !== item));
    } else {
      setChecked(prevItems => [...prevItems, item]);
    }
  };
  return (
    <View
      style={{
        rowGap: scale(16),
        paddingVertical: scale(5),
      }}>
      <CustomText
        textType="bold"
        style={{
          fontSize: SIZES.xMedium,
          color: COLORS.black,
        }}>
        {title}
      </CustomText>
      <View
        style={{
          maxWidth: scale(350),
          alignSelf: 'center',
          flexDirection: 'row',
          gap: scale(10),
          flexWrap: 'wrap',
        }}>
        {data.map(item => {
          return (
            <TouchableOpacity
              style={{
                ...styles.button,
                borderWidth: checked.includes(item) ? 1.3 : 1,
                backgroundColor: checked.includes(item)?  COLORS.primary : '#EFEFEF',
                borderColor:
                checked.includes(item)? COLORS.primary : '#f1f1f1',
              }}
              onPress={() => toggleItem(item)}>
              <CustomText>{item}</CustomText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#EFEFEF',
    height: scale(25),
    minWidth: scale(46),
    paddingHorizontal: scale(10),
    borderRadius: scale(20),
    // borderWidth: scale(1),
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
  },
});

import React, {useState} from 'react';
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
import {IconAdd} from '../../../../../../assets/icon/Icon';
import Counter from '../../../../../../components/Counter';

export default function Box({title}) {
  const [numAdult, setNumAdult] = useState();
  return (
    <View
      style={{
        rowGap: scale(10),
        paddingVertical: scale(5),
      }}>
      <CustomText
        textType="regular"
        style={{
          fontSize: SIZES.xMedium,
          color: COLORS.black,
        }}>
        {title}
      </CustomText>
      <View style={styles.button}>
        <Counter onChange={setNumAdult} value={numAdult} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    height: scale(27),
    minWidth: scale(83),
    borderRadius: scale(5),
    flexDirection: 'row',
    alignItems: 'center',
    // flex: 1,
  },
});

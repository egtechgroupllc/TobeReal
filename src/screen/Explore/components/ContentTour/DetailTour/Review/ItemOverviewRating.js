import {StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import CustomText from '../../../../../../components/CustomText';
import {COLORS, scale} from '../../../../../../assets/constants';

export default function ItemOverviewRating({rating, textType}) {
  const numberRating = useMemo(() => (rating / 5) * 100, [rating]);

  return (
    <View style={styles.wrapper}>
      <CustomText
        style={{
          flex: 1,
        }}>
        {textType}
      </CustomText>

      <View style={styles.progress}>
        <View
          style={[
            styles.progressValue,
            {
              width: `${numberRating}%`,
            },
          ]}
        />
      </View>

      <CustomText
        style={{
          minWidth: scale(20),
        }}>
        {rating}
      </CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flexDirection: 'row',
    columnGap: scale(10),
    alignItems: 'center',
  },
  progress: {
    width: '45%',
    // flex: 1,
    backgroundColor: '#eee',
    height: 5,
    borderRadius: 99,
    overflow: 'hidden',
  },
  progressValue: {
    // flex: 1,
    backgroundColor: COLORS.primary,
    height: scale(5),
    borderRadius: 99,
    overflow: 'hidden',
  },
});

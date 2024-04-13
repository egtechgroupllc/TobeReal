import React, {memo, useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {images, scale} from '../../../../../assets/constants';
import {IconPeople} from '../../../../../assets/icon/Icon';
import {CustomButton} from '../../../../../components';
import BottomSheet from '../../../../../components/BottomSheet';
import Counter from '../../../../../components/Counter';
import CustomImage from '../../../../../components/CustomImage';
import CustomText from '../../../../../components/CustomText';

export default memo(function SelectNumGuestRoom({onChangeNum}) {
  const bottomSheetRef = useRef();
  const [numRooms, setNumRooms] = useState(1);
  const [numGuest, setNumGuest] = useState(1);

  useEffect(() => {
    onChangeNum &&
      onChangeNum({
        numRooms,
        numGuest,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApply = () => {
    bottomSheetRef.current.close();
    onChangeNum &&
      onChangeNum({
        numRooms,
        numGuest,
      });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{...styles.row, flex: 0.5, columnGap: scale(10)}}
      onPress={() => bottomSheetRef.current.open()}>
      <View style={{...styles.row}}>
        <IconPeople style={styles.icon} />
        <CustomText>{numGuest}</CustomText>
      </View>
      <View style={{...styles.row}}>
        <CustomImage source={images.lease} style={styles.icon} />
        <CustomText>{numRooms}</CustomText>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        onDismiss={handleApply}
        titleIndicator={'Add Guest(s) & Room(s)'}
        snapPoints={['30%']}
        styleContent={{
          rowGap: scale(14),
          paddingHorizontal: scale(20),
        }}>
        <View
          style={{
            rowGap: scale(20),
          }}>
          <Counter
            editable={false}
            heading={'Room(s)'}
            max={8}
            Icon={<CustomImage source={images.lease} style={styles.iconShe} />}
            value={numRooms}
            onChange={setNumRooms}
          />
          <Counter
            editable={false}
            heading={'Total Guest(s)'}
            max={30}
            Icon={<IconPeople style={styles.iconShe} />}
            value={numGuest}
            onChange={setNumGuest}
          />
        </View>
        <CustomButton
          onPress={handleApply}
          text="Apply"
          styleWrapper={{
            paddingTop: scale(10),
            borderTopWidth: 3,
            borderTopColor: '#f2f3f3',
          }}
        />
      </BottomSheet>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: scale(6),
  },
  icon: {
    width: scale(13),
    height: scale(13),
  },
  iconShe: {
    width: scale(20),
    height: scale(20),
  },
});

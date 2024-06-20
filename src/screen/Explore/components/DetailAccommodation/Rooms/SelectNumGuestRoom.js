import React, {memo, useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {COLORS, images, scale} from '../../../../../assets/constants';
import {
  IconChild,
  IconPeople,
  IconProfile,
} from '../../../../../assets/icon/Icon';
import {
  BottomSheet,
  Counter,
  CustomButton,
  CustomImage,
  CustomText,
} from '../../../../../components';

import ListChildren from '../../FindAccommodation/Occupancy/ListChildren';
import {useLanguage} from '../../../../../hooks/useLanguage';

export default memo(function SelectNumGuestRoom({onChangeNum, data}) {
  const bottomSheetRef = useRef();
  const {t} = useLanguage();

  const [numRooms, setNumRooms] = useState(data?.dataFilter?.numRooms || 1);
  const [numAdult, setNumAdult] = useState(data?.dataFilter?.numAdult || 1);
  const [numChild, setNumChild] = useState(data?.dataFilter?.numChild || []);

  useEffect(() => {
    onChangeNum &&
      onChangeNum({
        numRooms,
        numAdult,
        numChild: numChild,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApply = () => {
    bottomSheetRef.current.close();
    onChangeNum &&
      onChangeNum({
        numRooms,
        numAdult,
        numChild: numChild,
      });
  };
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{...styles.row, flex: 0.5, columnGap: scale(10)}}
      onPress={() => bottomSheetRef.current.open()}>
      <View style={{...styles.row}}>
        <IconPeople style={styles.icon} />
        <CustomText>{numAdult}</CustomText>
      </View>
      <View style={{...styles.row}}>
        <IconChild style={styles.icon} />
        <CustomText>{numChild?.length}</CustomText>
      </View>
      <View style={{...styles.row}}>
        <CustomImage source={images.lease} style={styles.icon} />
        <CustomText>{numRooms}</CustomText>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        onDismiss={handleApply}
        titleIndicator={t('add_guest_room')}
        snapPoints={['50%']}
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
            heading={t('room')}
            max={numAdult}
            Icon={<CustomImage source={images.lease} style={styles.iconShe} />}
            // value={numRooms > numAdult ? numAdult : numRooms}
            onChange={setNumRooms}
          />
          <Counter
            editable={false}
            heading={t('total_adult')}
            max={30}
            Icon={<IconPeople style={styles.iconShe} />}
            // value={data?.dataFilter?.numAdult}
            min={numRooms}
            onChange={setNumAdult}
          />
          <ListChildren quantity={numChild} onChange={setNumChild} />
        </View>
        <CustomButton
          onPress={handleApply}
          text={t('apply')}
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
    width: scale(16),
    height: scale(16),
  },
  iconShe: {
    width: scale(20),
    height: scale(20),
  },
});

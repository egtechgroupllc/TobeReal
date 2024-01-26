/* eslint-disable react-hooks/exhaustive-deps */
import {BottomSheetTextInput, useBottomSheetModal} from '@gorhom/bottom-sheet';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, SHADOW, SIZES, scale} from '../../../../../../assets/constants';
import {
  IconCheckBox,
  IconDown,
  IconMarker,
  IconX,
} from '../../../../../../assets/icon/Icon';
import {CustomButton, CustomInput} from '../../../../../../components';
import CustomText from '../../../../../../components/CustomText';
import BottomSheet from '../../../../../../components/BottomSheet';

const listService= [
  'Outdoor view',
  'Non-smoking',
  'Shower',
  'Free Wi-Fi',
  'Executive lounge access',
  'Video games console',
  'Refrigerator',
  'Ironing facilities',
  'Free bottled water',
  'Hair dryer',
  'Closet',
  'Street view',
  'Balcony/terrace',
  'Kitchenette'
];
export default function SelectService() {
  const [select, setSelect] = useState(listService[0]);
  const [search, setSearch] = useState('');
  const {dismiss} = useBottomSheetModal();
  const bottomSheetRef = useRef();

  const dataList = useMemo(() => {
    const result = listService.filter(item =>
      item.toLowerCase().includes(search.toLowerCase()),
    );
    return result;
  }, [search]);

  return (
    <View style={{width:'90%'}}>
      <CustomInput
        value={select}
        iconLeft={IconMarker}
        iconRight={IconDown}
        onPress={() => {
          bottomSheetRef.current.open();
        }}
        editable={false}
      />

      <BottomSheet
        ref={bottomSheetRef}
        dataList={dataList}
        renderItem={({item, index}) => (
          <CustomButton
            style={[
              index !== 0 && {
                borderTopWidth: 1,
              },
              styles.item,
            ]}
            text={item}
            onPress={() => {
              setSelect(item);
              dismiss();
            }}
            iconRight={select === item && IconCheckBox}
            styleText={{
              color: COLORS.text,
            }}
          />
        )}>
        <View style={styles.headerSheet}>
          <View style={styles.header}>
            <CustomText
              textType="semiBold"
              style={{fontSize: SIZES.medium, textAlign: 'center'}}>
              Select Service
            </CustomText>
          </View>
          <BottomSheetTextInput
            style={styles.input}
            placeholder="Search"
            onChangeText={setSearch}
          />
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    borderColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scale(12),
    columnGap: scale(10),
    backgroundColor: 'transparent',
    paddingHorizontal: SIZES.large,
  },
  headerSheet: {
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
    backgroundColor: COLORS.white,
    ...SHADOW,
    rowGap: scale(10),
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxIcon: {
    padding: scale(6),
    borderRadius: scale(10),
    backgroundColor: '#F1F1F1',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderStyle: 'solid',
    height: scale(38),
    borderRadius: scale(12),
    paddingHorizontal: scale(12),
    fontSize: SIZES.xMedium,
    paddingVertical: scale(4),
  },
});

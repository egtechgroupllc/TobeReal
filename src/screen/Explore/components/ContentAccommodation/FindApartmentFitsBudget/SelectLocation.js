/* eslint-disable react-hooks/exhaustive-deps */
import {BottomSheetTextInput, useBottomSheetModal} from '@gorhom/bottom-sheet';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, SHADOW, SIZES, scale} from '../../../../../assets/constants';
import {
  IconCheckBox,
  IconDown,
  IconMarker,
  IconX,
} from '../../../../../assets/icon/Icon';
import {CustomButton, CustomInput} from '../../../../../components';
import BottomSheet from '../../../../../components/BottomSheet';
import CustomText from '../../../../../components/CustomText';

const listLocation = [
  'Jakarta',
  'Bandung',
  'Tangerang',
  'Bekasi',
  'Depok',
  'Surabaya',
  'Medan',
  'Bogor',
  'Makassar (Ujung Pandang)',
  'Sumedang',
  'Sidoarjo',
  'Yogyakarta (Jogja)',
  'Semarang',
];
export default function SelectLocation() {
  const [select, setSelect] = useState(listLocation[0]);
  const [search, setSearch] = useState('');
  const {dismiss} = useBottomSheetModal();
  const bottomSheetRef = useRef();

  const dataList = useMemo(() => {
    const result = listLocation.filter(item =>
      item.toLowerCase().includes(search.toLowerCase()),
    );
    return result;
  }, [search]);

  return (
    <View>
      <CustomInput
        value={select}
        iconLeft={IconMarker}
        iconRight={IconDown}
        onPress={() => {
          bottomSheetRef.current.open();
        }}
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
              Select Location
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
    height: scale(37),
    borderRadius: scale(12),
    paddingHorizontal: scale(12),
  },
});

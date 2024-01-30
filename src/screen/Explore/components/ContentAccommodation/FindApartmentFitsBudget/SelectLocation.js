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
  IconSearch,
  IconX,
} from '../../../../../assets/icon/Icon';
import {CustomButton, CustomInput} from '../../../../../components';
import BottomSheet from '../../../../../components/BottomSheet';
import CustomText from '../../../../../components/CustomText';
import {FlatList} from 'react-native-gesture-handler';
import EmptyData from '../../../../../components/EmptyData';

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
export default function SelectLocation({control, name}) {
  const [select, setSelect] = useState(listLocation[0]);
  const [search, setSearch] = useState('');
  const {dismiss} = useBottomSheetModal();
  const bottomSheetRef = useRef();

  const dataList = useMemo(() => {
    const result = listLocation.filter(item =>
      item.toLowerCase().trim().includes(search.toLowerCase().trim()),
    );
    return result;
  }, [search]);

  return (
    <View>
      <CustomInput
        control={control}
        name={name}
        defaultValue={select}
        iconLeft={IconMarker}
        iconRight={IconDown}
        onPress={() => {
          bottomSheetRef.current.open();
        }}
        editable={false}
      />

      <BottomSheet
        titleIndicator={'Select Location'}
        ref={bottomSheetRef}
        dataList={dataList}
        headerComponent={
          <View style={styles.headerSheet}>
            <BottomSheetTextInput
              style={styles.input}
              placeholder="Search"
              onChangeText={setSearch}
              value={search}
            />
          </View>
        }>
        {dataList[0] ? (
          <FlatList
            data={dataList}
            keyExtractor={item => item}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{}}
            scrollEnabled={false}
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
                  color: select === item ? COLORS.primary : COLORS.text,
                }}
              />
            )}
          />
        ) : (
          <EmptyData desc={'No results found'} />
        )}
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  boxNotFound: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '25%',
    rowGap: scale(10),
  },
  item: {
    borderTopColor: '#eee',
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
    backgroundColor: COLORS.white,
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

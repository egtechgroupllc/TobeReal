/* eslint-disable react-hooks/exhaustive-deps */
import {BottomSheetFlatList, BottomSheetTextInput} from '@gorhom/bottom-sheet';
import React, {
  useCallback,
  useDeferredValue,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CustomButton, CustomInput} from '../../../components';
import {COLORS, SIZES, scale} from '../../../assets/constants';
import {IconCheckBox} from '../../../assets/icon/Icon';
import {useLanguage} from '../../../hooks/useLanguage';

export default function BottomSheetChild({
  data,
  onChange,
  onSelect,
  value,
  control,
}) {
  const {t} = useLanguage();

  const [select, setSelect] = useState();
  const insets = useSafeAreaInsets();
  const flatListRef = useRef(null);
  const [search, setSearch] = useState('');

  const deferredValue = useDeferredValue(search);
  useEffect(() => {
    onChange && onChange(select);
  }, [select]);

  useEffect(() => {
    value && setSelect(value);
  }, [value]);

  const scrollToIndex = (index = 0) => {
    flatListRef.current.scrollToIndex({
      animated: true,
      index: index,
      viewPosition: 0.5,
    });
  };

  const handlePress = (item, index) => {
    setSelect(item);
    setTimeout(() => {
      onSelect && onSelect(item);
    }, 0);
    scrollToIndex(index);
  };
  const dataNew = useMemo(() => {
    const dataFilter = data?.data?.data.filter((item, index) => {
      return item?.name?.toLowerCase()?.includes(deferredValue?.toLowerCase());
    });

    return dataFilter;
  }, [data?.data?.data, deferredValue]);
  return (
    <>
      <BottomSheetTextInput
        placeholder={t('Search province')}
        onChangeText={setSearch}
        style={styles.input}
      />
      <BottomSheetFlatList
        ref={flatListRef}
        data={dataNew || []}
        keyExtractor={(item, index) => `key-${index}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom,
        }}
        renderItem={({item, index}) => (
          <>
            <CustomButton
              buttonType="normal"
              key={index}
              style={[
                index !== 0 &&
                  {
                    // borderTopWidth: 1,
                  },
                styles.item,
              ]}
              text={item?.name}
              onPress={() => {
                handlePress(item, index);
              }}
              iconRight={select === item && IconCheckBox}
              styleText={{
                textType: 'medium',
                color: select === item ? COLORS.primary : COLORS.text,
                fontSize: SIZES.xMedium,
              }}
            />
          </>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  item: {
    // borderTopColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scale(12),
    columnGap: scale(10),
    backgroundColor: 'transparent',
    paddingHorizontal: SIZES.large,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderStyle: 'solid',
    paddingHorizontal: scale(8),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    columnGap: scale(8),
    justifyContent: 'center',
    width: '95%',
    height: scale(38),
    alignSelf: 'center',
  },
});

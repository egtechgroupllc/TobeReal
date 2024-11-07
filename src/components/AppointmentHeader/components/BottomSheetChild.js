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
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, SIZES} from '~/assets/constants';
import {IconCheckBox} from '~/assets/icon/Icon';
import Button from '~/components/Button';
import CheckBox from '~/components/CheckBox';
import CText from '~/components/CText';
import {useLanguage} from '~/hooks/useLanguage';
import {scale} from '~/utils/scale';

export default function BottomSheetChild({
  data,
  onChange,
  onSelect,
  value,
  control,
  onPress,
}) {
  const {t} = useLanguage();

  const [select, setSelect] = useState([]);
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

  // const handlePress = (item, index) => {
  //   setSelect(item);
  //   setTimeout(() => {
  //     onSelect && onSelect(item);
  //   }, 0);
  //   scrollToIndex(index);
  // };
  const handlePress = (item, index) => {
    if (select.includes(item?.id)) {
      setSelect(select.filter(i => i !== item?.id)); // Remove item id if already selected
    } else {
      setSelect([...select, item?.id]); // Add item id if not selected
    }
    scrollToIndex(index);
  };
  // const dataNew = useMemo(() => {
  //   const dataFilter = data?.data?.data.filter((item, index) => {
  //     return item?.name?.toLowerCase()?.includes(deferredValue?.toLowerCase());
  //   });

  //   return dataFilter;
  // }, [data?.data?.data, deferredValue]);

  return (
    <>
      <BottomSheetTextInput
        placeholder={t('Search')}
        onChangeText={setSearch}
        style={styles.input}
      />
      <View style={{margin: scale(10)}}>
        <Button title="confirm" sizeButton="normal" onPress={onPress} />
      </View>
      <BottomSheetFlatList
        ref={flatListRef}
        // data={dataNew || []}
        data={data}
        keyExtractor={(item, index) => `key-${index}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom,
          rowGap: scale(10),
        }}
        renderItem={({item, index}) => {
          return (
            <>
              <TouchableOpacity
                onPress={() => handlePress(item, index)}
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: scale(10),
                }}>
                <CText
                  style={{color: COLORS.primary, fontSize: SIZES.medium}}
                  textType="semiBold">
                  {item?.name}
                </CText>
                <CheckBox
                  key={index}
                  textBold
                  isRadio
                  isChecked={select.includes(item?.id)}
                  onPress={() => handlePress(item, index)}
                  textStyle={{
                    fontSize: SIZES.xMedium,
                  }}
                />
              </TouchableOpacity>
            </>
          );
        }}
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

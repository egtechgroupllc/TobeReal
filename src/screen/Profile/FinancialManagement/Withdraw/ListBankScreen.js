import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {COLORS, SHADOW, SIZES, scale} from '../../../../assets/constants';
import CustomText from '../../../../components/CustomText';

import CheckBox from '../../../../components/CheckBox';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useLanguage} from '../../../../hooks/useLanguage';
import {CustomImage, MainWrapper, CustomInput} from '../../../../components';
import {useQuery} from '@tanstack/react-query';
import {getListBank} from '../../../../Model/api/apiListBank';
import {listBank} from '../../../../utils/listBank';

export default function ListBankScreen() {
  const [bank, setBank] = useState();
  const [searchText, setSearchText] = useState('');
  const [filteredBanks, setFilteredBanks] = useState(listBank);
  const router = useRoute().params;
  const {t} = useLanguage();

  const {setOptions, goBack} = useNavigation();

  useEffect(() => {
    const filtered = listBank.filter(item => {
      const name = item.name.toLowerCase();
      const shortName = item.short_name.toLowerCase();
      const bankCode = item.code.toLowerCase();
      const search = searchText.toLowerCase();
      return (
        name.includes(search) ||
        shortName.includes(search) ||
        bankCode.includes(search)
      );
    });
    setFilteredBanks(filtered);
  }, [searchText]);

  const handleDone = () => {
    router?.onGoBack(bank);
    goBack();
  };

  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('select_bank'),

      headerRight: () => (
        <CustomText
          onPress={handleDone}
          textType="semiBold"
          style={{
            color: '#fff',
            fontSize: SIZES.xMedium,
          }}>
          {t('done')}
        </CustomText>
      ),
    });
  }, [bank?.name, t]);

  return (
    <MainWrapper scrollEnabled={false}>
      <View style={styles.searchContainer}>
        <CustomInput
          placeholder={t('search')}
          value={searchText}
          onChangeText={setSearchText}
          containerStyle={styles.searchInput}
        />
      </View>
      <FlatList
        data={filteredBanks}
        style={{
          height: '100%',
        }}
        contentContainerStyle={{
          rowGap: scale(10),
          paddingVertical: scale(10),
          paddingBottom: scale(100),
        }}
        renderItem={({item, index}) => (
          <>
            <CheckBox
              key={`key_${item?.id}`}
              isRadio
              onPress={() => setBank(item)}
              fillColor={COLORS.primary}
              isChecked={bank?.id === item?.id}
              textLeft
              textComponent={
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    columnGap: scale(10),
                    flex: 1,
                  }}>
                  <CustomImage
                    source={{uri: item?.logo}}
                    style={{height: scale(60), width: scale(60)}}
                    resizeMode="contain"
                  />
                  <View style={{flex: 1}}>
                    <CustomText
                      numberOfLines={1}
                      style={{fontSize: SIZES.xSmall}}
                      textType="semiBold">
                      {item?.short_name}, {item?.code}
                    </CustomText>
                    <CustomText
                      style={{fontSize: SIZES.xSmall}}
                      numberOfLines={2}>
                      {item?.name}
                    </CustomText>
                  </View>
                </View>
              }
              style={styles.boxItem}
            />
          </>
        )}
      />
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  checkBox: {
    justifyContent: 'space-between',
    paddingVertical: scale(10),
    width: '95%',
  },
  boxItem: {
    alignSelf: 'center',
    width: '95%',
    minHeight: scale(50),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    ...SHADOW,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    borderRadius: scale(6),
    columnGap: scale(14),
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.pioBox,
  },
  searchContainer: {
    padding: scale(10),
    width: '100%',
  },
  searchInput: {
    backgroundColor: COLORS.white,
  },
});

import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {COLORS, SHADOW, SIZES, scale} from '../../../../assets/constants';
import CustomText from '../../../../components/CustomText';
import {
  IconACB,
  IconAcreage,
  IconBIDV,
  IconDongAbank,
  IconEximbank,
  IconMBbank,
  IconMSB,
  IconOCB,
  IconSCB,
  IconSEABANK,
  IconTechcombank,
  IconVIB,
  IconVPbank,
  IconVietcombank,
  IconVietinbank,
  IconViettinbank,
} from '../../../../assets/icon/Icon';
import CheckBox from '../../../../components/CheckBox';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useLanguage} from '../../../../hooks/useLanguage';
const data = [
  {id: 1, name: 'VIETCOMBANK', icon: <IconVietcombank />},
  {id: 2, name: 'TECHCOMBANK', icon: <IconTechcombank />},
  {id: 3, name: 'MB BANK', icon: <IconMBbank />},
  {id: 4, name: 'MARITIME BANK', icon: <IconMSB />},
  {id: 5, name: 'BIDV', icon: <IconBIDV />},
  {id: 6, name: 'VPBANK', icon: <IconVPbank />},
  {id: 7, name: 'VIETINBANK', icon: <IconVietinbank />},
  {id: 8, name: 'VIB', icon: <IconVIB />},
  {id: 9, name: 'DONG A BANK', icon: <IconDongAbank />},
  {id: 10, name: 'ACB', icon: <IconACB />},
  {id: 11, name: 'OCB', icon: <IconOCB />},
  {id: 12, name: 'SCB', icon: <IconSCB />},
  {id: 13, name: 'Eximbank', icon: <IconEximbank />},
  {id: 14, name: 'SeABank', icon: <IconSEABANK />},
];
export default function ListBankScreen() {
  const [bank, setBank] = useState();
  const router = useRoute().params;
  const {t} = useLanguage();

  const {setOptions, goBack} = useNavigation();
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
  }, [bank?.name]);

  return (
    <View>
      <FlatList
        data={data}
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
              isChecked={bank?.id === item?.id}
              textLeft
              textComponent={
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    columnGap: scale(10),
                  }}>
                  {item?.icon}
                  <CustomText style={{color: COLORS.black}}>
                    {item?.name}
                  </CustomText>
                </View>
              }
              style={styles.boxItem}
            />
          </>
        )}
      />
    </View>
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
    padding: scale(16),
    paddingVertical: scale(10),
    ...SHADOW,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    borderRadius: scale(6),
    columnGap: scale(14),
    backgroundColor: '#fff',
  },
});

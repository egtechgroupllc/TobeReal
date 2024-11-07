import * as RNFS from '@dr.pogodin/react-native-fs';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useRef} from 'react';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useLanguage} from '../../../hooks/useLanguage';
import {deleteWallet} from '../../../Model/api/wallet';
import {BottomSheet, Button, CustomText} from '../../../components';
import {
  IconArrowBottom,
  IconExportFile,
  IconHistory,
  IconTrash,
  IconWallet,
} from '../../../assets/icon/Icon';
import {COLORS, scale} from '../../../assets/constants';
import {useNavigation} from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import {showMess} from '../../../assets/constants/Helper';

export default function TabSelect({data}) {
  const {navigate, goBack} = useNavigation();

  const {t} = useLanguage();
  const listTab = [
    {
      id: 1,
      name: 'Deposit',
      icon: (
        <IconArrowBottom
          fill={COLORS.white}
          width={scale(12)}
          height={scale(12)}
        />
      ),
      nameScreen: 'DepositTokenScreen',
      nameNavigate: 'NoBottomTab',
    },
    {
      id: 2,
      name: 'History',
      icon: (
        <IconHistory fill={COLORS.white} width={scale(15)} height={scale(15)} />
      ),
      nameScreen: 'HistoryTokenData',
      nameNavigate: 'NoBottomTab',
    },
  ];

  return (
    <View
      style={{
        flexDirection: 'row',
        minWidth: scale(120),
        justifyContent: 'space-between',
        alignSelf: 'center',
      }}>
      {listTab.map(item => (
        <TouchableOpacity
          onPress={() => {
            navigate(item?.nameNavigate, {
              screen: item?.nameScreen,
              params: data,
            });
          }}
          activeOpacity={0.7}
          key={item?.id}
          style={{
            width: scale(60),
            justifyContent: 'center',
            alignItems: 'center',
            rowGap: scale(5),
          }}>
          <View
            style={{
              height: scale(35),
              backgroundColor: COLORS.grey,
              width: scale(35),
              borderRadius: scale(99),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {item?.icon}
          </View>
          <CustomText style={{color: COLORS.black}} textType="medium">
            {item?.name}
          </CustomText>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({});

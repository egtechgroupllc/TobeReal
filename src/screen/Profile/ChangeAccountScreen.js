import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useLanguage} from '../../hooks/useLanguage';
import {
  CheckBox,
  CustomButton,
  CustomText,
  MainWrapper,
} from '../../components';
import {COLORS, SHADOW, SIZES, scale} from '../../assets/constants';
import EmptyData from '../../components/EmptyData';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useQueryClient} from '@tanstack/react-query';
import {showMess} from '../../assets/constants/Helper';

export default function ChangeAccountScreen() {
  const {setOptions, navigate, goBack} = useNavigation();
  const {t} = useLanguage();

  const [listSavedEmail, setListSavedEmail] = useState([]);
  const queryClient = useQueryClient();
  const dataPro = queryClient.getQueryData(['user', 'profile'])?.data;
  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('change_account'),
    });
  }, []);

  useEffect(() => {
    const loadSavedEmail = async () => {
      const result = await EncryptedStorage.getItem('@save_email');

      result && setListSavedEmail(JSON.parse(result));
    };
    loadSavedEmail();
  }, []);
  const RemoveKey = async () => {
    await EncryptedStorage.removeItem('@save_email');
    showMess('remove_success', 'success');
    goBack();
  };
  const handleRemove = () => {
    Alert.alert(
      t('are_you_sure_want_buy_voucher'),
      t('transaction_cant_refund'),
      [
        {
          text: t('cancel'),
          // onPress: () => Alert.alert('Cancel Pressed'),
          style: 'cancel',
        },
        {text: t('ok'), onPress: () => RemoveKey()},
      ],
    );
  };
  return (
    <MainWrapper>
      <FlatList
        data={listSavedEmail}
        contentContainerStyle={{
          paddingVertical: scale(10),
          rowGap: scale(10),
          padding: scale(10),
        }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        ListEmptyComponent={() => (
          <EmptyData styleWrapper={{marginTop: '40%'}} />
        )}
        renderItem={({item, index}) => {
          return (
            <View key={index} style={{rowGap: scale(5)}}>
              <TouchableOpacity
                onPress={() =>
                  navigate('NavigationAuth', {
                    screen: 'LoginScreen',
                    params: item,
                  })
                }
                disabled={item?.email === dataPro?.email ? true : false}
                style={{
                  height: scale(50),
                  width: '100%',
                  backgroundColor: COLORS.white,
                  borderRadius: scale(10),
                  justifyContent: 'center',
                  paddingHorizontal: scale(20),
                  ...SHADOW,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View>
                    <CustomText
                      style={{fontSize: SIZES.xMedium}}
                      textType="semiBold">
                      {item?.username}
                    </CustomText>
                    <CustomText>{item?.email}</CustomText>
                  </View>
                  <CheckBox
                    key={index}
                    textBold
                    isRadio
                    // text={item}
                    isChecked={dataPro?.email === item?.email}
                    // onPress={() => setUserBooking(item)}
                    textStyle={{
                      fontSize: SIZES.xMedium,
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
      {listSavedEmail?.length > 1 && (
        <CustomButton
          text={t('remove_history')}
          onPress={handleRemove}
          styleWrapper={{
            width: '50%',
            alignSelf: 'center',
            paddingTop: scale(20),
          }}
        />
      )}
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});

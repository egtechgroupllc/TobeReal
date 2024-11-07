import {useNavigation} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {COLORS, images, SHADOW, SIZES} from '~/assets/constants';
import {showMess} from '~/assets/constants/Helper';
import {Button, CText, MainWrapper} from '~/components';
import CheckBox from '~/components/CheckBox';
import EmptyData from '~/components/EmptyData';
import {useLanguage} from '~/hooks/useLanguage';
import {scale} from '~/utils/scale';

export default function ChangeAccountScreen() {
  const {setOptions, navigate, goBack} = useNavigation();
  const {t} = useLanguage();

  const [listSavedEmail, setListSavedEmail] = useState([]);
  const queryClient = useQueryClient();
  const dataPro = queryClient.getQueryData(['user', 'get-list-profile'])?.data;

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
    <MainWrapper sourceImage={images.backgroundHome}>
      <View>
        <FlatList
          data={listSavedEmail}
          contentContainerStyle={{
            paddingVertical: scale(10),
            rowGap: scale(10),
            padding: scale(10),
          }}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          ListEmptyComponent={<EmptyData />}
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
                    borderRadius: scale(10),
                    justifyContent: 'center',
                    paddingHorizontal: scale(20),
                    backgroundColor: COLORS.input,

                    ...SHADOW,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View>
                      <CText
                        style={{fontSize: SIZES.xMedium, color: COLORS.White}}
                        textType="semiBold">
                        {item?.username}
                      </CText>
                      <CText style={{color: COLORS.White}}>{item?.email}</CText>
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
          <View style={{width: '50%', alignSelf: 'center'}}>
            <Button
              title={t('remove_history')}
              onPress={handleRemove}
              linearGradientProps={{colors: COLORS.linearButton}}
            />
          </View>
        )}
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});

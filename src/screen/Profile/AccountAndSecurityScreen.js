import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, SHADOW, SIZES, scale} from '../../assets/constants';
import {
  IconDeleteAccount,
  IconHandShake,
  IconNext,
  IconPassword,
  IconProfile,
  IconUnViewablePassword,
  IconViewablePassword,
} from '../../assets/icon/Icon';
import {CustomText, MainWrapper} from '../../components';
import {useLanguage} from '../../hooks/useLanguage';

export default function AccountAndSecurityScreen() {
  const {navigate, setOptions} = useNavigation();

  const {t} = useLanguage();

  return (
    <MainWrapper
      headerTitle={t('account_security')}
      styleContent={{
        paddingHorizontal: scale(12),
        rowGap: scale(14),
        marginTop: scale(20),
      }}>
      <Box title={t('account')} desc={t('personal_data')}>
        <Item
          Icon={IconProfile}
          title={t('account_information')}
          desc={t('personal_data')}
          nameScreen={'InformationScreen'}
        />

        <Item
          Icon={IconHandShake}
          title={t('business_account')}
          desc={t('you_can_use_other_features_for_business')}
          onPress={() => {
            navigate('NavigationAuth', {
              screen: 'RegisterPartnerScreen',
              params: {
                isShowHeader: true,
              },
            });
          }}
          nameScreen="1"
        />
        {/* <Item
          Icon={IconDeleteAccount}
          title={'Xoá tài khoản'}
          desc={'Tài khoản và nội dung sẽ bị xoá vinh viễn'}
        /> */}
        {/* <Item
          Icon={Platform.OS === 'ios' ? IconFaceID : IconFingerprint}
          title={'Sinh trắc học'}
          desc={'Tất cả sinh trắc học trên thiết bị này đều có thể đăng nhập'}
        /> */}
      </Box>
      <Box
        title={t('security_settings')}
        desc={t('password_and_authentication_methods')}>
        <Item
          Icon={IconPassword}
          title={t('change_password')}
          desc={t('use_password_from_other_places')}
          nameScreen="ChangePasswordScreen"
        />

        {/* <Item
          Icon={Platform.OS === 'ios' ? IconFaceID : IconFingerprint}
          title={'Sinh trắc học'}
          desc={'Tất cả sinh trắc học trên thiết bị này đều có thể đăng nhập'}
        /> */}
      </Box>
    </MainWrapper>
  );
}

const Box = ({title, desc, children}) => {
  return (
    <View style={styles.box}>
      <View
        style={{
          rowGap: scale(6),
        }}>
        <CustomText textType="bold" size={SIZES.xMedium}>
          {title}
        </CustomText>
        {desc && <CustomText>{desc}</CustomText>}
      </View>
      <View
        style={{
          marginTop: scale(12),
        }}>
        {children}
      </View>
    </View>
  );
};
const Item = ({title, desc, Icon, nameScreen, onPress}) => {
  const {navigate} = useNavigation();

  return (
    <TouchableOpacity
      disabled={!nameScreen}
      activeOpacity={0.7}
      style={styles.item}
      onPress={() => {
        onPress ? onPress() : nameScreen && navigate(nameScreen);
      }}>
      {Icon && <Icon size={scale(20)} />}
      <View
        style={{
          rowGap: scale(4),
          flex: 0.95,
        }}>
        <CustomText textType="semiBold" size={scale(13)}>
          {title}
        </CustomText>
        <CustomText>{desc}</CustomText>
      </View>
      <IconNext
        size={scale(12)}
        style={{
          marginLeft: 'auto',
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: COLORS.white,
    padding: scale(12),
    borderRadius: scale(10),
    rowGap: scale(0),
    ...SHADOW,
    borderWidth: 1,
    borderColor: COLORS.pioBox,
  },
  item: {
    borderTopWidth: 1,
    borderTopColor: COLORS.grey50,
    paddingVertical: scale(8),
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(12),
  },
});

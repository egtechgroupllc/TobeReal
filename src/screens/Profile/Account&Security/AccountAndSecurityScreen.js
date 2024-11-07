import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, images, SIZES} from '~/assets/constants';
import {
  IconDoctor,
  IconFamily,
  IconHandShake,
  IconNext,
  IconPassword,
  IconProfile,
} from '~/assets/icon/Icon';
import {CText, MainWrapper} from '~/components';
import {useLanguage} from '~/hooks/useLanguage';
import {scale} from '~/utils/scale';

export default function AccountAndSecurityScreen() {
  const {navigate, setOptions} = useNavigation();

  const {t} = useLanguage();

  return (
    <MainWrapper
      headerTitle={t('account_security')}
      sourceImage={images.backgroundHome}
      styleContent={{
        paddingHorizontal: scale(12),
        rowGap: scale(14),
        marginTop: scale(10),
      }}>
      <Box title={t('account')} desc={t('personal_data')}>
        {/* <Item
          styleWrapper={{borderTopWidth: 0}}
          Icon={IconProfile}
          title={'Thông tin tài khoản'}
          desc={'Các thông tin cá nhân'}
          nameScreen={'InformationScreen'}
        /> */}
        <Item
          styleWrapper={{borderTopWidth: 0}}
          Icon={IconFamily}
          title={t('profile_information')}
          desc={t('personal_and_next_of_kin_information_records')}
          nameScreen={'RelativeScreen'}
        />

        <Item
          Icon={IconDoctor}
          title={t('doctor_account')}
          desc={t('you_can_use_other_features_for_doctors')}
          onPress={() => {
            navigate('NoBottomTab', {
              screen: 'ManageRegisterDoctorScreen',
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
          styleWrapper={{borderTopWidth: 0}}
          Icon={IconPassword}
          title={t('change_password')}
          desc={t('use_password_not_used_elsewhere')}
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
    <>
      <CText textType="bold" size={SIZES.xMedium} style={{color: COLORS.White}}>
        {title}
      </CText>
      {/* {desc && <CText>{desc}</CText>} */}
      <View style={styles.box}>
        <View style={{}}></View>
        <View>{children}</View>
      </View>
    </>
  );
};
const Item = ({title, desc, Icon, nameScreen, onPress, styleWrapper}) => {
  const {navigate} = useNavigation();

  return (
    <TouchableOpacity
      disabled={!nameScreen}
      activeOpacity={0.7}
      style={[styles.item, styleWrapper]}
      onPress={() => {
        onPress ? onPress() : nameScreen && navigate(nameScreen);
      }}>
      {Icon && <Icon size={scale(20)} fill={COLORS.White} />}
      <View
        style={{
          rowGap: scale(4),
          flex: 0.95,
        }}>
        <CText
          textType="semiBold"
          size={scale(13)}
          style={{color: COLORS.White}}>
          {title}
        </CText>
        <CText color={COLORS.text} style={{color: COLORS.grey}}>
          {desc}
        </CText>
      </View>
      <IconNext
        size={scale(12)}
        style={{
          marginLeft: 'auto',
        }}
        fill={COLORS.White}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    padding: scale(12),
    borderRadius: scale(10),
    rowGap: scale(0),

    backgroundColor: COLORS.overlay,
  },
  item: {
    borderTopWidth: 1,
    borderTopColor: COLORS.greyLight,
    paddingVertical: scale(8),
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(12),
  },
});

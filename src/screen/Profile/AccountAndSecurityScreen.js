import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, SIZES, scale} from '../../assets/constants';
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
      headerTitle={'Tài khoản & Bảo mật'}
      noImgColor
      styleContent={{
        paddingHorizontal: scale(12),
        rowGap: scale(14),
        marginTop: scale(20),
      }}>
      <Box title={'Tài khoản'} desc={'Các dữ liệu cá nhân'}>
        <Item
          Icon={IconProfile}
          title={'Thông tin tài khoản'}
          desc={'Các thông tin cá nhân'}
          nameScreen={'InformationScreen'}
        />

        <Item
          Icon={IconHandShake}
          title={'Tài khoản doanh nghiệp'}
          desc={'Bạn có thể sử dụng những tính năng khác dành cho doanh nghiệp'}
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
        title={'Cài đặt bảo mật'}
        desc={'Mật khẩu và các phương thức xác thực'}>
        <Item
          Icon={IconPassword}
          title={t('change_password')}
          desc={'Sử dụng mật khẩu chưa dùng ở nơi khác'}
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
      {Icon && <Icon size={scale(20)} fill="#333" />}
      <View
        style={{
          rowGap: scale(4),
          flex: 0.95,
        }}>
        <CustomText textType="semiBold" size={scale(13)}>
          {title}
        </CustomText>
        <CustomText color={COLORS.text}>{desc}</CustomText>
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

import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, SHADOW, SIZES, scale} from '../../assets/constants';
import {
  IconDeleteAccount,
  IconDeleteText,
  IconHandShake,
  IconNext,
  IconPassword,
  IconProfile,
  IconUnViewablePassword,
  IconViewablePassword,
} from '../../assets/icon/Icon';
import {CustomInput, CustomText, MainWrapper} from '../../components';
import {useLanguage} from '../../hooks/useLanguage';
import {useMutation} from '@tanstack/react-query';
import {postDeleteAccount} from '../../Model/api/auth';
import RNRestart from 'react-native-restart';
import {showMess} from '../../assets/constants/Helper';
import {useAuthentication} from '../../hooks/useAuthentication';
import {
  IconDeviceIpadHorizontalQuestion,
  IconShield,
} from '@tabler/icons-react-native';

export default function AccountAndSecurityScreen() {
  const {navigate, setOptions} = useNavigation();
  const [deleteInput, setDeleteInput] = useState('');
  const {t} = useLanguage();
  const [open, setOpen] = useState();
  const {onClearToken} = useAuthentication();
  const deleteMutation = useMutation({
    mutationFn: postDeleteAccount,
  });
  const handleConfirm = () => {
    deleteMutation.mutate(
      {},
      {
        onSuccess: dataInside => {
          if (dataInside?.status) {
            showMess(t(dataInside?.data), 'success');
            setTimeout(() => {
              onClearToken();
            }, 500);
          }
        },
        onError: error => {
          if (error.response) {
            showMess(error?.response?.data?.message, 'error');
          }
        },
      },
    );
  };
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
          fill={COLORS.black}
        />

        <Item
          Icon={IconShield}
          fill={COLORS.white}
          title={t('verify_account')}
          desc={t('verify_account_desc')}
          nameScreen="VerifyAccountScreen"
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
          Icon={IconDeviceIpadHorizontalQuestion}
          title={t('session_manage')}
          desc={t('session_manage_and_history')}
          nameScreen="SessionManageScreen"
          fill={COLORS.white}
        />
        <Item
          Icon={IconPassword}
          title={t('change_password')}
          desc={t('use_password_from_other_places')}
          nameScreen="ChangePasswordScreen"
        />
        <Item
          Icon={IconDeleteAccount}
          title={t('delete_account')}
          desc={t('delete_account_perman')}
          onPress={() => setOpen(true)}
        />
        {/* <Item
          Icon={Platform.OS === 'ios' ? IconFaceID : IconFingerprint}
          title={'Sinh trắc học'}
          desc={'Tất cả sinh trắc học trên thiết bị này đều có thể đăng nhập'}
        /> */}
      </Box>
      {open && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Nền mờ
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}>
          <View
            style={{
              backgroundColor: COLORS.white,
              width: scale(270),
              padding: scale(16),
              borderRadius: scale(10),
              ...SHADOW,
            }}>
            {/* Tiêu đề */}
            <CustomText textType="bold" size={SIZES.medium}>
              {t('delete_account')}
            </CustomText>
            <CustomText size={SIZES.small} style={{marginVertical: scale(8)}}>
              {t('delete_account_perman')}
            </CustomText>

            {/* Input */}
            <CustomInput
              value={deleteInput}
              onChangeText={setDeleteInput}
              placeholder={t('enter_delete_confirm')}
              style={{
                borderWidth: 1,
                borderColor: COLORS.grey,
                borderRadius: scale(5),
                padding: scale(8),
                marginBottom: scale(16),
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                columnGap: scale(20),
              }}>
              <TouchableOpacity
                onPress={() => {
                  setOpen(false);
                  setDeleteInput(''); // Reset input khi hủy
                }}
                style={{
                  backgroundColor: COLORS.grey,
                  padding: scale(10),
                  borderRadius: scale(5),
                  flex: 1,
                  alignItems: 'center',
                }}>
                <CustomText textType="semiBold" color={COLORS.white}>
                  {t('cancel')}
                </CustomText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleConfirm()}
                disabled={deleteInput !== 'Delete'} // Disable nếu input không đúng
                style={{
                  backgroundColor:
                    deleteInput === 'Delete' ? COLORS.error : COLORS.grey,
                  padding: scale(10),
                  borderRadius: scale(5),
                  flex: 1,
                  alignItems: 'center',
                }}>
                <CustomText textType="semiBold" color={COLORS.white}>
                  {t('confirm')}
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
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
const Item = ({title, desc, Icon, nameScreen, onPress, fill}) => {
  const {navigate} = useNavigation();

  return (
    <TouchableOpacity
      disabled={!nameScreen && !onPress}
      activeOpacity={0.7}
      style={styles.item}
      onPress={() => {
        if (onPress) {
          onPress();
        } else if (nameScreen) {
          navigate(nameScreen);
        }
      }}>
      {Icon && <Icon size={scale(20)} fill={fill} />}
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

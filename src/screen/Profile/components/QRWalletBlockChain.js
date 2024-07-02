import React, {useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import Clipboard from '@react-native-clipboard/clipboard';
import {COLORS, SIZES, images, scale} from '../../../assets/constants';
import {showMess} from '../../../assets/constants/Helper';
import {IconError} from '../../../assets/icon/Icon';
import {CustomButton, CustomImage, CustomText} from '../../../components';
import {useLanguage} from '../../../hooks/useLanguage';

export default function QRWalletBlockChain({open, data, onClose}) {
  const {t} = useLanguage();

  const [secondEnd, setSecondEnd] = useState(false);
  const handleCopy = () => {
    Clipboard.setString(data?.wallet_address);
    showMess(t('copy_success'));
  };

  if (!open) return null;
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={!!open}
      onRequestClose={onClose}>
      <View style={styles.wrapper}>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            backgroundColor: '#00000070',
            ...StyleSheet.absoluteFill,
          }}
          onPress={onClose}
        />

        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.header}
          onPress={handleCopy}>
          <CustomImage
            source={images.logoTBH}
            style={{
              width: scale(30),
              aspectRatio: 1,
            }}
            resizeMode="contain"
          />
          <View
            style={{
              rowGap: scale(5),
              flex: 1,
            }}>
            <CustomText
              style={styles.textReceive}
              size={SIZES.xMedium}
              numberOfLines={1}
              textType="medium">
              {data?.username || data?.name || data?.title}
            </CustomText>

            <CustomText
              size={SIZES.xSmall}
              textType="medium"
              color={COLORS.text}>
              {data?.wallet_address}
            </CustomText>
          </View>
        </TouchableOpacity>

        <View
          style={{
            padding: scale(10),
            backgroundColor: '#fff',
            borderRadius: scale(10),
            rowGap: scale(10),
          }}>
          <View style={styles.content}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{...styles.box, opacity: secondEnd ? 0.3 : 1}}>
                {true ? (
                  <QRCode
                    size={scale(220)}
                    value={JSON.stringify(21321)}
                    color="#000"
                  />
                ) : (
                  <ActivityIndicator color={COLORS.primary} size="large" />
                )}
              </View>
            </View>
          </View>

          {/* <View style={styles.row}>
            <View
              style={{
                flex: 1,
                ...styles.row,
              }}>
              <CustomText size={SIZES.medium} color={COLORS.primary}>
                Tai xuống
              </CustomText>
              <IconDown fill={COLORS.primary} />
            </View>
            <View
              style={{
                flex: 1,
                ...styles.row,
              }}>
              <IconShare />
              <CustomText size={SIZES.medium} color={COLORS.primary}>
                Chia se
              </CustomText>
            </View>
          </View> */}
          <CustomText
            style={{
              width: scale(280),
            }}>
            <IconError size={scale(12)} fill={COLORS.primary} />{' '}
            {t('this_deposit_address')}
            <CustomText textType="semiBold"> TBH.TBRC20 </CustomText>
            {t('dont_deposit_other')}.
          </CustomText>
        </View>

        <CustomButton
          buttonType="normal"
          text={t('close')}
          onPress={onClose}
          style={{minWidth: scale(100), marginTop: scale(10)}}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',

    flex: 1,
    rowGap: scale(10),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(10),
  },
  header: {
    padding: scale(6),
    backgroundColor: '#fff',
    borderRadius: scale(10),
    flexDirection: 'row',
    columnGap: scale(10),
    width: scale(280),
    alignItems: 'center',
  },
});

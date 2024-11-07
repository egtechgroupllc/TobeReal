// import {
//   IconLamp,
//   IconLamp2,
//   IconPhotoScan,
//   IconX,
// } from '@tabler/icons-react-native';
import React, {useEffect, useState} from 'react';
import {
  Linking,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {QRreader, QRscanner} from 'react-native-qr-decode-image-camera';
import {requestCameraPermission} from '../../../utils/permission/requesPermissionCamera';
import {COLORS, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';
import {IconX} from '~/assets/icon/Icon';
import {CText} from '~/components';
import {useLanguage} from '~/hooks/useLanguage';
// import {COLORS, SIZES} from '~/assets/constants';
// import {scale} from '~/utils/scale';
// import {Button, CText} from '~components';

const fnFallback = () => {};
export default function ModalQrCodeScanner({
  open,
  onClose = fnFallback,
  onScanner = fnFallback,
}) {
  // useEffect(() => {
  //   const checkPermission = async () => {
  //     const permissionCamera = await requestCameraPermission();
  //   };
  //   checkPermission();
  // }, []);

  const [isFlashMode, setIsFlashMode] = useState(false);
  const {t} = useLanguage();
  const handleScannedQR = value => {
    // if (isValidURL(value.data)) {
    //   onClose(false);
    //   Linking.openURL(value.data);
    // } else {
    onScanner(JSON.parse(value.data));
    onClose(false);
    // }
  };

  const isValidURL = url => {
    const regex =
      /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    return regex.test(url);
  };

  const [uriImg, setUriImg] = useState(undefined);

  const openPhoto = async () => {
    await launchImageLibrary({mediaType: 'photo'}, async response => {
      if (response.didCancel) {
        //_console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedAsset = response.assets[0];

        const path = selectedAsset.uri;
        setUriImg(Platform.OS === 'ios' ? path.replace('file://', '') : path);
        try {
          const data = await QRreader(path);

          if (isValidURL(data)) {
            Linking.openURL(data);
            onClose(false);
          } else {
            onScanner(data);
            onClose(false);
          }
          setIsFlashMode(false);
        } catch (err) {
          //_console.log('Error: ', err);
          onClose(false);
        }
      }
    });
  };
  if (!open) {
    return null;
  }
  return (
    <Modal
      animationType="fade"
      visible={!!open}
      onRequestClose={() => {
        onClose(false);
      }}>
      <View style={{flex: 1, backgroundColor: COLORS.whiteLight}}>
        <QRscanner
          onRead={handleScannedQR}
          // flashMode={isFlashMode}
          zoom={0}
          cornerBorderLength={scale(60)}
          cornerColor="#fff"
          scanBarColor={COLORS.blueView}
          cornerBorderWidth={scale(6)}
          hintText={t('align_qr_code_to_the_frame')}
          rectHeight={scale(300)}
          rectWidth={scale(300)}
        />

        <View style={styles.header}>
          <View
            style={{
              left: scale(12),
              position: 'absolute',
            }}>
            <TouchableOpacity
              onPress={onClose}
              style={{width: scale(30), height: scale(30)}}>
              <IconX fill={COLORS.White} />
            </TouchableOpacity>
          </View>
          <View style={styles.textHeader}>
            <CText
              size={SIZES.xMedium}
              textType="medium"
              style={{color: COLORS.White}}>
              {t('scan_qr_code')}
            </CText>
          </View>
        </View>

        <View style={styles.bottom}>
          {/* <Button.Icon
            onPress={openPhoto}
            btnColor={COLORS.Dark + '50'}
            Icon={IconPhotoScan}
            size={scale(50)}
            radius={scale(10)}
            padding={scale(0)}
            strokeWidth={1.5}
          />

          <Button.Icon
            onPress={() => setIsFlashMode(prev => !prev)}
            btnColor={!isFlashMode ? COLORS.Dark + '50' : COLORS.Green}
            Icon={IconLamp2}
            size={scale(50)}
            radius={scale(10)}
            padding={scale(0)}
            strokeWidth={1.5}
          /> */}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: scale(80),
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },

  textHeader: {
    backgroundColor: '#00000050',
    borderRadius: 99,
    paddingHorizontal: scale(10),
    paddingVertical: scale(6),
  },
  bottom: {
    width: '100%',
    position: 'absolute',
    bottom: scale(100),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    columnGap: scale(40),
  },
  boxImgAdd: {
    backgroundColor: '#00000050',
    borderRadius: scale(5),
    borderWidth: 1,
    borderColor: '#fff',
    padding: scale(10),
  },

  imgAdd: {
    height: scale(30),
    width: scale(30),
  },

  boxFlashMode: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(99),
    padding: scale(6),
  },
});

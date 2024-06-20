import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, scale} from '../../../assets/constants';
import {
  IconArrowBottom,
  IconEditProfile,
  IconKey,
} from '../../../assets/icon/Icon';
import {BottomSheet, CustomButton} from '../../../components';
import {useNavigation} from '@react-navigation/native';

export default function ImportAddressWalletBtn() {
  const bottomSheetRef = useRef();

  const {navigate} = useNavigation();

  const handleImport = type => {
    bottomSheetRef.current.close();
    navigate('ImportAddressWalletScreen', {type});
  };

  return (
    <View
      style={{
        width: '100%',
      }}>
      <CustomButton
        onPress={() => bottomSheetRef.current.open()}
        text="Thêm ví hiện có"
        desc="Import an existing wallet"
        buttonType="large"
        isIconComponent
        iconLeft={
          <View style={styles.boxIcon}>
            <IconArrowBottom />
          </View>
        }
      />

      <BottomSheet
        ref={bottomSheetRef}
        titleIndicator={'Import an existing wallet'}
        snapPoints={['30%']}
        styleContent={{
          paddingHorizontal: scale(16),
          rowGap: scale(12),
        }}>
        <CustomButton
          onPress={() => handleImport('PASSPHRASE')}
          text="Cụm từ bí mật"
          desc="Sử dụng cụm từ ghi nhớ 12 từ"
          buttonType="large"
          isIconComponent
          iconLeft={
            <View style={styles.boxIcon}>
              <IconEditProfile />
            </View>
          }
        />

        <CustomButton
          onPress={() => handleImport('PRIVATE_KEY')}
          text="Private key"
          desc="Sử dụng cụm từ Private key đã lưu"
          buttonType="large"
          isIconComponent
          iconLeft={
            <View style={styles.boxIcon}>
              <IconKey />
            </View>
          }
        />
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  boxIcon: {
    padding: scale(10),
    backgroundColor: COLORS.subPrimary,
    borderRadius: 99,
  },
});

import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import CustomText from '../../../../../components/CustomText';
import {COLORS, SIZES, WIDTH, scale} from '../../../../../assets/constants';
import {TabSelect} from '../../../../../components';
import WrapperContent from '../../WrapperContent';
import {useLanguage} from '../../../../../hooks/useLanguage';
import BottomSheet from '../../../../../components/BottomSheet';

export default function Traceability({data}) {
  const {t} = useLanguage();
  const bottomSheetRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current.open();
    }
  }, [isOpen]);

  const handleOpenLink = async () => {
    await Linking.openURL(
      `https://testnet.tobescan.com/address/${data.user.wallet_address}`,
    );
  };
  return (
    <WrapperContent
      heading={t('traceability')}
      styleContent={{
        paddingHorizontal: scale(16),
        height: scale(100),
      }}>
      <TouchableOpacity onPress={handleOpenLink} activeOpacity={0.7}>
        <CustomText
          numberOfLines={2}
          style={{
            lineHeight: 18,
            color: COLORS.blue,
            textDecorationLine: 'underline',
          }}>
          {/* https://tobescan.com/address/{data?.wallet_address} */}
          {t('property_traceability')}
        </CustomText>
      </TouchableOpacity>
    </WrapperContent>
  );
}

const styles = StyleSheet.create({
  introduction: {
    // backgroundColor: '#ccc',
    width: WIDTH.widthContain,
    rowGap: scale(10),
  },
  textIntroduction: {
    fontSize: SIZES.medium,
  },
  textSubIntroduction: {
    fontSize: SIZES.xMedium,
  },
});

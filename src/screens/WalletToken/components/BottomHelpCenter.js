import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useLanguage} from '~/hooks/useLanguage';
import {IconHelp} from '~/assets/icon/Icon';
import BottomSheet from '~/components/BottomSheet';
import {scale} from '~/utils/scale';
import {COLORS, SIZES} from '~/assets/constants';
import {CText} from '~/components';

export default function BottomHelpCenter() {
  const bottomSheetRef = useRef();
  const {t} = useLanguage();
  const {navigate} = useNavigation();

  const listQuestion = [
    {
      title: t('how_to_add_tobechain'),
      uri: 'https://docs.tobescan.com/docs/getting-started/add-tobechain',
    },
    // {
    //   title: t('How to deposit to TobeChain?'),
    // },
  ];
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        style={{padding: scale(5)}}
        onPress={() => {
          bottomSheetRef.current.open();
        }}>
        <IconHelp fill={COLORS.White} />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        titleIndicator={t('help_center')}
        snapPoints={['30%']}
        styleContent={{
          paddingHorizontal: scale(16),
          rowGap: scale(12),
        }}>
        {listQuestion.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            onPress={() => {
              bottomSheetRef.current.close();
              navigate('NoBottomTab', {
                screen: 'HelpCenterTokenScreen',
                params: item,
              });
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: scale(10),
              }}>
              <View style={styles.dot} />
              <CText style={{fontSize: SIZES.medium, color: COLORS.White}}>
                {item?.title}
              </CText>
            </View>
          </TouchableOpacity>
        ))}
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  dot: {
    height: scale(5),
    width: scale(5),
    backgroundColor: COLORS.White,
    borderRadius: scale(99),
  },
});

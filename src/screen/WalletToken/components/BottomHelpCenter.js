import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';
import {BottomSheet, CustomButton, CustomText} from '../../../components';
import {IconHelp} from '../../../assets/icon/Icon';
import {COLORS, SIZES, scale} from '../../../assets/constants';
import {useLanguage} from '../../../hooks/useLanguage';
import {useNavigation} from '@react-navigation/native';

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
        <IconHelp fill={COLORS.white} />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        titleIndicator={t('help_center')}
        snapPoints={['30%']}
        styleContent={{
          paddingHorizontal: scale(16),
          rowGap: scale(12),
        }}>
        {listQuestion.map(item => (
          <TouchableOpacity
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
              <CustomText style={{fontSize: SIZES.medium}}>
                {item?.title}
              </CustomText>
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
    backgroundColor: COLORS.black,
    borderRadius: scale(99),
  },
});

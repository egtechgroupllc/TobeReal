import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import CustomText from '../../../../components/CustomText';
import {SHADOW, SIZES, scale} from '../../../../assets/constants';
import FeaturesPolicy1 from './components/FeaturesPolicy.js/FeaturesPolicy1';
import CheckBox from '../../../../components/CheckBox';
import FeaturesPolicy2 from './components/FeaturesPolicy.js/FeaturesPolicy2';
import FeaturesPolicy3 from './components/FeaturesPolicy.js/FeaturesPolicy3';
import {useNavigation} from '@react-navigation/native';
import {IconHome} from '../../../../assets/icon/Icon';
import {useLanguage} from '../../../../hooks/useLanguage';

export default function FeaturesPolicyScreen() {
  const {setOptions, navigate} = useNavigation();
  const {t} = useLanguage();

  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('services'),
      headerTitleStyle: {
        textAlign: 'center',
      },
      headerRight: () => (
        <TouchableOpacity onPress={() => navigate('PostNewsScreen')}>
          <IconHome style={{width: scale(20)}} />
        </TouchableOpacity>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View>
      <View
        style={{
          marginHorizontal: scale(10),
          backgroundColor: '#fff',
          borderRadius: scale(6),
          padding: scale(10),
          rowGap: scale(20),
          ...SHADOW,
        }}>
        <Box title={t('pet')}>
          <FeaturesPolicy1 />
        </Box>
        <Box title={t('smoking')}>
          <FeaturesPolicy2 />
        </Box>
        <Box title={t('additional_breakfast')}>
          <FeaturesPolicy3 />
        </Box>
      </View>
    </View>
  );
}

const Box = ({Icon, title, children}) => {
  return (
    <View
      style={{
        rowGap: scale(10),
      }}>
      <View
        style={{
          flexDirection: 'row',
          columnGap: scale(10),
          alignItems: 'center',
        }}>
        {Icon && <Icon />}
        <CustomText textType="bold" size={SIZES.xMedium} style={{flex: 1}}>
          {title}
        </CustomText>
      </View>
      {children}
    </View>
  );
};
const styles = StyleSheet.create({});

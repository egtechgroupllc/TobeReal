import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, scale} from '../../../../../../assets/constants';
import CustomText from '../../../../../../components/CustomText';

export default function RulesPolicy3({setValue, unregister}) {
  const {navigate} = useNavigation();

  return (
    <View
      style={{
        rowGap: scale(10),
      }}>
      <CustomText>
        Each price type can have up to 5 value-added services, for example
        Parking, massage and credit facilities.
      </CustomText>
      <CustomText
        color={COLORS.blue}
        textType="medium"
        onPress={() => navigate('FeaturesPolicyScreen')}>
        Add new value-added services
      </CustomText>
    </View>
  );
}

const styles = StyleSheet.create({});

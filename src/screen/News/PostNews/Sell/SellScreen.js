import React from 'react';
import PostNewSellScreen from './PostNewSell/PostNewSellScreen';
import MainWrapper from '../../../../components/MainWrapper';
import {StyleSheet, View} from 'react-native';
import CustomText from '../../../../components/CustomText';
import {CustomButton} from '../../../../components';
import {IconAdd, IconArrowRight} from '../../../../assets/icon/Icon';
import {COLORS, SHADOW, scale} from '../../../../assets/constants';
import {useNavigation} from '@react-navigation/native';

const list = [
  {
    title: 'I already have a property registered',
    desc: 'View and manage your registered properties',
    textBtn: 'Continue',
    navigate: 'NoBottomTab',
    screen: 'SellManagementScreen',
  },
  {
    title: 'Tôi muốn bán bất động sản',
    desc: "We're happy to hear that! Click the button below to begin listing your new accommodation. The registration process may take up to 15 minutes.",
    textBtn: 'List New Sell',
    navigate: 'PostNewSellScreen',
  },
];

export default function SellScreen() {
  const {navigate} = useNavigation();

  return (
    <MainWrapper>
      <View style={styles.content}>
        {list.map((item, index) => (
          <View style={styles.box} key={index}>
            <CustomText textType="bold">{item.title}</CustomText>
            <CustomText textType="regular">{item.desc}</CustomText>

            <CustomButton
              text={item.textBtn}
              iconRight={item.textBtn === 'Continue' ? IconArrowRight : IconAdd}
              buttonType="normal"
              styleWrapper={{
                alignSelf: 'flex-end',
              }}
              style={{
                minWidth: '40%',
              }}
              styleIcon={styles.icon}
              onPress={() => {
                navigate(
                  item.navigate,
                  item?.screen && {
                    screen: item.screen,
                    params: {isSell: true},
                  },
                );
              }}
            />
          </View>
        ))}
      </View>
    </MainWrapper>
  );
}
const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    rowGap: scale(10),
    marginTop: '30%',
  },
  box: {
    backgroundColor: COLORS.white,
    padding: scale(10),
    borderRadius: scale(6),
    rowGap: scale(10),
    width: '90%',
    ...SHADOW,
  },
  icon: {
    color: COLORS.white,
    width: scale(12),
    height: scale(12),
  },
});

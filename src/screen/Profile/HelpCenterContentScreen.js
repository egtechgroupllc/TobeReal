import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {MainWrapper} from '../../components';
import {useLanguage} from '../../hooks/useLanguage';
import {useRoute} from '@react-navigation/native';
import FaucetPoint from './ContentHelpCenter/FaucetPoint';
import {COLORS, scale} from '../../assets/constants';
import PostNews from './ContentHelpCenter/PostNews';
import SwapVoucher from './ContentHelpCenter/SwapVoucher';
import CompleteTask from './ContentHelpCenter/CompleteTask';

export default function HelpCenterContentScreen() {
  const {t} = useLanguage();
  const {params} = useRoute();
  const contentComponents = {
    faucetPoint: <FaucetPoint />,
    postNews: <PostNews />,
    swapVoucher: <SwapVoucher />,
    completeTask: <CompleteTask />,
  };
  return (
    <MainWrapper headerTitle={t(params?.title)}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: scale(10),
          paddingTop: scale(10),
          paddingBottom: scale(100),
        }}>
        {contentComponents[params?.contentKey]}
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});

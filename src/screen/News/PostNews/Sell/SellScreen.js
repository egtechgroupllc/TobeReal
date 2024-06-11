import React, {useLayoutEffect} from 'react';
import PostNewSellScreen from './PostNewSell/PostNewSellScreen';
import MainWrapper from '../../../../components/MainWrapper';
import {StyleSheet, View} from 'react-native';
import CustomText from '../../../../components/CustomText';
import {CustomButton} from '../../../../components';
import {IconAdd, IconArrowRight} from '../../../../assets/icon/Icon';
import {COLORS, SHADOW, scale} from '../../../../assets/constants';
import {useNavigation} from '@react-navigation/native';
import {useLanguage} from '../../../../hooks/useLanguage';

export default function SellScreen() {
  const {t} = useLanguage();

  const {navigate, setOptions} = useNavigation();
  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('post_new'),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const list = [
    {
      title: t('already_have_property'),
      desc: t('view_registed_properties'),
      textBtn: t('continue'),
      navigate: 'NoBottomTab',
      screen: 'SellManagementScreen',
    },
    {
      title: t('want_sell_estate'),
      desc: t('click_button_below'),
      textBtn: t('list_new_sell'),
      navigate: 'PostNewSellScreen',
    },
  ];

  return (
    <MainWrapper>
      <View style={styles.content}>
        {list.map((item, index) => (
          <View style={styles.box} key={index}>
            <CustomText textType="bold">{item.title}</CustomText>
            <CustomText textType="regular">{item.desc}</CustomText>

            <CustomButton
              text={item.textBtn}
              iconRight={
                item.textBtn === t('continue') ? IconArrowRight : IconAdd
              }
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
    marginTop: '10%',
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

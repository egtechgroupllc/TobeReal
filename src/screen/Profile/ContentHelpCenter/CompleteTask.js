import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, images, scale, SHADOW, SIZES} from '../../../assets/constants';
import {useLanguage} from '../../../hooks/useLanguage';
import {CustomImage, CustomText} from '../../../components';

export default function CompleteTask() {
  const {t} = useLanguage();
  const data = [
    {
      id: 1,
      content: t('first_select_task'),
      image: [images.tap_gift],
    },
    {
      id: 2,
      content: t('next_select_task'),
      image: [images.check_task],
    },
    {
      id: 3,
      content: t('then_complete_task'),
      image: [images.buy, images.rent, images.tour],
    },
    {
      id: 4,
      content: t('after_done_rewards'),
      image: [images.receive_reward, images.already_reward],
    },
  ];
  return (
    <View
      style={{
        rowGap: scale(20),
        padding: scale(20),
        borderWidth: scale(1),
        borderRadius: scale(10),
        borderColor: COLORS.pioBox,
      }}>
      {data?.map((item, index) => {
        return (
          <View style={{rowGap: scale(20)}} key={index}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <CustomText style={{fontSize: SIZES.xMedium}}>
                {item?.id}.{' '}
              </CustomText>
              <CustomText style={{fontSize: SIZES.xMedium}}>
                {item?.content}
              </CustomText>
            </View>
            {item?.image?.map((itemImage, indexImage) => {
              return (
                <CustomImage
                  key={`indexImage_${indexImage}`}
                  source={itemImage}
                  style={{
                    width: '100%',
                    height: scale(300),
                    backgroundColor: COLORS.white70,

                    borderRadius: scale(5),
                    ...SHADOW,
                    borderWidth: scale(1),
                    borderColor: COLORS.pioBox,
                  }}
                  resizeMode="contain"
                />
              );
            })}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({});

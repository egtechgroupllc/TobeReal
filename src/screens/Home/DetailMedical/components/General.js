import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React from 'react';
import {scale} from '~/utils/scale';
import {CImage, CText} from '~/components';
import {COLORS, images, SIZES} from '~/assets/constants';
import {IconLocation} from '~/assets/icon/Icon';
import RenderHTML from 'react-native-render-html';
import {preprocessHtml} from '~/utils/preprocessHtml';
import WorkingPlan from './WorkingPlan';
import {useLanguage} from '~/hooks/useLanguage';

export default function General({data}) {
  const {width} = useWindowDimensions();
  const {t} = useLanguage();
  return (
    <View style={{flex: 1, rowGap: scale(20)}}>
      <View
        style={{
          flexDirection: 'row',
          columnGap: scale(20),
        }}>
        <CImage
          source={{uri: data?.files}}
          // source={data?.item?.url}
          style={{
            height: scale(100),
            aspectRatio: 1,
            backgroundColor: COLORS.input,
            borderRadius: scale(10),
          }}
          resizeMode="contain"
        />

        <View style={{rowGap: scale(5), flex: 1}}>
          <CText
            numberOfLines={2}
            style={{fontSize: SIZES.xMedium, color: COLORS.White}}
            textType="bold">
            {data?.name}
          </CText>
          <View
            style={{
              flexDirection: 'row',
              columnGap: scale(5),
              alignItems: 'center',
            }}>
            <IconLocation fill={COLORS.White} width={15} height={15} />
            <CText
              style={{
                fontSize: SIZES.xMedium,
                color: COLORS.White,
                flex: 1,
              }}>
              {data?.address}
            </CText>
          </View>
        </View>
      </View>
      <RenderHTML
        contentWidth={width}
        source={preprocessHtml(data?.description)}
        baseStyle={{
          color: 'white',
        }}
        tagsStyles={{
          p: {
            marginVertical: 0,
          },
        }}
      />
      <View style={{rowGap: scale(10)}}>
        <CText style={styles.sectionTitle}>{t('working_time')}</CText>
        <WorkingPlan data={data} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: SIZES.medium,
    color: COLORS.White,
  },
});

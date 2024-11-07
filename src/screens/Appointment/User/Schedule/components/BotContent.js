import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React from 'react';
import {CText} from '~/components';
import {COLORS, SIZES} from '~/assets/constants';
import RenderHTML from 'react-native-render-html';
import {scale} from '~/utils/scale';
import {preprocessHtml} from '~/utils/preprocessHtml';
import {useLanguage} from '~/hooks/useLanguage';

export default function BotContent({data}) {
  const {width} = useWindowDimensions();
  const {t} = useLanguage();
  return (
    <View style={{paddingBottom: scale(50)}}>
      {data?.experiences && (
        <>
          <CText
            style={{fontSize: SIZES.large, color: COLORS.White}}
            textType="bold">
            {t('work_experience')}
          </CText>
          <RenderHTML
            contentWidth={width}
            source={preprocessHtml(data?.experiences)}
            baseStyle={{
              color: 'white',
            }}
            tagsStyles={{
              p: {
                marginVertical: 0,
              },
            }}
          />
        </>
      )}
      {data?.awards && (
        <>
          <CText
            style={{fontSize: SIZES.large, color: COLORS.White}}
            textType="bold">
            {t('awards')}
          </CText>
          <RenderHTML
            contentWidth={width}
            source={preprocessHtml(data?.awards)}
            baseStyle={{
              color: 'white',
            }}
            tagsStyles={{
              p: {
                marginVertical: 0,
              },
            }}
          />
        </>
      )}
      {data?.instructions && (
        <>
          <CText
            style={{fontSize: SIZES.large, color: COLORS.White}}
            textType="bold">
            {t('medical_examination_instructions')}
          </CText>
          <RenderHTML
            contentWidth={width}
            source={preprocessHtml(data?.instructions)}
            baseStyle={{
              color: 'white',
            }}
            tagsStyles={{
              p: {
                marginVertical: 0,
              },
            }}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});

import {StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import CustomText from '../../../../../components/CustomText';
import {COLORS, SIZES, WIDTH, scale} from '../../../../../assets/constants';

import {useLanguage} from '../../../../../hooks/useLanguage';
import BottomSheet from '../../../../../components/BottomSheet';
import WrapperContent from '../../WrapperContent';
import {TabSelect} from '../../../../../components';

export default function Introduction({data}) {
  const {t} = useLanguage();
  const listTab = [t('Description information'), t('Project information')];
  const bottomSheetRef = useRef();

  const [tabSelect, setTabSelect] = useState(listTab[0]);

  return (
    <WrapperContent
      heading={t('introduction')}
      styleContent={{
        paddingHorizontal: scale(16),
      }}>
      <TabSelect
        data={listTab}
        onChange={value => {
          setTabSelect(value);
        }}
        styleContent={{
          padding: scale(12),
          maxHeight: scale(200),
        }}
        renderView={() =>
          tabSelect === listTab[0] ? (
            <CustomText
              style={{
                lineHeight: 18,
              }}>
              {data?.description}
            </CustomText>
          ) : (
            <CustomText
              style={{
                lineHeight: 18,
              }}>
              Updating progress {'\n'}
              Binh Duong Investment Consulting Construction Joint Stock Company
              (BICONSI)
            </CustomText>
          )
        }
      />
      <View
        style={{
          position: 'absolute',
          bottom: scale(10),
          right: scale(30),
        }}>
        <CustomText
          textType="semiBold"
          style={{
            color: COLORS.primary,
            minWidth: scale(42),
          }}
          onPress={() => bottomSheetRef.current.open()}>
          {t('see_all')}
        </CustomText>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['50%', '80%']}
        titleIndicator={
          tabSelect === listTab[0] ? t('description_content') : 'Nearby'
        }
        styleContent={{
          paddingHorizontal: scale(16),
        }}>
        <View style={styles.content}>
          {[1, 2].map((item, index) => (
            <View key={`key-${item}-${index}`} style={styles.itemFac}>
              <View style={styles.dot} />
              <CustomText
                textType="regular"
                style={{
                  fontSize: SIZES.xMedium,
                }}>
                {data?.description}
              </CustomText>
            </View>
          ))}
        </View>
      </BottomSheet>
    </WrapperContent>
  );
}

const styles = StyleSheet.create({
  introduction: {
    // backgroundColor: '#ccc',
    width: WIDTH.widthContain,
    rowGap: scale(10),
  },
  textIntroduction: {
    fontSize: SIZES.medium,
  },
  textSubIntroduction: {
    fontSize: SIZES.xMedium,
  },
});

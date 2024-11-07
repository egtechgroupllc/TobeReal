import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {scale} from '~/utils/scale';
import {Button, CImage, CText} from '~/components';
import {COLORS, images, SIZES} from '~/assets/constants';
import {IconLocation} from '~/assets/icon/Icon';
import {IconBuildingHospital} from '@tabler/icons-react-native';
import BottomSheet from '~/components/BottomSheet';
import {useLanguage} from '~/hooks/useLanguage';
import {useNavigation} from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';

export default function TopContent({data}) {
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  const bottomSheetRef = useRef();

  return (
    <View
      style={{
        flexDirection: 'row',
        columnGap: scale(10),
        alignItems: 'center',
      }}>
      <CImage.Avatar
        source={
          data?.user?.image ? {uri: data?.user?.image} : images.iconProfile
        }
        style={{width: scale(100), height: scale(100)}}
      />
      <View style={{flex: 1, rowGap: scale(5)}}>
        {data?.user?.fullname ? (
          <CText
            style={{color: COLORS.White, fontSize: SIZES.large}}
            textType="bold">
            {data?.user?.fullname}
          </CText>
        ) : (
          <CText style={{color: COLORS.White, fontSize: SIZES.large}}>
            Doctor
          </CText>
        )}
        <CText
          style={{color: COLORS.White, fontSize: SIZES.small}}
          numberOfLines={3}
          textType="regular">
          {data?.description}
        </CText>

        <View
          style={{
            width: scale(70),
          }}>
          <Button.Text
            title={t('show_more')}
            padding={0}
            color={COLORS.cyan}
            style={{width: scale(80), fontSize: SIZES.xSmall}}
            onPress={() => bottomSheetRef.current.open()}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: scale(5),
            width: scale(230),
          }}>
          <IconLocation width={scale(15)} height={scale(15)} />
          <CText
            style={{color: COLORS.White, fontSize: SIZES.xSmall}}
            numberOfLines={2}
            textType="regular">
            {data?.user?.address}
          </CText>
        </View>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={['50%', '80%']}
        titleIndicator={t('description')}
        // onDismiss={!apply && reset}
        styleContent={{
          paddingHorizontal: scale(16),
          rowGap: scale(16),
        }}>
        <CText style={{fontSize: SIZES.xMedium, color: COLORS.White}}>
          {data?.description}
        </CText>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({});

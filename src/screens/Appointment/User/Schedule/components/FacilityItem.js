import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {COLORS, images, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';
import {CImage, CText} from '~/components';
import CheckBox from '~/components/CheckBox';
import {useNavigation} from '@react-navigation/native';
import FacilityItemLoading from './ItemLoading';
import ItemLoading from './ItemLoading';

export default function FacilityItem({
  data,
  params,
  isLoading,
  onPress,
  select,
}) {
  const {goBack, navigate} = useNavigation();

  return !isLoading ? (
    <TouchableOpacity
      onPress={() => {
        if (!params?.isDetail) {
          onPress(data);
        } else {
          navigate('DetailFacilityScreen', {
            ...data,
            isLoading: isLoading,
          });
        }
      }}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        backgroundColor: COLORS.input,
        borderRadius: scale(10),
        justifyContent: 'center',
      }}>
      <View
        style={{
          alignItems: 'center',
          width: scale(150),
          height: scale(170),
          rowGap: scale(10),
          justifyContent: 'center',
        }}>
        <CImage
          source={data?.id === 'other' ? images.hospital : {uri: data?.files}}
          style={{height: scale(80), width: '100%'}}
          resizeMode="contain"
        />
        <CText
          style={{
            color: COLORS.White,
            fontSize: SIZES.xMedium,
          }}
          numberOfLines={3}
          textType="semiBold">
          {data?.name}
        </CText>
      </View>
      {!params?.isDetail && (
        <CheckBox
          textBold
          isRadio
          isChecked={select === data}
          onPress={() => onPress(data)}
          styleWrapper={{
            position: 'absolute',
            alignSelf: 'flex-start',
            right: 0,
            top: scale(10),
          }}
          textStyle={{
            fontSize: SIZES.xMedium,
          }}
        />
      )}
    </TouchableOpacity>
  ) : (
    <ItemLoading />
  );
}

const styles = StyleSheet.create({});

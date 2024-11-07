import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';
import {CImage, CText} from '~/components';
import CheckBox from '~/components/CheckBox';
import {useNavigation} from '@react-navigation/native';
import ItemLoading from './ItemLoading';
import {useLanguage} from '~/hooks/useLanguage';

export default function SpecialtyItem({
  data,
  params,
  onPress,
  select,
  isLoading,
}) {
  const {navigate} = useNavigation();
  const {t} = useLanguage();
  return !isLoading ? (
    <TouchableOpacity
      onPress={() => {
        if (!params?.isDetail) {
          onPress(data);
        } else {
          navigate('NoBottomTab', {
            screen: 'DetailSpecialtyScreen',
            params: data,
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
          rowGap: scale(15),
          justifyContent: 'center',
        }}>
        <CImage
          source={{uri: data?.image}}
          style={{height: scale(80), aspectRatio: 1}}
          resizeMode="contain"
        />
        <CText
          style={{
            color: COLORS.White,
            fontSize: SIZES.xMedium,
          }}
          numberOfLines={3}
          textType="semiBold">
          {t(data?.name)}
        </CText>
      </View>
      {!params?.isDetail && (
        <CheckBox
          textBold
          isRadio
          isChecked={
            params?.isSelectOne
              ? select === data?.id
              : select.includes(data?.id)
          }
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

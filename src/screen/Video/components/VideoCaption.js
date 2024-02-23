import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {memo, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SIZES, scale} from '../../../assets/constants';
import CustomText from '../../../components/CustomText';
import {formatPrice} from '../../../utils/format';
import {CustomButton} from '../../../components';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import Emojis from './Emojis';

export default memo(function VideoCaption({data}) {
  const insets = useSafeAreaInsets();
  const [isMoreText, setIsMoreText] = useState(false);
  const {navigate, goBack} = useNavigation();
  console.log(1231);
  return (
    <LinearGradient
      colors={[isMoreText ? '#000000CF' : '#00000000', '#00000000']}
      start={{x: 0, y: 1}}
      end={{x: 0, y: 0}}
      style={{
        ...styles.wrapper,
        paddingBottom: scale(20),
      }}>
      <View
        style={{
          rowGap: scale(6),
          flex: 1,
        }}>
        <CustomText
          textType="bold"
          style={{
            color: '#fff',
            fontSize: SIZES.medium,
          }}>
          {data?.username}
        </CustomText>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            columnGap: scale(4),
            flex: 1,
          }}>
          <CustomText
            textType="medium"
            numberOfLines={isMoreText ? 0 : 3}
            style={{
              color: '#fff',
              fontSize: SIZES.xMedium,
            }}>
            {data?.description}
          </CustomText>
          {data?.description?.length >= 120 && (
            <CustomText
              textType="bold"
              onPress={() => setIsMoreText(!isMoreText)}
              style={{
                color: '#fff',
                fontSize: SIZES.xMedium,
              }}>
              {isMoreText ? 'Read Less' : 'Read more'}
            </CustomText>
          )}
        </View>
        <CustomText
          textType="bold"
          style={{
            color: '#fff',
            fontSize: SIZES.xMedium,
          }}>
          {formatPrice(data?.price)}
          <CustomText
            textType="medium"
            style={{
              color: '#fff',
              fontSize: SIZES.xMedium,
            }}>
            / {data?.rental}
          </CustomText>
        </CustomText>
        <CustomText
          textType="medium"
          style={{
            color: '#fff',
            fontSize: SIZES.xMedium,
          }}>
          {data?.location}
        </CustomText>
      </View>
      <View>
        <CustomButton
          text="Check it Out!"
          outline
          buttonType="medium"
          style={{borderColor: '#fff'}}
          styleText={{
            color: '#fff',
          }}
          onPress={() => {
            navigate('NoBottomTab', {
              screen: 'DetailAccommodationScreen',
              params: {jsondata: [] || [], title: '3123' || ''},
            });
          }}
        />
      </View>
    </LinearGradient>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    zIndex: 10,
    padding: scale(20),
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    columnGap: scale(10),
  },
});

import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import LinearGradient from 'react-native-linear-gradient';
import {SIZES, scale} from '../../../assets/constants';
import {CustomButton} from '../../../components';
import CustomText from '../../../components/CustomText';
import {formatPrice} from '../../../utils/format';
import {useLanguage} from '../../../hooks/useLanguage';

export default memo(function VideoCaption({data}) {
  const {navigate} = useNavigation();
  const {t} = useLanguage();

  const [isMoreText, setIsMoreText] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);

  const onTextLayout = useCallback(e => {
    if (e.nativeEvent.lines.length > 3 && !isMoreText) {
      setShowMoreButton(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LinearGradient
      colors={[isMoreText ? '#000000CF' : '#00000060', '#00000000']}
      start={{x: 0, y: 1}}
      end={{x: 0, y: 0}}
      style={styles.wrapper}>
      <View
        style={{
          rowGap: scale(6),
          flex: 1,
        }}>
        <CustomText textType="bold" style={styles.name}>
          {data?.username}
        </CustomText>

        <TouchableOpacity
          disabled={!showMoreButton}
          activeOpacity={0.7}
          onPress={() => {
            setIsMoreText(!isMoreText);
          }}>
          <Collapsible
            collapsed={!isMoreText && showMoreButton}
            collapsedHeight={scale(55)}>
            <CustomText
              onTextLayout={onTextLayout}
              textType="medium"
              numberOfLines={isMoreText ? 0 : 4}
              style={styles.textDesc}>
              {data?.description}
            </CustomText>
          </Collapsible>
        </TouchableOpacity>

        <CustomText textType="bold" style={styles.textDesc}>
          {formatPrice(data?.price)}
          <CustomText textType="medium" style={styles.textDesc}>
            <CustomText
              textType="medium"
              style={{...styles.textDesc, fontSize: SIZES.small}}>
              /
            </CustomText>{' '}
            {data?.rental}
          </CustomText>
        </CustomText>

        <CustomText textType="medium" style={styles.textDesc}>
          {data?.location}
        </CustomText>
      </View>
      <View>
        {!!showMoreButton && (
          <CustomText
            textType="bold"
            onPress={() => {
              setIsMoreText(!isMoreText);
            }}
            style={{
              ...styles.textDesc,
              padding: scale(6),
              marginBottom: scale(4),
            }}>
            {isMoreText ? t('read_less') : t('read_more')}
          </CustomText>
        )}

        <CustomButton
          text={t('check_it_out')}
          outline
          buttonType="medium"
          style={{borderColor: '#fff'}}
          styleText={{
            color: '#fff',
          }}
          // onPress={() => {
          //   navigate('NoBottomTab', {
          //     screen: 'DetailAccommodationScreen',
          //     params: {jsondata: [] || [], title: '3123' || ''},
          //   });
          // }}
        />
      </View>
    </LinearGradient>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    zIndex: 4,
    padding: scale(20),
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    columnGap: scale(10),
    paddingBottom: scale(20),
  },
  name: {
    color: '#fff',
    fontSize: SIZES.medium,
  },

  textDesc: {
    color: '#fff',
    fontSize: SIZES.xMedium,
  },
});

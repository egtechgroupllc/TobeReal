import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import LinearGradient from 'react-native-linear-gradient';
import {SIZES, scale} from '../../../assets/constants';
import {CustomButton} from '../../../components';
import CustomText from '../../../components/CustomText';
import {useLanguage} from '../../../hooks/useLanguage';
import {useQuery} from '@tanstack/react-query';
import {getListRoomDetailAccmo} from '../../../Model/api/apiAccom';
import {formatDate} from '../../../utils/format';

export default memo(function VideoCaption({data, styleBottom}) {
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
      style={{...styles.wrapper, ...styleBottom}}>
      <View style={[styles.contain]}>
        <CustomText textType="bold" style={styles.name}>
          {data?.user?.username ||
            data?.accommodation?.contact_name ||
            data?.estate?.contact_name}
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
              {data?.caption}
            </CustomText>
          </Collapsible>
        </TouchableOpacity>

        {/* <CustomText textType="bold" style={styles.textDesc}>
          {formatPrice(data?.price)}
          <CustomText textType="medium" style={styles.textDesc}>
            <CustomText
              textType="medium"
              style={{...styles.textDesc, fontSize: SIZES.small}}>
              /
            </CustomText>{' '}
            {data?.rental}
          </CustomText>
        </CustomText> */}

        <CustomText textType="medium" style={styles.textDesc}>
          {data?.accommodation?.address || data?.estate?.address}
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
          text={t('see_detail')}
          outline
          buttonType="medium"
          style={{borderColor: '#fff'}}
          styleText={{
            color: '#fff',
          }}
          onPress={() => {
            navigate('NoBottomTab', {
              screen: data?.accommodation
                ? 'DetailAccommodationScreen'
                : 'DetailBuyScreen',
              params: {data, isVideo: true},
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
  contain: {
    rowGap: scale(6),
    flex: 1,
  },
  textDesc: {
    color: '#fff',
    fontSize: SIZES.xMedium,
  },
});

import React, {useCallback, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {SHADOW, SIZES, images, scale} from '../../../../../assets/constants';
import {IconHeart} from '../../../../../assets/icon/Icon';
import CustomImage from '../../../../../components/CustomImage';
import CustomText from '../../../../../components/CustomText';
import Star from '../../../../../components/Star';
import {formatDateTime} from '../../../../../utils/format';

export default function ItemBox({style, isShadow = true, data}) {
  const [seeMoreOwn, setSeeMoreOwn] = useState(false);
  const [isBtnSeeMoreOwn, setIsBtnSeeMoreOwn] = useState(false);

  const [seeMoreUser, setSeeMoreUser] = useState(false);
  const [isBtnSeeMoreUser, setIsBtnSeeMoreUser] = useState(false);

  const onTextLayoutUser = useCallback(e => {
    if (e.nativeEvent.lines.length > 3) {
      setIsBtnSeeMoreUser(true);
    }
  }, []);
  const onTextLayoutOwn = useCallback(e => {
    if (e.nativeEvent.lines.length > 3) {
      setIsBtnSeeMoreOwn(true);
    }
  }, []);

  return (
    <View
      style={[
        styles.content,
        isShadow && {
          backgroundColor: '#fff',
          ...SHADOW,
        },
        style,
      ]}>
      <View style={styles.infoCustomer}>
        <CustomImage
          resizeMode="contain"
          source={images.avatar}
          style={styles.avatar}
        />
        <View>
          <CustomText
            textType="semiBold"
            style={{
              fontSize: SIZES.xMedium,
              flex: 1,
            }}
            numberOfLines={1}>
            {data?.user?.username}
          </CustomText>

          <Star rating={data?.rating} />
        </View>
      </View>

      <View>
        <CustomText
          textType="regular"
          numberOfLines={seeMoreUser ? 0 : isBtnSeeMoreUser ? 4 : 5}
          onTextLayout={onTextLayoutUser}>
          {data?.content}
        </CustomText>

        {isBtnSeeMoreUser && !seeMoreUser && (
          <CustomText
            textType="semiBold"
            onPress={() => setSeeMoreUser(true)}
            style={styles.moreUser}>
            <CustomText
              style={{
                color: '#687176',
              }}>
              ...
            </CustomText>
            Xem thêm
          </CustomText>
        )}
      </View>

      <View style={styles.boxOwn}>
        <CustomText
          numberOfLines={seeMoreOwn ? 0 : isBtnSeeMoreOwn ? 3 : 4}
          onTextLayout={onTextLayoutOwn}
          textType="regular"
          style={{
            color: '#687176',
          }}>
          <CustomText textType="semiBold">From the Hotel owner: </CustomText>
          Central location, friendly staff, full and delicious buffet breakfast.
          I really like the hotel's shower gel and shampoo! tasty. I really like
          hotel shower gel and shampoo! really liked the customer's shower gel
          and shampoo hotel! really liked the hotel's shower gel and shampoo!
        </CustomText>

        {isBtnSeeMoreOwn && !seeMoreOwn && (
          <CustomText
            textType="semiBold"
            onPress={() => setSeeMoreOwn(true)}
            style={styles.moreOwn}>
            <CustomText
              style={{
                color: '#687176',
              }}>
              ...
            </CustomText>
            Xem thêm
          </CustomText>
        )}
      </View>

      <View style={styles.footer}>
        <CustomText
          textType="regular"
          style={{marginTop: 'auto', color: '#687176'}}>
          {formatDateTime(data?.updatedAt, {
            dateStyle: 'dd-MM-yyyy, HH:mm',
          })}
        </CustomText>
        <TouchableOpacity
          style={{
            padding: scale(6),
            marginTop: scale(-6),
          }}>
          <IconHeart
            style={{
              width: scale(13),
              height: scale(13),
            }}
            fill={'#687176'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    width: scale(400 / 1.4),
    padding: scale(12),
    borderRadius: scale(12),
    rowGap: scale(10),
    marginBottom: scale(2),
  },
  infoCustomer: {
    flexDirection: 'row',
    columnGap: scale(10),
  },
  avatar: {
    width: scale(30),
    aspectRatio: 1,
    borderRadius: 999,
  },
  boxOwn: {
    backgroundColor: '#f5f5f5',
    borderRadius: scale(6),
    padding: scale(12),
  },
  moreUser: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    paddingHorizontal: scale(12),
  },
  moreOwn: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: scale(12),
    backgroundColor: '#f5f5f5',
    paddingHorizontal: scale(12),
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

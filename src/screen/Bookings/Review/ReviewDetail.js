import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useLanguage} from '../../../hooks/useLanguage';
import {CustomImage, CustomText, StarRating} from '../../../components';
import {COLORS, SHADOW, SIZES, images, scale} from '../../../assets/constants';
import {formatDateTime, formatNumber, formatPrice} from '../../../utils/format';
import {IconHeart} from '../../../assets/icon/Icon';

export default function ReviewDetail({data}) {
  const {t} = useLanguage();
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
    <View style={styles.boxContact}>
      <CustomText textType="bold" size={SIZES.medium}>
        {t('your_review')}
      </CustomText>
      <View style={[styles.content]}>
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
              {data?.contact_name}
            </CustomText>

            <StarRating
              rating={
                data?.accommodation_review?.rating || data?.tour_review?.rating
              }
            />
          </View>
        </View>

        <View>
          <CustomText
            textType="regular"
            numberOfLines={seeMoreUser ? 0 : isBtnSeeMoreUser ? 4 : 5}
            onTextLayout={onTextLayoutUser}>
            {data?.accommodation_review?.content || data?.tour_review?.content}
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
              {t('show_more')}
            </CustomText>
          )}
        </View>

        {/* <View style={styles.boxOwn}>
          <CustomText
            numberOfLines={seeMoreOwn ? 0 : isBtnSeeMoreOwn ? 3 : 4}
            onTextLayout={onTextLayoutOwn}
            textType="regular"
            style={{
              color: '#687176',
            }}>
            <CustomText textType="semiBold">From the Hotel owner: </CustomText>
            Thank you very much for reviewing our hotel. {'\n'}We will try to
            improve and develop further to bring the best experience to you.
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
              {t('show_more')}
            </CustomText>
          )}
        </View> */}

        <View style={styles.footer}>
          <CustomText
            textType="regular"
            style={{marginTop: 'auto', color: '#687176'}}>
            {formatDateTime(data?.tour_review?.updatedAt, {
              dateStyle: 'dd-MM-yyyy, HH:mm',
            })}
          </CustomText>
          {/* <TouchableOpacity
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
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boxContact: {
    columnGap: scale(10),
    borderTopWidth: 1,
    borderColor: COLORS.grey,
    paddingTop: scale(12),
    rowGap: scale(6),
  },
  infoContact: {
    flexDirection: 'row',
    columnGap: scale(10),
    alignItems: 'center',
  },
  avatar: {
    width: scale(30),
    height: scale(30),
    borderRadius: 99,
  },
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
  overview: {
    flexDirection: 'row',
    columnGap: scale(10),
    alignItems: 'center',
    paddingHorizontal: scale(16),
  },
  overviewNumberRating: {
    backgroundColor: COLORS.primary,
    borderRadius: scale(6),
  },
  numberRating: {
    fontSize: SIZES.xMedium,
    color: COLORS.white,
    padding: scale(10),
    minWidth: scale(40),
    textAlign: 'center',
  },
});

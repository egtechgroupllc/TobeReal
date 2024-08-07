import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SHADOW, SIZES, scale} from '../../../../../assets/constants';
import {
  IconEditProfile,
  IconError,
  IconPlayVideo,
  IconReset,
  IconTrash,
} from '../../../../../assets/icon/Icon';
import {CustomButton} from '../../../../../components';
import CustomImage from '../../../../../components/CustomImage';
import CustomText from '../../../../../components/CustomText';
import {formatDate} from '../../../../../utils/format';
import {useNavigation} from '@react-navigation/native';
import {useLanguage} from '../../../../../hooks/useLanguage';

export default function CreateSellItem({
  data,
  onPressMore,
  onEdit,
  onVideoShort,
}) {
  const {navigate} = useNavigation();
  const {t} = useLanguage();

  const dataPackagePost = useMemo(
    () => data.package_post_item?.package_post,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data.package_post_item?.package_post?.level],
  );
  const dateExpire = useMemo(
    () =>
      formatDate(data?.date_start, {
        addDays: data?.package_post_item?.number_day,
        dateStyle: 'yyyy-MM-dd',
      }),
    [data?.package_post_item?.number_day, data?.date_start],
  );
  const today = formatDate(new Date());

  return (
    <TouchableOpacity
      style={{...styles.wrapper, padding: dateExpire <= today ? 0 : scale(10)}}
      activeOpacity={0.7}
      disabled={dateExpire <= today ? true : false}
      onPress={() => {
        navigate('NoBottomTab', {screen: 'DetailBuyScreen', params: data});
      }}>
      {dateExpire <= today && (
        <View
          style={{
            position: 'absolute',
            zIndex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: COLORS.black + '80',
            rowGap: scale(20),
            borderRadius: scale(6),
          }}>
          <CustomText
            textType="semiBold"
            style={{
              color: COLORS.primary,
              fontSize: SIZES.medium,
              textAlign: 'center',
              width: '80%',
            }}>
            {t('please_repost')}!
          </CustomText>
          <View style={{flexDirection: 'row', columnGap: scale(10)}}>
            <CustomButton
              onPress={() => onEdit({isRestore: true})}
              activeOpacity={0.9}
              text={t('repost')}
              buttonType="small"
              iconRight={IconReset}
              styleIcon={{color: COLORS.white}}
              styleWrapper={{width: '30%'}}
            />
            <TouchableOpacity
              style={{...styles.box, backgroundColor: COLORS.white}}
              activeOpacity={0.7}
              onPress={onPressMore}>
              {/* <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} /> */}
              <IconTrash
                style={{
                  width: scale(20),
                  height: scale(20),
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View style={styles.top}>
        <CustomImage
          source={data.images[0].url}
          resizeMode="stretch"
          style={styles.img}
        />

        <View
          style={{
            backgroundColor:
              dataPackagePost?.level === 2
                ? '#009ba1'
                : dataPackagePost?.level === 3
                ? COLORS.primary
                : dataPackagePost?.level === 4
                ? COLORS.error
                : '#ccc',
            padding: scale(3),
            position: 'absolute',
            borderRadius: scale(3),
            left: scale(-6),
            top: scale(-5),
          }}>
          <CustomText textType="semiBold" style={{color: COLORS.white}}>
            {dataPackagePost?.name}{' '}
          </CustomText>
        </View>

        <View
          style={{
            flexDirection: 'row',
            flex: 1,
          }}>
          <CustomText
            textType="semiBold"
            numberOfLines={5}
            style={{
              flex: 1,
            }}>
            <View
              style={{
                borderRadius: scale(3),
                padding: scale(3),
                backgroundColor:
                  data?.status === 'VERIFIED'
                    ? '#42b00b'
                    : data?.status === 'VERIFYING'
                    ? COLORS.primary
                    : '#e03c31',
              }}>
              <CustomText
                textType="semiBold"
                style={{
                  color: COLORS.white,
                  fontSize: SIZES.xSmall,
                }}>
                {data?.status}
              </CustomText>
            </View>
            {'  '}
            {data?.title}
          </CustomText>
        </View>
      </View>

      <View style={{flexDirection: 'row', columnGap: scale(10)}}>
        <View style={{flex: 1}}>
          <CustomText style={styles.center}>Id</CustomText>
          <CustomText textType="medium" numberOfLines={1}>
            {data?.id}
          </CustomText>
        </View>
        <View style={{flex: 1}}>
          <CustomText style={styles.center}>{t('date_posted')}</CustomText>
          <CustomText textType="medium">{data?.date_start}</CustomText>
        </View>
        <View style={{flex: 1}}>
          <CustomText style={styles.center}>{t('expiration_date')}</CustomText>
          <CustomText textType="medium">{dateExpire}</CustomText>
        </View>
      </View>

      {data?.note && data?.status === 'NOT_APPROVED' && (
        <View style={{flexDirection: 'row', columnGap: scale(6)}}>
          <IconError />
          <CustomText
            style={{
              color: COLORS.error,
            }}>
            {data?.note}
          </CustomText>
        </View>
      )}

      <View style={{flexDirection: 'row', columnGap: scale(10)}}>
        <CustomButton
          outline
          buttonType="normal"
          iconLeft={IconEditProfile}
          text={t('edit')}
          style={{
            flex: 1,
          }}
          onPress={onEdit}
        />
        <CustomButton
          outline
          buttonType="normal"
          iconRight={IconPlayVideo}
          text={t('video_short')}
          styleIcon={{
            color: COLORS.overlay,
          }}
          style={{
            flex: 1,
          }}
          styleText={{color: COLORS.black, textType: 'regular'}}
          onPress={onVideoShort}
          styleOutline={{
            borderColor: COLORS.primary,
            backgroundColor: COLORS.subPrimary,
            borderWidth: 1,
          }}
        />
        <TouchableOpacity
          style={styles.box}
          activeOpacity={0.7}
          onPress={onPressMore}>
          {/* <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} /> */}
          <IconTrash
            style={{
              width: scale(20),
              height: scale(20),
            }}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    rowGap: scale(10),
    backgroundColor: '#fff',
    width: scale(400 / 1.3),
    borderRadius: scale(6),
    ...SHADOW,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    columnGap: scale(10),
  },
  img: {
    height: scale(90),
    width: scale(120),
    borderRadius: scale(6),
  },
  center: {
    color: COLORS.text,
    marginBottom: scale(4),
  },
  box: {
    borderRadius: scale(4),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    columnGap: scale(2),
  },
  dot: {
    borderRadius: 99,
    borderWidth: 1.4,
    aspectRatio: 1,
    borderColor: '#000',
  },
});

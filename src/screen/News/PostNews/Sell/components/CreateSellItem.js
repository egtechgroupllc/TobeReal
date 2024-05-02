import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SHADOW, SIZES, scale} from '../../../../../assets/constants';
import {
  IconEditProfile,
  IconError,
  IconTrash,
} from '../../../../../assets/icon/Icon';
import {CustomButton} from '../../../../../components';
import CustomImage from '../../../../../components/CustomImage';
import CustomText from '../../../../../components/CustomText';
import {formatDate} from '../../../../../utils/format';
import {useNavigation} from '@react-navigation/native';

export default function CreateSellItem({data, onPressMore, onEdit}) {
  const {navigate} = useNavigation();

  const dataPackagePost = useMemo(
    () => data.package_post_item?.package_post,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data.package_post_item?.package_post?.level],
  );

  return (
    <TouchableOpacity
      style={styles.wrapper}
      activeOpacity={0.7}
      onPress={() => {
        navigate('DetailBuyScreen', data);
      }}>
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
          <CustomText style={styles.center}>Mã tin</CustomText>
          <CustomText textType="medium" numberOfLines={1}>
            {data?.id}
          </CustomText>
        </View>
        <View style={{flex: 1}}>
          <CustomText style={styles.center}>Ngày đăng</CustomText>
          <CustomText textType="medium">{data?.date_start}</CustomText>
        </View>
        <View style={{flex: 1}}>
          <CustomText style={styles.center}>Ngày hết hạn</CustomText>
          <CustomText textType="medium">
            {formatDate(data?.date_start, {
              addDays: data?.package_post_item?.number_day,
              dateStyle: 'yyyy-MM-dd',
            })}
          </CustomText>
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
          text="Sửa tin"
          style={{
            flex: 1,
          }}
          onPress={onEdit}
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
    padding: scale(10),
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

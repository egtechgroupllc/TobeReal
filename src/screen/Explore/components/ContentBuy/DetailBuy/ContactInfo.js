import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  COLORS,
  SHADOW,
  SIZES,
  images,
  scale,
} from '../../../../../assets/constants';
import {
  IconArmorial,
  IconEmail,
  IconPhone,
  IconProfile,
  IconRight,
} from '../../../../../assets/icon/Icon';
import CustomImage from '../../../../../components/CustomImage';
import CustomText from '../../../../../components/CustomText';
import {useNavigation} from '@react-navigation/native';
import {useLanguage} from '../../../../../hooks/useLanguage';

export default function ContactInfo({data, onPress}) {
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.content}
        onPress={() =>
          onPress ||
          navigate('NoBottomTab', {
            screen: 'DetailBrokerScreen',
            params: data,
          })
        }>
        <View style={styles.header}>
          <CustomText
            textType="bold"
            style={{
              fontSize: SIZES.medium,
            }}>
            {t('information')}
          </CustomText>
          <IconRight />
        </View>

        <View style={styles.center}>
          <View style={{alignItems: 'center', rowGap: scale(7)}}>
            <View>
              <CustomImage source={images.avatar} style={styles.avatar} />
              {false && (
                <IconArmorial
                  style={{
                    position: 'absolute',
                    right: scale(8),
                    bottom: scale(-1),
                  }}
                />
              )}
            </View>
            {false && (
              <CustomText
                textType="medium"
                style={{
                  color: '#009BA1',
                }}>
                {t('professional_broker')}
              </CustomText>
            )}
          </View>
          <View
            style={{
              flex: 1,
            }}>
            <View style={styles.boxInfoItem}>
              <IconProfile
                fill={COLORS.primary}
                style={{
                  width: scale(20),
                  height: scale(20),
                }}
              />
              <CustomText
                textType="bold"
                style={{
                  fontSize: SIZES.xMedium,
                  flex: 1,
                }}>
                {data?.contact_name}
              </CustomText>
            </View>

            <View style={styles.subItem}>
              <View style={styles.boxInfoItem}>
                <View style={styles.boxIcon}>
                  <IconPhone
                    style={{
                      width: scale(12),
                      height: scale(12),
                    }}
                  />
                </View>
                <CustomText
                  textType="medium"
                  style={{
                    fontSize: SIZES.xMedium,
                    flex: 1,
                  }}>
                  {data?.contact_phone}
                </CustomText>
              </View>

              <View style={styles.boxInfoItem}>
                <View style={styles.boxIcon}>
                  <IconEmail
                    style={{
                      width: scale(12),
                      height: scale(12),
                    }}
                  />
                </View>
                <CustomText
                  textType="medium"
                  style={{
                    fontSize: SIZES.xMedium,
                    flex: 1,
                  }}>
                  {data?.contact_email}
                </CustomText>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    paddingVertical: scale(16),
    paddingHorizontal: scale(20),
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: scale(10),
    ...SHADOW,
  },
  header: {
    backgroundColor: '#FFCE00',
    padding: scale(10),
    borderRadius: scale(10),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
  },
  center: {
    flexDirection: 'row',
    columnGap: scale(20),
    alignItems: 'center',
    padding: scale(20),
    width: '100%',
  },
  avatar: {
    width: scale(70),
    aspectRatio: 1,
    borderRadius: scale(99),
  },
  subItem: {
    rowGap: scale(8),
    marginTop: scale(16),
    paddingLeft: scale(16),
  },
  boxInfoItem: {
    flexDirection: 'row',
    columnGap: scale(10),
    alignItems: 'center',
  },
  boxIcon: {
    padding: scale(4),
    backgroundColor: COLORS.primary,
    borderRadius: scale(6),
  },
});

/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  COLORS,
  SHADOW,
  SIZES,
  images,
  scale,
} from '../../../../../assets/constants';
import {CustomButton} from '../../../../../components';
import CustomText from '../../../../../components/CustomText';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useAuthentication} from '../../../../../hooks/useAuthentication';
import {useNavigation} from '@react-navigation/native';
import Skeleton from '../../../../../components/Skeleton';
import {useLanguage} from '../../../../../hooks/useLanguage';
import {formatPrice} from '../../../../../utils/format';
import {
  IconSupporter,
  IconX,
  LogoLine,
  LogoMessageFB,
  LogoWhatApp,
} from '../../../../../assets/icon/Icon';
import {LogoZalo} from '../../../../../assets/icon/Icon';
import LinearGradient from 'react-native-linear-gradient';

export default memo(function BookAccommodation({
  setBookHeight,
  isLoading,
  price,
  onPress,
}) {
  const insets = useSafeAreaInsets();
  const {t} = useLanguage();
  const {token} = useAuthentication();
  const {navigate} = useNavigation();
  const [openContact, setOpenContact] = useState(false);
  return (
    <View
      style={{...styles.wrapper, paddingBottom: insets.bottom - 5}}
      onLayout={e => {
        const {height} = e.nativeEvent.layout;
        setBookHeight(height);
      }}>
      <Skeleton
        visible={!isLoading}
        shimmerStyle={{
          height: scale(20),
          width: '70%',
        }}>
        <View style={styles.price}>
          <CustomText
            style={{
              fontSize: SIZES.xMedium,
            }}>
            {t('best_price_from')}
          </CustomText>
          <CustomText
            style={{
              fontSize: SIZES.medium,
            }}
            textType="bold">
            {formatPrice(price, {
              locales: 'vi',
            })}{' '}
          </CustomText>
        </View>
      </Skeleton>

      <Skeleton
        visible={!isLoading}
        shimmerStyle={{
          height: scale(48),
        }}>
        <View
          style={{
            flexDirection: 'row',
            columnGap: scale(8),
            paddingVertical: scale(10),
          }}>
          <CustomButton
            onPress={() => setOpenContact(true)}
            // outline
            buttonType="large"
            style={{flex: 1}}
            text={t('contact_host')}
            styleText={{
              fontSize: SIZES.xMedium,
            }}
          />

          {/* <CustomButton
            // onPress={() => {
            //   token ? navigate('NavigationAuth') : navigate('BookingScreen');
            // }}
            onPress={onPress}
            buttonType="large"
            style={{flex: 1}}
            text={t('BUY')}
            styleText={{
              fontSize: SIZES.xMedium,
            }}
          /> */}
        </View>
      </Skeleton>
      {openContact && (
        <View
          style={{
            height: scale(240),
            position: 'absolute',
            backgroundColor: COLORS.white,
            borderRadius: scale(20),
            borderWidth: scale(1),
            borderColor: COLORS.grey,
            width: '90%',
            alignSelf: 'center',
            top: scale(-300),
          }}>
          <View
            style={{
              height: scale(50),
              width: '100%',
              backgroundColor: COLORS.primary,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              alignItems: 'center',
              paddingHorizontal: scale(20),
              flexDirection: 'row',
            }}>
            <IconSupporter height={scale(40)} />
            <CustomText
              style={{
                fontSize: SIZES.small,
                color: COLORS.white,
              }}
              textType="bold">
              We are always here to support you
            </CustomText>
          </View>
          <TouchableOpacity
            style={{
              position: 'absolute',
              alignSelf: 'flex-end',
              padding: scale(10),
            }}
            onPress={() => setOpenContact(false)}>
            <IconX fill={'white'} />
          </TouchableOpacity>
          <View
            style={{
              alignItems: 'center',
              paddingVertical: scale(10),
              rowGap: scale(10),
            }}>
            <LinearGradient
              colors={['#FFC702', '#FFA800']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{
                width: '80%',
                height: scale(30),
                backgroundColor: COLORS.primary,
                borderRadius: scale(10),
                justifyContent: 'center',
              }}>
              <TouchableOpacity>
                <View
                  style={{
                    height: scale(22),
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: scale(50),
                    flexDirection: 'row',
                    columnGap: scale(10),
                    paddingHorizontal: scale(20),
                  }}>
                  <LogoZalo />
                  <CustomText
                    style={{
                      fontSize: SIZES.medium,
                      color: COLORS.white,
                    }}
                    textType="bold">
                    Zalo
                  </CustomText>
                </View>
              </TouchableOpacity>
            </LinearGradient>

            <LinearGradient
              colors={['#FFC702', '#FFA800']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{
                width: '80%',
                height: scale(30),
                backgroundColor: COLORS.primary,
                borderRadius: scale(10),
                justifyContent: 'center',
              }}>
              <TouchableOpacity>
                <View
                  style={{
                    height: scale(22),
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: scale(50),
                    flexDirection: 'row',
                    columnGap: scale(10),
                    paddingHorizontal: scale(20),
                  }}>
                  <LogoLine />
                  <CustomText
                    style={{
                      fontSize: SIZES.medium,
                      color: COLORS.white,
                    }}
                    textType="bold">
                    Line
                  </CustomText>
                </View>
              </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
              colors={['#FFC702', '#FFA800']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{
                width: '80%',
                height: scale(30),
                backgroundColor: COLORS.primary,
                borderRadius: scale(10),
                justifyContent: 'center',
              }}>
              <TouchableOpacity>
                <View
                  style={{
                    height: scale(22),
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: scale(50),
                    flexDirection: 'row',
                    columnGap: scale(10),
                    paddingHorizontal: scale(20),
                  }}>
                  <LogoWhatApp />
                  <CustomText
                    style={{
                      fontSize: SIZES.medium,
                      color: COLORS.white,
                    }}
                    textType="bold">
                    WhatsApp
                  </CustomText>
                </View>
              </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
              colors={['#FFC702', '#FFA800']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{
                width: '80%',
                height: scale(30),
                backgroundColor: COLORS.primary,
                borderRadius: scale(10),
                justifyContent: 'center',
              }}>
              <TouchableOpacity>
                <View
                  style={{
                    height: scale(22),
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: scale(50),
                    flexDirection: 'row',
                    columnGap: scale(10),
                  }}>
                  <LogoMessageFB />
                  <CustomText
                    style={{
                      fontSize: SIZES.medium,
                      color: COLORS.white,
                    }}
                    textType="bold">
                    Messenger
                  </CustomText>
                </View>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    minHeight: scale(100),
    rowGap: scale(10),
    padding: scale(16),
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    ...SHADOW,
    shadowOffset: {
      width: 0,
      height: -2,
    },
  },
  price: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: scale(10),
  },
});

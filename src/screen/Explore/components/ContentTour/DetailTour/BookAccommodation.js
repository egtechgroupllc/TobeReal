/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SHADOW, SIZES, scale} from '../../../../../assets/constants';
import {CustomButton} from '../../../../../components';
import CustomText from '../../../../../components/CustomText';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useAuthentication} from '../../../../../hooks/useAuthentication';
import {useNavigation} from '@react-navigation/native';
import Skeleton from '../../../../../components/Skeleton';
import {useLanguage} from '../../../../../hooks/useLanguage';
import {formatPrice} from '../../../../../utils/format';
import LinearGradient from 'react-native-linear-gradient';
import {
  IconEmail,
  IconPhone,
  IconSupporterYellow,
  IconX,
  LogoLine,
  LogoMessageFB,
  LogoWhatApp,
  LogoZalo,
} from '../../../../../assets/icon/Icon';

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
            // onPress={() => {
            //   token ? navigate('NavigationAuth') : navigate('BookingRoomScreen');
            // }}
            onPress={() => setOpenContact(true)}
            outline
            buttonType="large"
            style={{flex: 0.7}}
            text={t('contact_host')}
            styleText={{
              fontSize: SIZES.xMedium,
            }}
          />
          <CustomButton
            // onPress={() => {
            //   token ? navigate('NavigationAuth') : navigate('BookingRoomScreen');
            // }}
            onPress={onPress}
            buttonType="large"
            style={{flex: 1}}
            text={t('find_tour')}
            styleText={{
              fontSize: SIZES.xMedium,
            }}
          />
        </View>
      </Skeleton>
      {openContact && (
        <View style={styles.contact}>
          <LinearGradient
            colors={['#FFE55A', '#F0B90B']}
            start={{x: 1.2, y: 0}}
            end={{x: 0, y: 0}}
            style={{
              height: scale(50),
              width: '100%',
              // backgroundColor: COLORS.primary,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              alignItems: 'center',
              paddingHorizontal: scale(20),
              flexDirection: 'row',
              columnGap: scale(20),
            }}>
            <IconSupporterYellow height={scale(20)} width={scale(20)} />
            <CustomText
              style={{
                fontSize: SIZES.small,
                color: COLORS.black,
              }}
              textType="bold">
              We are always here to support you
            </CustomText>
          </LinearGradient>
          <TouchableOpacity
            style={{
              position: 'absolute',
              alignSelf: 'flex-end',
              padding: scale(15),
            }}
            onPress={() => setOpenContact(false)}>
            <IconX fill={'white'} width={scale(20)} height={scale(20)} />
          </TouchableOpacity>
          <View
            style={{
              alignItems: 'center',
              paddingVertical: scale(15),
              rowGap: scale(10),
            }}>
            <View
              style={{
                width: '80%',
                height: scale(35),
                backgroundColor: '#C9C9C933',
                borderRadius: scale(10),
                justifyContent: 'center',
              }}>
              <TouchableOpacity>
                <View
                  style={{
                    height: scale(22),
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: scale(50),
                    flexDirection: 'row',
                    columnGap: scale(10),
                    paddingHorizontal: scale(20),
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      columnGap: scale(20),
                    }}>
                    <LogoZalo />
                    <CustomText
                      style={{
                        fontSize: SIZES.small,
                        color: COLORS.black,
                      }}
                      textType="bold">
                      Zalo
                    </CustomText>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      columnGap: scale(10),
                    }}>
                    <IconPhone />
                    <IconEmail />
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: '80%',
                height: scale(35),
                backgroundColor: '#C9C9C933',
                borderRadius: scale(10),
                justifyContent: 'center',
              }}>
              <TouchableOpacity>
                <View
                  style={{
                    height: scale(22),
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: scale(50),
                    flexDirection: 'row',
                    columnGap: scale(10),
                    paddingHorizontal: scale(20),
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      columnGap: scale(20),
                    }}>
                    <LogoLine />
                    <CustomText
                      style={{
                        fontSize: SIZES.small,
                        color: COLORS.black,
                      }}
                      textType="bold">
                      Line
                    </CustomText>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      columnGap: scale(10),
                    }}>
                    <IconPhone />
                    <IconEmail />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '80%',
                height: scale(35),
                backgroundColor: '#C9C9C933',
                borderRadius: scale(10),
                justifyContent: 'center',
              }}>
              <TouchableOpacity>
                <View
                  style={{
                    height: scale(22),
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: scale(50),
                    flexDirection: 'row',
                    columnGap: scale(10),
                    paddingHorizontal: scale(20),
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      columnGap: scale(20),
                    }}>
                    <LogoWhatApp />
                    <CustomText
                      style={{
                        fontSize: SIZES.small,
                        color: COLORS.black,
                      }}
                      textType="bold">
                      WhatsApp
                    </CustomText>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      columnGap: scale(10),
                    }}>
                    <IconPhone />
                    <IconEmail />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '80%',
                height: scale(35),
                backgroundColor: '#C9C9C933',
                borderRadius: scale(10),
                justifyContent: 'center',
              }}>
              <TouchableOpacity>
                <View
                  style={{
                    height: scale(22),
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: scale(50),
                    flexDirection: 'row',
                    columnGap: scale(10),
                    paddingHorizontal: scale(20),
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      columnGap: scale(20),
                    }}>
                    <LogoMessageFB />
                    <CustomText
                      style={{
                        fontSize: SIZES.small,
                        color: COLORS.black,
                      }}
                      textType="bold">
                      Messenger
                    </CustomText>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      columnGap: scale(10),
                    }}>
                    <IconPhone />
                    <IconEmail />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
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
  contact: {
    height: scale(260),
    position: 'absolute',
    backgroundColor: COLORS.white,
    borderRadius: scale(20),
    borderWidth: scale(1),
    borderColor: '#CDCDCD',
    width: '90%',
    alignSelf: 'center',
    top: scale(-300),
    ...SHADOW,
  },
});

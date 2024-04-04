/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useState} from 'react';
import {
  Image,
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
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
  IconMess,
  IconPhone,
  IconSupporter,
  IconSupporterYellow,
  IconUnViewablePassword,
  IconX,
  LogoLine,
  LogoMessageFB,
  LogoWhatApp,
} from '../../../../../assets/icon/Icon';
import {LogoZalo} from '../../../../../assets/icon/Icon';
import LinearGradient from 'react-native-linear-gradient';
import CustomImage from '../../../../../components/CustomImage';

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

  const makeCallPhone = num => {
    Linking.openURL(
      `${Platform.OS === 'ios' && num ? 'telprompt:' : 'tel:'}${num}`,
    );
  };

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
          height: scale(48),
        }}>
        <View
          style={{
            flexDirection: 'row',
            columnGap: scale(8),
            paddingVertical: scale(10),
            alignSelf: 'center',
          }}>
          <CustomButton
            onPress={() => {
              // makeCallPhone('0824232339');
              Linking.openURL('https://chat.zalo.me/?phone=0824232339');
              setOpenContact(true);
            }}
            buttonType="large"
            style={{flex: 1, borderColor: '#ccc'}}
            text={'Chat qua Zalo'}
            styleText={{
              color: COLORS.black,
              fontSize: SIZES.xMedium,
            }}
            iconLeft={LogoZalo}
            styleIcon={{
              width: scale(26),
              height: scale(26),
            }}
            outline
          />

          <CustomButton
            onPress={() => {
              makeCallPhone('0824232339');
              setOpenContact(true);
            }}
            buttonType="large"
            style={{flex: 1}}
            text={'0824232339'}
            styleText={{
              fontSize: SIZES.xMedium,
            }}
            iconLeft={IconPhone}
            styleIcon={{
              color: '#fff',
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
      {/* {openContact && (
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
                    <IconMess />
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
                    <IconMess />
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
                    <IconMess />
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
                    <IconMess />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )} */}
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
  price: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: scale(10),
  },
});

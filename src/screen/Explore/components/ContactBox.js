import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, SIZES, scale, SHADOW} from '../../../assets/constants';
import {
  IconEmail,
  IconPhone,
  IconSupporterYellow,
  IconX,
  LogoLine,
  LogoMessageFB,
  LogoWhatApp,
} from '../../../assets/icon/Icon';
import CustomText from '../../../components/CustomText';

export default function ContactBox({onPress}) {
  const [openContact, setOpenContact] = useState(false);
  return (
    <View style={styles.contact}>
      <LinearGradient
        colors={COLORS.backgroundLinear}
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
            color: COLORS.white,
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
        onPress={onPress}>
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
                {/* <LogoZalo /> */}
                <CustomText
                  style={{
                    fontSize: SIZES.small,
                    color: COLORS.white,
                  }}
                  textType="bold">
                  Skype
                </CustomText>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: scale(10),
                }}>
                <IconPhone fill={COLORS.white} />
                <IconEmail fill={COLORS.white} />
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
                    color: COLORS.white,
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
                <IconPhone fill={COLORS.white} />
                <IconEmail fill={COLORS.white} />
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
                    color: COLORS.white,
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
                <IconPhone fill={COLORS.white} />
                <IconEmail fill={COLORS.white} />
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
                    color: COLORS.white,
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
                <IconPhone fill={COLORS.white} />
                <IconEmail fill={COLORS.white} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contact: {
    height: scale(260),
    position: 'absolute',
    backgroundColor: COLORS.theme,
    borderRadius: scale(20),
    borderWidth: scale(1),
    borderColor: '#CDCDCD',
    width: '90%',
    alignSelf: 'center',
    top: scale(-300),
    ...SHADOW,
  },
});

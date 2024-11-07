import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, images, SIZES} from '~/assets/constants';
import {IconRight} from '~/assets/icon/Icon';
import {CImage, CText} from '~/components';
import {useLanguage} from '~/hooks/useLanguage';
import {scale} from '~/utils/scale';

export default function CategoriesButton({
  title,
  viewpersonal,
  onPress,
  changePW,
  large,
  small,
  style,
  client,
  customerBuy,
  customerRent,
  contactPurchase,
  personalInformation,
  number,
  postManagement,
  IconSource,
  styleIcon,
  nameCountry,
}) {
  const {t} = useLanguage();
  return (
    <View style={style}>
      {large && (
        <TouchableOpacity onPress={onPress}>
          <View
            // colors={COLORS.backgroundLinear}
            // start={{x: 0, y: 0}}
            // end={{x: 0, y: 1}}
            style={styles.button}>
            <CText textType="semiBold" style={{...styles.text2}}>
              {title}
            </CText>
            <View style={{flexDirection: 'row', columnGap: scale(10)}}>
              {!nameCountry && (
                <CImage
                  source={IconSource || images.iconRight}
                  style={[styleIcon, {width: scale(10), height: scale(15)}]}
                />
              )}
              {nameCountry && (
                <>
                  <CImage
                    source={IconSource}
                    style={[
                      styleIcon,
                      {width: scale(15), height: scale(15), borderRadius: 999},
                    ]}
                  />
                  <CText textType="semiBold" style={{color: COLORS.White}}>
                    {nameCountry}
                  </CText>
                </>
              )}
            </View>
          </View>
        </TouchableOpacity>
      )}
      {postManagement && (
        <View>
          <View
            // colors={COLORS.backgroundLinear}
            // start={{x: 0, y: 0}}
            // end={{x: 0, y: 0.8}}
            style={styles.button}>
            <CText textType="medium" style={{...styles.text2}}>
              {number}
            </CText>
            <CText textType="medium" style={{...styles.text2}}>
              {title}
            </CText>
            <CText textType="medium" style={{...styles.text2}}></CText>
          </View>
        </View>
      )}
      {small && (
        <TouchableOpacity onPress={onPress}>
          <View
            // colors={COLORS.backgroundLinear}
            // start={{x: 0, y: 0}}
            // end={{x: 0, y: 1}}
            style={[styles.buttonSmall]}>
            <CText textType="bold" style={{...styles.text2}}>
              {title}
            </CText>
            <IconRight />
          </View>
        </TouchableOpacity>
      )}
      {viewpersonal && (
        <View style={styles.box}>
          <View
            style={{
              rowGap: scale(10),
            }}>
            <TouchableOpacity
              onPress={changePW}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <CText textType="bold" style={{...styles.text2, width: '97%'}}>
                {t('change_password')}
              </CText>
              <View>
                <IconRight />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={personalInformation}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <CText textType="bold" style={{...styles.text2}}>
                {t('personal_information')}
              </CText>
              <IconRight />
            </TouchableOpacity>
          </View>
        </View>
      )}
      {client && (
        <View style={styles.box}>
          <View>
            <TouchableOpacity
              onPress={customerBuy}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <CText textType="bold" style={{...styles.text2, width: '97%'}}>
                {t('customer_buy')}
              </CText>
              <View>
                <IconRight />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={customerRent}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <CText textType="bold" style={{...styles.text2}}>
                {t('customer_rent')}
              </CText>
              <IconRight />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={contactPurchase}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <CText textType="bold" style={{...styles.text2}}>
                {t('contact_purchased')}
              </CText>
              <IconRight />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.input,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: scale(4),
    height: scale(30),
    width: '100%',
    justifyContent: 'space-between',
    marginTop: scale(15),
    // borderWidth: scale(1),
    // borderColor: COLORS.primary,
    shadowColor: '#00000040',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    flexDirection: 'row',
    paddingHorizontal: scale(20),
  },
  buttonSmall: {
    alignItems: 'center',
    borderRadius: scale(4),
    height: scale(29),
    backgroundColor: COLORS.White,
    justifyContent: 'space-between',
    marginTop: scale(20),
    // flex:1,
    borderWidth: scale(0.5),
    borderColor: '#0000001A',
    flexDirection: 'row',
    paddingHorizontal: scale(7),
    minWidth: '45%',
  },
  text2: {
    fontSize: SIZES.small,
    color: COLORS.White,
  },
  box: {
    height: scale(70),
    backgroundColor: '#e3e2de',
    borderBottomStartRadius: scale(5),
    borderBottomEndRadius: scale(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    paddingTop: scale(10),
  },
});

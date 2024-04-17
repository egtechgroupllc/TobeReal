/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useState} from 'react';
import {
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, SHADOW, SIZES, scale} from '../../../../../assets/constants';
import {CustomButton} from '../../../../../components';
import CustomText from '../../../../../components/CustomText';

import {useNavigation} from '@react-navigation/native';
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
import Skeleton from '../../../../../components/Skeleton';
import {useAuthentication} from '../../../../../hooks/useAuthentication';
import {useLanguage} from '../../../../../hooks/useLanguage';
import {formatPrice} from '../../../../../utils/format';
import Modal from 'react-native-modal';

const listContact = [
  {
    icon: <LogoZalo />,
    name: 'Zalo',
    phone: '3i123y21y3u21',
    email: 'q2190320139021093@',
  },
  {
    icon: <LogoLine />,
    name: 'Line',
    phone: '3i123y21y3u21',
    email: 'q2190320139021093@',
  },
  {
    icon: <LogoWhatApp />,
    name: 'WhatApp',
    phone: '3i123y21y3u21',
    email: 'q2190320139021093@',
  },
  {
    icon: <LogoMessageFB />,
    name: 'Message',
    phone: '3i123y21y3u21',
    email: 'q2190320139021093@',
  },
];

export default memo(function BookAccommodation({
  setBookHeight,
  isLoading,
  price,
  onPress,
}) {
  const insets = useSafeAreaInsets();
  const {t} = useLanguage();
  const {token} = useAuthentication();

  const [openContact, setOpenContact] = useState(false);

  const makeCallPhone = num => {
    Linking.openURL(
      `${Platform.OS === 'ios' && num ? 'telprompt:' : 'tel:'}${num}`,
    );
  };

  return (
    <View
      style={{...styles.wrapper}}
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
            {t('price')}
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
            alignSelf: 'center',
          }}>
          {/* <CustomButton
            onPress={() => {
              // makeCallPhone('0824232339');
              // Linking.openURL('https://zalo.me/0824232339');
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
          /> */}

          <CustomButton
            onPress={() => {
              makeCallPhone('0824232339');
              setOpenContact(true);
            }}
            buttonType="medium"
            style={{flex: 0.7}}
            text={t('contact_host')}
            styleText={{
              fontSize: SIZES.xMedium,
            }}
            iconLeft={IconPhone}
            styleIcon={{
              color: '#fff',
            }}
          />

          <CustomButton
            testID={'modal-open-button'}
            onPress={() => {
              // makeCallPhone('0824232339');
              setOpenContact(true);
            }}
            buttonType="medium"
            style={{flex: 0.7}}
            text={t('contact_host')}
            styleText={{
              fontSize: SIZES.xMedium,
            }}
            iconLeft={IconPhone}
            styleIcon={{
              color: '#fff',
            }}
          />
        </View>
      </Skeleton>
      <Modal
        isVisible={openContact}
        onSwipeComplete={() => {
          setOpenContact(false);
        }}
        swipeDirection={['up', 'left', 'right', 'down']}
        onBackdropPress={() => {
          setOpenContact(false);
        }}>
        <View style={styles.contact}>
          <LinearGradient
            colors={['#FFE55A', '#F0B90B']}
            start={{x: 1.2, y: 0}}
            end={{x: 0, y: 0}}
            style={styles.contactHeader}>
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
            activeOpacity={0.7}
            style={styles.btnClose}
            onPress={() => setOpenContact(false)}>
            <IconX fill={'white'} width={scale(20)} height={scale(20)} />
          </TouchableOpacity>

          <View style={styles.listContact}>
            {listContact.map((item, index) => {
              return <Item key={index} icon={item.icon} title={item.name} />;
            })}
          </View>
        </View>
      </Modal>
    </View>
  );
});

const Item = ({title, icon}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.item}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: scale(20),
        }}>
        {icon}
        <CustomText
          style={{
            fontSize: SIZES.small,
            color: COLORS.black,
          }}
          textType="bold">
          {title}
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
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  contact: {
    backgroundColor: COLORS.white,
    borderRadius: scale(20),
    overflow: 'hidden',
  },
  price: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: scale(10),
  },
  contactHeader: {
    paddingHorizontal: scale(20),
    paddingVertical: scale(12),
    flexDirection: 'row',
    columnGap: scale(20),
  },

  btnClose: {
    position: 'absolute',
    padding: scale(10),
    right: 0,
  },

  listContact: {
    alignItems: 'center',
    paddingVertical: scale(15),
    rowGap: scale(10),
  },
  item: {
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: scale(50),
    flexDirection: 'row',
    columnGap: scale(10),
    backgroundColor: '#C9C9C933',
    paddingHorizontal: scale(20),
    paddingVertical: scale(8),
    width: '80%',
  },
});

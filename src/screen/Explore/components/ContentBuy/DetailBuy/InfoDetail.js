import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  COLORS,
  SHADOW,
  SIZES,
  images,
  scale,
} from '../../../../../assets/constants';
import {
  IconBed,
  IconBookings,
  IconClock,
  IconDirection,
  IconFurniture,
  IconLocation,
  IconRoom,
} from '../../../../../assets/icon/Icon';

import CustomImage from '../../../../../components/CustomImage';
import CustomText from '../../../../../components/CustomText';
import {useLanguage} from '../../../../../hooks/useLanguage';
import calculateTimeElapsed from '../../../../../utils/calculateTimeElapsed';
import {formatPrice} from '../../../../../utils/format';
import InfoItem from './Info/InfoItem';
import Facilities from './Info/Facilities';
import QRWalletBlockChain from '../../../../Profile/components/QRWalletBlockChain';
import QRCode from 'react-native-qrcode-svg';
import Traceability from '../../DetailAccommodation/Detail/Traceability';
import WrapperContent from '../../WrapperContent';
// import Introduction from './Introduction';

export default function InfoDetail({data, price}) {
  const {t} = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  if (!data?.wallet_address) return null;
  console.log(data);

  return (
    <WrapperContent
      noBackground
      styleContent={{
        borderBottomWidth: 1,
        borderColor: COLORS.pioBox,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          paddingHorizontal: scale(16),

          borderBottomWidth: 1,
          borderColor: COLORS.pioBox,
        }}>
        <View style={styles.wrapper}>
          <View style={styles.header}>
            <CustomText textType="semiBold" style={styles.name}>
              {data?.title}
            </CustomText>
          </View>

          <View style={styles.room}>
            <View style={styles.boxRoom}>
              <CustomText
                textType="semiBold"
                style={{
                  color: COLORS.white,
                }}>
                {data?.estate_type?.name}
              </CustomText>
            </View>

            {/* <StarRating rating={4} />

          <CustomText textType="medium">(10 Evaluate)</CustomText> */}
            {/* <TouchableOpacity activeOpacity={0.7}>
              <CustomImage
                source={images.iconTiktok}
                style={{width: scale(20), height: scale(20)}}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
              <CustomImage
                source={images.iconYoutube}
                style={{width: scale(20), height: scale(20)}}
              />
            </TouchableOpacity> */}
          </View>

          <InfoItem
            Icon={IconLocation}
            value={data?.address}
            styleIcon={{
              width: scale(14),
              height: scale(14),
            }}
          />

          {new Date() - new Date(data?.createdAt) > 0 && (
            <InfoItem
              Icon={IconClock}
              value={calculateTimeElapsed(data?.createdAt)}
              styleIcon={{
                width: scale(14),
                height: scale(14),
              }}
            />
          )}
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setIsOpen(true)}
          style={{
            backgroundColor: COLORS.white,
            padding: scale(8),
            borderRadius: scale(9),
            borderWidth: 1,
            borderColor: COLORS.pioBox,
            ...SHADOW,
          }}>
          <QRCode value={data?.wallet_address} size={scale(80)} />
        </TouchableOpacity>
      </View>

      {isOpen && (
        <QRWalletBlockChain
          data={data}
          open={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
      <Facilities data={data} />
    </WrapperContent>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    rowGap: scale(8),
    paddingBottom: scale(4),
    width: '70%',
  },
  header: {
    flexDirection: 'row',
  },

  name: {fontSize: SIZES.medium},
  text1: {fontSize: SIZES.xxSmall, width: '30%'},

  room: {
    flexDirection: 'row',
    columnGap: scale(10),
    rowGap: scale(6),
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  boxRoom: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(4),
    backgroundColor: COLORS.pioPrimary,
    padding: scale(4),
    borderRadius: scale(6),
  },
});

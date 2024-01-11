import {
  Alert,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  IconBookings,
  IconCheckBox,
  IconHeart,
  IconSearch,
  IconShare,
} from '../../assets/icon/Icon';
import {animations, scale} from '../../assets/constants';
import CustomText from '../CustomText';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import {formatNumber} from '../../utils/format';

export default React.memo(function SideBar({data}) {
  const insets = useSafeAreaInsets();
  const [isHeart, setIsHeart] = useState(true);
  const refHeart = useRef();
  const onShare = async () => {
    Share.share({
      message: `${data?.caption}\n url: ${data?.src}`,
      url: data?.src,
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  return (
    <View
      style={{
        rowGap: scale(16),
        position: 'absolute',
        right: scale(20),
        bottom: insets.bottom + scale(100),
        zIndex: 9,
        alignItems: 'center',
      }}>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          alignItems: 'center',
        }}
        onPress={() => {
          setIsHeart(!isHeart);
          refHeart.current.reset();
        }}>
        <View
          style={{
            overflow: 'hidden',
          }}>
          <LottieView
            ref={refHeart}
            loop={false}
            autoPlay={!isHeart}
            source={animations.favouriteHeart}
            resizeMode="cover"
            style={{
              width: scale(45),
              minHeight: scale(45),
              transform: [
                {
                  scale: 2.5,
                },
              ],
            }}
          />
        </View>
        <CustomText
          textType="semiBold"
          style={{color: '#fff', marginTop: scale(-6)}}>
          {formatNumber(10000)}
        </CustomText>
      </TouchableOpacity>
      <TouchableOpacity onPress={onShare} activeOpacity={0.7}>
        <IconShare
          style={{
            width: scale(34),
            height: scale(34),
          }}
        />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({});

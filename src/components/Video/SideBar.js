import LottieView from 'lottie-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Share, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SHADOW, animations, scale} from '../../assets/constants';
import {IconShare} from '../../assets/icon/Icon';
import {formatNumber} from '../../utils/format';
import CustomText from '../CustomText';

export default React.memo(function SideBar({data, isFavourite, onFavourite}) {
  const insets = useSafeAreaInsets();
  const refHeart = useRef();

  const [isHeart, setIsHeart] = useState(true);

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
  console.log(isHeart);
  useEffect(() => {
    if (isFavourite) {
      setIsHeart(!isFavourite);
    }
  }, [isFavourite]);

  return (
    <View
      style={[
        styles.wrapper,
        {
          bottom: insets.bottom + scale(150),
        },
      ]}>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          alignItems: 'center',
        }}
        onPress={() => {
          setIsHeart(!isHeart);
          refHeart.current.reset();
          onFavourite(isHeart);
        }}>
        <View
          style={{
            overflow: 'hidden',
            // ...SHADOW,
          }}>
          <LottieView
            ref={refHeart}
            loop={false}
            autoPlay={!isHeart}
            source={animations.favouriteHeart}
            resizeMode="cover"
            style={styles.favouriteHeart}
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

const styles = StyleSheet.create({
  wrapper: {
    rowGap: scale(16),
    position: 'absolute',
    right: scale(20),

    zIndex: 9,
    alignItems: 'center',
  },
  favouriteHeart: {
    width: scale(45),
    minHeight: scale(45),
    transform: [
      {
        scale: 2.5,
      },
    ],
  },
});

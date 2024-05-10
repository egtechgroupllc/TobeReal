import LottieView from 'lottie-react-native';
import React, {useRef, useState} from 'react';
import {Share, StyleSheet, TouchableOpacity, View} from 'react-native';
import {SHADOW, animations, images, scale} from '../../../assets/constants';
import {IconComment, IconShare} from '../../../assets/icon/Icon';
import CustomText from '../../../components/CustomText';
import {formatNumber} from '../../../utils/format';
import CustomImage from '../../../components/CustomImage';
SHADOW;
export default React.memo(function SideBar({data, isFavourite, onComment}) {
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

  // useEffect(() => {
  //   if (isFavourite) {
  //     setIsHeart(!isFavourite);
  //   }
  // }, [isFavourite]);

  return (
    <View style={styles.wrapper}>
      <View
        style={{
          alignItems: 'center',
          rowGap: scale(6),
          ...SHADOW,
        }}>
        <CustomImage
          source={images.avatar}
          style={{height: scale(45), aspectRatio: 1}}
        />
      </View>

      <TouchableOpacity
        activeOpacity={1}
        style={{
          alignItems: 'center',
        }}
        onPress={() => {
          setIsHeart(!isHeart);
          !isHeart && refHeart.current.reset();
          // onFavourite(isHeart);
        }}>
        <View
          style={{
            overflow: 'hidden',
            ...SHADOW,
          }}>
          <LottieView
            ref={refHeart}
            loop={false}
            autoPlay={isFavourite || !isHeart}
            source={animations.favouriteHeart}
            resizeMode="cover"
            style={styles.favouriteHeart}
          />
        </View>

        <CustomText
          textType="semiBold"
          style={{color: '#fff', marginTop: scale(-6)}}>
          {formatNumber(data?.quantityHeart)}
        </CustomText>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onComment}
        activeOpacity={0.7}
        style={{
          alignItems: 'center',
          rowGap: scale(6),
          ...SHADOW,
        }}>
        <IconComment
          style={{
            width: scale(34),
            height: scale(34),
          }}
        />
        <CustomText
          textType="semiBold"
          style={{color: '#fff', marginTop: scale(-6)}}>
          {formatNumber(data?.quantityComment)}
        </CustomText>
      </TouchableOpacity>

      <TouchableOpacity onPress={onShare} activeOpacity={0.7}>
        <IconShare
          style={{
            width: scale(34),
            height: scale(34),
            ...SHADOW,
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
    zIndex: 999,
    alignItems: 'center',
    bottom: scale(100),
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

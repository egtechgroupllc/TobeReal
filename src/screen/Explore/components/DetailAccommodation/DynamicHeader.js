import {
  Animated,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import ImageDetail from '../../../components/ImageDetail';
import OptionAccommodation from '../FindAccommodation/OptionAccommodation';
import {COLORS, SIZES, WIDTH, scale} from '../../../../assets/constants';
import {IconAdd, IconShare, IconX} from '../../../../assets/icon/Icon';
import CustomText from '../../../../components/CustomText';
import {CustomButton} from '../../../../components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Favourite from '../../../../components/Favourite';
import {useLanguage} from '../../../../hooks/useLanguage';
import Skeleton from '../../../../components/Skeleton';

const Header_Max_Height = WIDTH.heightScreen / 3;
const Header_Min_Height = scale(50);
const Scroll_Distance = Header_Max_Height - Header_Min_Height;

export default React.memo(
  forwardRef(function DynamicHeader(
    {scrollOffsetY, onSelect, data, image},
    ref,
  ) {
    const {t} = useLanguage();
    const {goBack} = useNavigation();
    const listInfo = [
      {
        text: t('detail'),
      },
      {
        text: t('facilities'),
      },
      // {
      //   text: t('location'),
      // },
      {
        text: t('room'),
      },
      {
        text: t('Review'),
      },
    ];
    const animatedTranslateY = scrollOffsetY.interpolate({
      inputRange: [0, Scroll_Distance],
      outputRange: [0, -Scroll_Distance],
      extrapolate: 'clamp',
    });
    const animatedOpacityImg = scrollOffsetY.interpolate({
      inputRange: [0, Scroll_Distance],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    const animatedOpacityText = scrollOffsetY.interpolate({
      inputRange: [Scroll_Distance / 2, Scroll_Distance],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    const animatedBackgroundHeader = scrollOffsetY.interpolate({
      inputRange: [-1, 0, Scroll_Distance, Scroll_Distance + 1],
      outputRange: [
        'transparent',
        'transparent',
        COLORS.primary,
        COLORS.primary,
      ],
      extrapolate: 'clamp',
    });

    const onShare = async () => {
      Share.share({
        message: `Temukan kenyamanan dan kemudahan di jantung kawasan Mangga Besar Jakarta yang ramai di Belvena Hotel, di mana studio yang nyaman dan dirancang secara efisien ini menjanjikan masa menginap yang nyaman bagi penjelajah perkotaan dan pelancong bisnis.`,
        url: 'https://www.agoda.com/?cid=1891474&tag=c0ba56c3-f836-b8c6-7f0e-8ab5ff0441fe&gclid=Cj0KCQiAwbitBhDIARIsABfFYIL1meATggkwP30pbwJEWDr94Q57mesRYq9RE14HRI-FIxhht18AEu4aAvGlEALw_wcB&ds=gL2Af8%2BwwrSh7B8d',
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          err && console.log(err);
        });
    };

    const [indexSelect, setIndexSelect] = useState(0);

    useImperativeHandle(
      ref,
      () => ({
        setSelect: value => {
          setIndexSelect(value);
        },
      }),
      [indexSelect],
    );

    return (
      <>
        {/* Header */}
        <Animated.View
          style={[
            styles.header,
            {
              height: Header_Min_Height,
              backgroundColor: animatedBackgroundHeader,
            },
          ]}>
          <CustomButton
            isShadow
            iconRight={IconX}
            style={styles.menu}
            onPress={goBack}
            styleIcon={{
              width: scale(20),
              height: scale(20),
            }}
          />
          <CustomText
            isAnimated
            numberOfLines={1}
            style={{
              ...styles.textName,
              opacity: animatedOpacityText,
            }}
            textType="bold">
            {data?.name || 'Name Location'}
          </CustomText>
          <View
            style={{
              flexDirection: 'row',
              columnGap: scale(10),
            }}>
            <Favourite />
            <CustomButton
              isShadow
              // text="Share"
              onPress={onShare}
              iconRight={IconShare}
              style={styles.menu}
              styleIcon={{
                width: scale(20),
                height: scale(20),
              }}
            />
          </View>
        </Animated.View>

        {/* Image */}

        <Animated.View
          style={[
            {
              transform: [
                {
                  translateY: animatedTranslateY,
                },
              ],
              zIndex: 1,
              width: '100%',
              position: 'absolute',
            },
          ]}>
          <Animated.View
            style={[
              {
                opacity: animatedOpacityImg,
              },
            ]}>
            <ImageDetail dataImg={image} />
          </Animated.View>

          <OptionAccommodation
            isShaDow
            isSelectForIndex
            styleContent={{
              columnGap: scale(8),
            }}
            select={indexSelect}
            styleWrapper={{
              flex: 0,
              height: scale(46),
            }}
            data={listInfo}
            onSelect={onSelect}
          />
        </Animated.View>
      </>
    );
  }),
);

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: COLORS.primary,
    position: 'absolute',
    paddingHorizontal: scale(16),
    // paddingVertical: scale(10),
    zIndex: 999,
    columnGap: scale(10),
  },
  menu: {
    minWidth: scale(30),
    backgroundColor: '#fff',
    width: 'auto',
  },
  textName: {
    fontSize: SIZES.medium,
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
});

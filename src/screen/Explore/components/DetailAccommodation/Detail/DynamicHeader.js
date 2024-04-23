/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import React, {forwardRef, useImperativeHandle, useMemo, useState} from 'react';
import {Animated, Share, StyleSheet, View} from 'react-native';
import {COLORS, SIZES, WIDTH, scale} from '../../../../../assets/constants';
import {IconGoBack, IconShare, IconX} from '../../../../../assets/icon/Icon';
import {CustomButton} from '../../../../../components';
import CustomText from '../../../../../components/CustomText';
import Favourite from '../../../../../components/Favourite';
import {useLanguage} from '../../../../../hooks/useLanguage';
import ImageDetail from '../../../../components/ImageDetail';
import OptionAccommodation from '../../FindAccommodation/OptionAccommodation';

const Header_Max_Height = WIDTH.heightScreen / 3;
const Header_Min_Height = scale(50);
const Scroll_Distance = Header_Max_Height - Header_Min_Height;

export default React.memo(
  forwardRef(function DynamicHeader(
    {scrollOffsetY, onSelect, data, listNav},
    ref,
  ) {
    const {goBack} = useNavigation();
    const listInfo = useMemo(() => listNav, [listNav]);

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
        message: data?.name || data?.title,
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
            iconRight={IconGoBack}
            style={styles.menu}
            onPress={goBack}
            styleIcon={{
              width: scale(14),
              height: scale(14),
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
            {data?.name || data?.title}
          </CustomText>
          <View
            style={{
              flexDirection: 'row',
              columnGap: scale(10),
            }}>
            <Favourite styleWrapper={styles.menu} />
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
            <ImageDetail arrImg={data?.images} />
          </Animated.View>

          <OptionAccommodation
            isShaDow
            styleContent={{
              columnGap: scale(8),
            }}
            selectIndex={indexSelect}
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
    width: scale(30),
    height: scale(30),
    backgroundColor: '#fff',
  },
  textName: {
    fontSize: SIZES.medium,
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
});

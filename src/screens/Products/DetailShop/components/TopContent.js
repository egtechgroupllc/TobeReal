import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {COLORS, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';
import {CImage, CText} from '~/components';
import StarRating from '../../ListProduct/components/StarRating';
import Collapsible from 'react-native-collapsible';

export default function TopContent({data}) {
  const [isMoreText, setIsMoreText] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const onTextLayout = useCallback(e => {
    if (e.nativeEvent.lines.length > 3 && !isMoreText) {
      setShowMoreButton(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={{rowGap: scale(20), paddingHorizontal: scale(16)}}>
      <View
        style={{
          backgroundColor: COLORS.input,
          borderRadius: scale(16),
          width: '100%',
          padding: scale(20),
        }}>
        <View style={{flexDirection: 'row', columnGap: scale(10)}}>
          <CImage
            source={{uri: data?.url}}
            resizeMode="cover"
            style={{
              height: scale(60),
              aspectRatio: 1,
            }}
          />
          <View
            style={{
              flex: 1,
              rowGap: scale(5),
            }}>
            <CText
              style={{
                color: COLORS.White,
                fontSize: SIZES.medium,
              }}
              textType="semiBold">
              {data?.name}
            </CText>

            <StarRating rating={2} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: scale(10),
              }}>
              <CText
                style={{
                  color: COLORS.White,
                  fontSize: SIZES.xMedium,
                }}>
                Review: 0
              </CText>
              <View
                style={{
                  height: scale(15),
                  width: scale(1),
                  backgroundColor: COLORS.White,
                }}
              />
              <CText
                style={{
                  color: COLORS.White,
                  fontSize: SIZES.xMedium,
                }}>
                Total products: 0
              </CText>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: COLORS.blueView,
          padding: scale(20),
          borderRadius: scale(16),
        }}>
        <TouchableOpacity
          disabled={!showMoreButton}
          activeOpacity={0.7}
          onPress={() => {
            setIsMoreText(!isMoreText);
          }}>
          <Collapsible
            collapsed={!isMoreText && showMoreButton}
            collapsedHeight={scale(100)}>
            <CText
              onTextLayout={onTextLayout}
              numberOfLines={isMoreText ? 0 : 5}
              style={{
                fontSize: SIZES.medium,
                color: COLORS.White,
              }}
              textType="regular">
              <CText
                style={{
                  fontSize: SIZES.large,
                  color: COLORS.White,
                }}
                textType="semiBold">
                {data?.title}
                {'\n'}
              </CText>
              {data?.description}
            </CText>
            {!isMoreText && showMoreButton ? (
              <CText style={{color: COLORS.cyan}}>Read more</CText>
            ) : (
              <CText style={{color: COLORS.cyan}}>Minimize</CText>
            )}
          </Collapsible>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

import React, {memo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {CImage, CText} from '~/components';
import {IconImg} from '~/assets/icon/Icon';
import {SIZES, WIDTH} from '~/assets/constants';
import {scale} from '~/utils/scale';
import ListImgView from '~/components/ChoosePhoto/ListImgView';
import ListImgViewQuestion from './ListImgViewQuestion';

export default memo(function ImageDetailQuestion({
  onLayout,
  arrImg,
  styleWrapper,
}) {
  const [isViewImg, setIsViewImg] = useState(false);

  // const dataImg = arrImg?.map((img, index) => ({
  //   id: img?.id,
  //   description: img?.description,
  //   index,
  //   uri: img?.url,
  // }));

  return (
    <View
      style={[
        styles.wrapper,
        arrImg?.[3] && {
          flexDirection: 'column',
        },
        styleWrapper,
      ]}
      onLayout={onLayout}>
      {isViewImg && (
        <ListImgViewQuestion
          dataImg={arrImg}
          open={isViewImg}
          onClose={() => setIsViewImg(false)}
        />
      )}
      <TouchableOpacity
        onPress={() => setIsViewImg(1)}
        activeOpacity={0.9}
        style={{
          flex: 1,
        }}>
        <CImage
          source={{uri: arrImg?.[0]}}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </TouchableOpacity>
      {arrImg?.[1] && (
        <View
          activeOpacity={0.9}
          style={{
            flex: !arrImg[2] ? 1 : 0.6,
            gap: 1,
            flexDirection: arrImg?.[3] ? 'row' : 'column',
          }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setIsViewImg(2)}
            style={{
              flex: 1,
            }}>
            <CImage
              source={{uri: arrImg?.[1]}}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </TouchableOpacity>
          {arrImg?.[2] && (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setIsViewImg(3)}
              style={{
                flex: 1,
              }}>
              <CImage
                source={{uri: arrImg?.[2]}}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </TouchableOpacity>
          )}
          {arrImg?.[3] && (
            <TouchableOpacity
              onPress={() => setIsViewImg(4)}
              activeOpacity={0.9}
              style={{
                flex: 1,
              }}>
              <CImage
                source={{uri: arrImg?.[3]}}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
              {arrImg?.[4] && (
                <View style={styles.viewImgThree}>
                  <CText textType="bold" style={styles.totalImg}>
                    +{arrImg.length - 3}
                  </CText>
                  <IconImg />
                </View>
              )}
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    width: '100%',
    height: WIDTH.heightScreen / 3,
    gap: 1,
    backgroundColor: '#fff',
  },
  totalImg: {
    color: '#fff',
    fontSize: SIZES.xMedium,
  },
  viewImgThree: {
    position: 'absolute',
    backgroundColor: '#00000090',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    zIndex: 9,
    justifyContent: 'center',
    flexDirection: 'row',
    columnGap: scale(4),
  },
});

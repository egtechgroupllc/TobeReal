import React, {memo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import ListImgView from './ListImgView';
import CImage from '../CImage';
import CText from '../CText';
import {IconImg} from '~/assets/icon/Icon';
import {SIZES, WIDTH} from '~/assets/constants';
import {scale} from '~/utils/scale';

export default memo(function ImageDetail({onLayout, arrImg, styleWrapper}) {
  const [isViewImg, setIsViewImg] = useState(false);

  const dataImg = arrImg?.map((img, index) => ({
    id: img?.id,
    description: img?.description,
    index,
    uri: img?.url,
  }));
  return (
    <View
      style={[
        styles.wrapper,
        dataImg?.[3] && {
          flexDirection: 'column',
        },
        styleWrapper,
      ]}
      onLayout={onLayout}>
      {isViewImg && (
        <ListImgView
          dataImg={arrImg ? arrImg : dataImg}
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
          source={arrImg ? {uri: arrImg?.[0]} : dataImg?.[0]}
          style={{
            width: '100%',
            height: '100%',
          }}
          resizeMode="stretch"
        />
      </TouchableOpacity>
      {dataImg?.[1] && (
        <View
          activeOpacity={0.9}
          style={{
            flex: !dataImg[2] ? 1 : 0.6,
            gap: 1,
            flexDirection: dataImg?.[3] ? 'row' : 'column',
          }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setIsViewImg(2)}
            style={{
              flex: 1,
            }}>
            <CImage
              source={dataImg?.[1]}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </TouchableOpacity>
          {dataImg?.[2] && (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setIsViewImg(3)}
              style={{
                flex: 1,
              }}>
              <CImage
                source={dataImg?.[2]}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </TouchableOpacity>
          )}
          {dataImg?.[3] && (
            <TouchableOpacity
              onPress={() => setIsViewImg(4)}
              activeOpacity={0.9}
              style={{
                flex: 1,
              }}>
              <CImage
                source={dataImg?.[3]}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
              {dataImg?.[4] && (
                <View style={styles.viewImgThree}>
                  <CText textType="bold" style={styles.totalImg}>
                    +{dataImg.length - 3}
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

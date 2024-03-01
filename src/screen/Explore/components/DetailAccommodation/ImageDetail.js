import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo, useState} from 'react';
import CustomImage from '../../../../components/CustomImage';
import {SIZES, WIDTH, scale} from '../../../../assets/constants';
import CustomText from '../../../../components/CustomText';
import {IconApartment, IconImg} from '../../../../assets/icon/Icon';
import ListImg from './ListImg';
// const listImg = [
//   'https://pix8.agoda.net/hotelImages/394352/-1/1bafe96ba726850e9276f7de411d0629.jpg?ca=7&ce=1&s=512x384',
//   'https://pix8.agoda.net/hotelImages/394352/-1/1adbb8e3752c01c9fef10ec472a8dc6c.jpg?ca=7&ce=1&s=512x384',
//   'https://pix8.agoda.net/hotelImages/394352/-1/e573e0655c431a2fb4b990e9e3d8454c.jpg?ca=7&ce=1&s=512x384',
//   'https://pix8.agoda.net/hotelImages/394352/-1/998863bd621a755d72a7352050117433.jpg?ca=7&ce=1&s=512x384',
//   'https://pix8.agoda.net/hotelImages/394352/-1/52fab92ef50f7bd0cb63da5b81ac3eed.jpg?ca=7&ce=1&s=512x384',
//   'https://pix8.agoda.net/geo/poi/22300/2_22300_04.jpg?ca=7&ce=1&s=512x384',
// ];

export default memo(function ImageDetail({onLayout, dataImg, styleWrapper}) {
  const [isViewImg, setIsViewImg] = useState(false);

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
        <ListImg
          dataImg={dataImg}
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
        <CustomImage
          source={dataImg?.[0]}
          style={{
            width: '100%',
            height: '100%',
          }}
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
            <CustomImage
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
              <CustomImage
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
              <CustomImage
                source={dataImg?.[3]}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
              {dataImg?.[4] && (
                <View style={styles.viewImgThree}>
                  <CustomText textType="bold" style={styles.totalImg}>
                    +{dataImg.length - 3}
                  </CustomText>
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

import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomImage from '../../../../components/CustomImage';
import {SIZES, WIDTH, scale} from '../../../../assets/constants';
import CustomText from '../../../../components/CustomText';
import {IconApartment, IconImg} from '../../../../assets/icon/Icon';
import ListImg from './ListImg';
const listImg = [
  'https://cdn.travelio.id/hotel/771b9-65782ba4220311eabb99df73/WhatsApp-Image-2023-12-12-at-3-32-52-PM_l.jpeg',
  'https://cdn.travelio.id/hotel/31e52-65782ba4220311eabb99df73/WhatsApp-Image-2023-12-11-at-6-17-28-PM-v1_l.jpg',
  'https://cdn.travelio.id/hotel/c6509-65782ba4220311eabb99df73/WhatsApp-Image-2023-12-12-at-3-32-49-PM_l.jpeg',
  'https://cdn.travelio.id/hotel/771b9-65782ba4220311eabb99df73/WhatsApp-Image-2023-12-12-at-3-32-52-PM_l.jpeg',
  'https://cdn.travelio.id/hotel/31e52-65782ba4220311eabb99df73/WhatsApp-Image-2023-12-11-at-6-17-28-PM-v1_l.jpg',
  'https://cdn.travelio.id/hotel/c6509-65782ba4220311eabb99df73/WhatsApp-Image-2023-12-12-at-3-32-49-PM_l.jpeg',
];

export default function ImageDetail({onLayout,dataImg=listImg,styleWrapper}) {
  const [isViewImg, setIsViewImg] = useState(false);

  return (
    <View
      style={[
        styles.wrapper,
        dataImg[3] && {
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
          source={dataImg[0]}
          style={{
            flex: 1,
          }}
        />
      </TouchableOpacity>
      {dataImg[1] && (
        <View
          activeOpacity={0.9}
          style={{
            flex: !dataImg[2] ? 1 : 0.6,
            gap: 1,
            flexDirection: dataImg[3] ? 'row' : 'column',
          }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setIsViewImg(2)}
            style={{
              flex: 1,
            }}>
            <CustomImage
              source={dataImg[1]}
              style={{
                flex: 1,
              }}
            />
          </TouchableOpacity>
          {dataImg[2] && (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setIsViewImg(3)}
              style={{
                flex: 1,
              }}>
              <CustomImage
                source={dataImg[2]}
                style={{
                  flex: 1,
                }}
              />
            </TouchableOpacity>
          )}
          {dataImg[3] && (
            <TouchableOpacity
              onPress={() => setIsViewImg(4)}
              activeOpacity={0.9}
              style={{
                flex: 1,
              }}>
              <CustomImage
                source={dataImg[3]}
                style={{
                  flex: 1,
                }}
              />
              {dataImg[4] && (
                <View style={styles.viewImgThree}>
                  <CustomText textType="bold" style={styles.totalImg}>
                    +{listImg.length - 3}
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
}

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

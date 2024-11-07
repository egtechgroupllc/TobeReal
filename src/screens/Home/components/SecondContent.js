import React, {useRef, useState, useEffect} from 'react';

import {StyleSheet, Text, View, TouchableOpacity, Animated} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {CImage, CText} from '~/components';
import {IconSearch} from '~/assets/icon/Icon';
import {scale} from '~/utils/scale';
import {COLORS, images, SIZES} from '~/assets/constants';
export const ListService = [
  {
    id: '1',
    image: images.logoSpecialist,
    title: 'Specialists \nexamination',
    color: COLORS.blue,
    navigate: 'ListOfAppointments',
  },
  {
    id: '2',
    image: images.logoMedical,
    title: 'Medical \nproducts',
    color: COLORS.cyan,
    navigate: 'NoBottomTab',
    nameScreen: 'HomeProductScreen',
  },
];
export const SecondContent = () => {
  const {navigate} = useNavigation();
  function onOpen(name) {
    navigate(`${name}`);
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [flat, setFlat] = useState();
  const [slide, setSlide] = useState([]);
  const refContainer = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    let myInterval = setInterval(() => {
      setFlat(!flat);
      if (currentIndex < slide.length) {
        setCurrentIndex(currentIndex + 1);
        refContainer.current.scrollToIndex({
          animated: true,
          index: currentIndex,
        });
      } else if (currentIndex === slide.length) {
        setCurrentIndex(0);
      }
    }, 3000);
    return () => {
      clearInterval(myInterval);
    };
  });
  const renderListService = ListService.map((item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          onOpen(item?.navigate);
        }}
        style={{
          ...styles.views,
          backgroundColor: item?.color,
          columnGap: index === 0 ? scale(10) : scale(0),
        }}
        key={item?.id}>
        <CImage
          source={item?.image}
          style={styles.image}
          resizeMode="contain"
        />
        <CText
          style={{fontSize: SIZES.xMedium, color: COLORS.White}}
          textType="bold">
          {item?.title}
        </CText>
      </TouchableOpacity>
    );
  });
  return (
    <View style={styles.view}>
      <CText
        style={{color: COLORS.White, fontSize: SIZES.medium}}
        textType="bold">
        Care service
      </CText>
      <View style={styles.viewRow}>{renderListService}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    paddingBottom: scale(10),
    paddingHorizontal: scale(20),
    rowGap: scale(15),
    // backgroundColor:'rgba(255, 255, 255, 0.1)'
  },
  viewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  views: {
    width: '48%',
    height: scale(100),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.White,
    borderRadius: scale(10),
    flexDirection: 'row',
  },

  image: {
    height: scale(32),
    width: scale(43),
    marginBottom: scale(5),
  },
  viewTextIP: {
    height: scale(45),
    flex: 1,
    paddingHorizontal: scale(15),
    backgroundColor: 'rgba(242, 248, 255, 0.2)',
    borderRadius: scale(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  imageSearch: {
    height: scale(18),
    width: scale(18),
    tintColor: COLORS.BlueBold,
  },
});

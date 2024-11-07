/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ImageBackground,
} from 'react-native';

// import {SPECIAL_HOME} from '@configs/index';
import {GET_NEWS_FEED} from '@services/NewsFeed';
import {CommonContext} from '@contexts/Common';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from '@navigation/navigator';
import {GET_DOCTORS, GET_SPECIAL} from '@services/Common';
import LinearGradient from 'react-native-linear-gradient';
import {CImage, CText} from '~/components';
import {useQuery} from '@tanstack/react-query';
import {getListDoctor, getNewsFeed, getSpecial} from '~/api/common';
import {scale} from '~/utils/scale';
import {IconArrowRight} from '~/assets/icon/Icon';
import {COLORS, images, SHADOW, SIZES} from '~/assets/constants';
import BoxPlaceItemLoading from '~/components/BoxPlaceItemLoading';
import EmptyData from '~/components/EmptyData';
import InViewport from '~/components/Loading/InViewport';
import ComprehensiveServices from './ComprehensiveService';
import {getListProduct} from '~/api/product';
import {formatPrice} from '~/utils/format';
import MedicalSpecialty from './RenderItem/Specialty';
import MedicalFacility from './RenderItem/Facility';
import OutstandingDoctor from './RenderItem/Doctor';
import Specialty from './RenderItem/Specialty';
import Facility from './RenderItem/Facility';
import Doctor from './RenderItem/Doctor';
import Product from './RenderItem/Product';
import News from './RenderItem/News';

export const ThirdContent = () => {
  //   const common = useContext(CommonContext);

  return (
    <View style={styles.view}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ComprehensiveServices />

        <View style={{rowGap: scale(10)}}>
          <Specialty />
          <Facility />
          <Doctor />
          {/* <Product /> */}
          {/* <News /> */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    paddingBottom: scale(100),
    // backgroundColor:'rgba(255, 255, 255, 0.1)'
  },
  viewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingLeft: scale(20),
    paddingRight: scale(5),
  },
  viewOurNew: {
    flexDirection: 'row',
  },
  viewDoctor: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(15),
    marginTop: scale(20),
    marginRight: scale(12),
    width: scale(130),
    height: scale(200),
    borderWidth: 2 * StyleSheet.hairlineWidth,
    borderColor: COLORS.grey,
    marginBottom: scale(40),
  },

  viewButtonNext: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.cyan,
    borderRadius: scale(7),
    width: scale(24),
    height: scale(24),
    marginLeft: scale(10),
  },
  txtLargeDark: {
    color: COLORS.White,
    fontSize: SIZES.medium,
  },
  txtNmSmbDark: {
    fontSize: SIZES.medium,

    color: COLORS.White,
  },
  txtLargeCaptionSmb: {
    fontSize: SIZES.large,

    color: COLORS.White,
  },
  txtLargeCaption: {
    fontSize: SIZES.large,
    color: COLORS.White,
    marginTop: scale(5),
  },
  txtLargeCaptionDot: {
    fontSize: SIZES.large,
    color: COLORS.greyBold,
    position: 'absolute',
    bottom: scale(10),
    right: scale(10),
  },
  image: {
    height: scale(12),
    width: scale(12),
  },
  imageDoctor: {
    width: '100%',
    height: scale(70),
  },
  imageDoctors: {
    width: scale(100),
    height: scale(100),
    marginTop: scale(10),
    borderRadius: scale(100 / 2),
  },
  viewBorder: {
    borderRadius: scale(16),
    marginBottom: scale(20),
    alignItems: 'center',
    width: scale(150),
    height: scale(175),
    rowGap: scale(10),
    padding: scale(10),
  },
});

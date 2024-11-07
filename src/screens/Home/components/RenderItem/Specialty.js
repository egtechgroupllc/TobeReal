import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {scale} from '~/utils/scale';
import {COLORS, images, SIZES} from '~/assets/constants';
import BoxPlaceItemLoading from '~/components/BoxPlaceItemLoading';
import InViewport from '~/components/Loading/InViewport';
import {IconArrowRight} from '~/assets/icon/Icon';
import {CImage, CText} from '~/components';
import {getListSpecialty, getSpecial} from '~/api/common';
import {useQuery} from '@tanstack/react-query';
import {useNavigation} from '@react-navigation/native';
import EmptyData from '~/components/EmptyData';
import {useLanguage} from '~/hooks/useLanguage';
import SpecialtyItem from './SpecialtyItem';

export default function Specialty() {
  const {navigate} = useNavigation();
  const {t} = useLanguage();

  const {data, isLoading, error} = useQuery({
    queryKey: [
      ...getListSpecialty.queryKey,
      {keyword: '', limit: 10, pageParam: 1},
    ],
    queryFn: () => getListSpecialty({keyword: '', limit: 10, pageParam: 1}),
  });

  return (
    <ImageBackground
      style={{rowGap: scale(10)}}
      source={images.bgService}
      resizeMode="stretch">
      <View style={styles.viewRow}>
        <CText style={styles.txtLargeDark} textType="bold">
          {t('medical_specialty')}
        </CText>
        <TouchableOpacity
          style={styles.viewRow}
          onPress={() => {
            navigate('NoBottomTab', {
              screen: 'ListSpecialtyScreen',
              params: {
                isDetail: true,
              },
            });
          }}>
          <CText style={styles.txtNmSmbDark}>{t('view_all')}</CText>
          <View style={styles.viewButtonNext}>
            <IconArrowRight />
          </View>
        </TouchableOpacity>
      </View>
      <InViewport
        loadingMap
        ComponentLoading={<BoxPlaceItemLoading style={styles.viewBorder} />}>
        <FlatList
          data={!isLoading ? data?.data?.rows : [...Array(4)]}
          keyExtractor={(_, index) => `key-list-history${index}`}
          horizontal
          contentContainerStyle={{
            columnGap: scale(10),
            paddingHorizontal: scale(20),
            minHeight: scale(100),
            minWidth: '100%',
          }}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={<EmptyData />}
          renderItem={({item}) => {
            return <SpecialtyItem data={item} isLoading={isLoading} />;
          }}
        />
      </InViewport>
    </ImageBackground>
  );
}

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
    aspectRatio: 1,
    height: scale(70),
    borderRadius: scale(10),
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

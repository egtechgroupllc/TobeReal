import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {getListFacility, getSpecial} from '~/api/common';
import {COLORS, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';
import {CImage, CText} from '~/components';
import BoxPlaceItemLoading from '~/components/BoxPlaceItemLoading';
import {IconArrowRight} from '~/assets/icon/Icon';
import EmptyData from '~/components/EmptyData';
import {useQuery} from '@tanstack/react-query';
import {useLanguage} from '~/hooks/useLanguage';
import FacilityItem from './FacilityItem';

export default function Facility() {
  const {navigate} = useNavigation();
  const {t} = useLanguage();

  const {data, isLoading, error} = useQuery({
    queryKey: [
      ...getListFacility.queryKey,
      {keyword: '', limit: 10, pageParam: 1},
    ],
    queryFn: () => getListFacility({keyword: '', limit: 10, pageParam: 1}),
  });

  return (
    <View style={{rowGap: scale(10)}}>
      <View style={styles.viewRow}>
        <CText style={styles.txtLargeDark} textType="bold">
          {t('medical_facility')}
        </CText>
        <TouchableOpacity
          style={styles.viewRow}
          onPress={() => {
            navigate('NoBottomTab', {
              screen: 'ListFacilityScreen',
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
      <FlatList
        data={!isLoading ? data?.data?.rows : [...Array(4)]}
        keyExtractor={(_, index) => `key-list-history${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          columnGap: scale(10),
          paddingHorizontal: scale(20),
          minHeight: scale(100),
          minWidth: '100%',
        }}
        ListEmptyComponent={<EmptyData />}
        renderItem={({item}) => {
          return <FacilityItem data={item} isLoading={isLoading} />;
        }}
      />
    </View>
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

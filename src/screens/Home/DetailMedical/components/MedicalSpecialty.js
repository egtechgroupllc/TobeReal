import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BoxPlaceItemLoading from '~/components/BoxPlaceItemLoading';
import {useNavigation} from '@react-navigation/native';
import {scale} from '~/utils/scale';
import {CImage, CText} from '~/components';
import {COLORS, SIZES} from '~/assets/constants';
import InViewport from '~/components/Loading/InViewport';
import EmptyData from '~/components/EmptyData';
import MedicalItemLoading from './MedicalItemLoading';
import {useLanguage} from '~/hooks/useLanguage';

export default function MedicalSpecialty({data, isLoading}) {
  const {navigate} = useNavigation();
  const {t} = useLanguage();
  const renderSpecialist = ({item, isLoading}) => {
    return !isLoading ? (
      <View
        style={{
          rowGap: scale(15),
          alignItems: 'center',
          width: scale(140),
          height: scale(120),
          justifyContent: 'center',
        }}>
        <CImage
          source={{uri: item?.image}}
          // source={data?.item?.url}
          style={{...styles.imageDoctor, borderRadius: scale(5)}}
          resizeMode="stretch"
        />
        <CText
          numberOfLines={2}
          textType="bold"
          style={{
            fontSize: SIZES.small,
            color: COLORS.White,
            textAlign: 'center',
          }}>
          {t(item?.name)}
        </CText>
      </View>
    ) : (
      <MedicalItemLoading style={styles.viewBorder} />
    );
  };
  return (
    <View>
      <FlatList
        data={!isLoading ? data : [...Array(4)]}
        keyExtractor={(_, index) => `key-list-history${index}`}
        horizontal
        contentContainerStyle={{
          columnGap: scale(10),
          minHeight: scale(100),
          minWidth: '100%',
        }}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={<EmptyData />}
        renderItem={({item}) => renderSpecialist({item, isLoading: isLoading})}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
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
    width: scale(120),
    height: scale(120),
    rowGap: scale(10),
  },
});

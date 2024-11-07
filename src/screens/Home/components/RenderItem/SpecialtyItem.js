import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {scale} from '~/utils/scale';
import {CImage, CText} from '~/components';
import {COLORS, SIZES} from '~/assets/constants';
import {useNavigation} from '@react-navigation/native';
import BoxPlaceItemLoading from '~/components/BoxPlaceItemLoading';
import {useLanguage} from '~/hooks/useLanguage';

export default function SpecialtyItem({isLoading, data}) {
  const {navigate} = useNavigation();
  const {t} = useLanguage();
  return (
    <View>
      {!isLoading ? (
        <TouchableOpacity
          style={styles.viewOurNew}
          key={data?.id}
          onPress={() => {
            navigate('NoBottomTab', {
              screen: 'DetailSpecialtyScreen',
              params: data,
            });
          }}>
          <View
            style={{
              ...styles.viewBorder,
              width: scale(140),
              height: scale(150),
            }}>
            <CImage
              source={{uri: data?.image}}
              // source={data?.item?.url}
              style={{...styles.imageDoctor, borderRadius: scale(5)}}
              resizeMode="stretch"
            />
            <CText
              numberOfLines={2}
              textType="bold"
              style={{fontSize: SIZES.small, color: COLORS.White, flex: 1}}>
              {t(data?.name)}
            </CText>
          </View>
        </TouchableOpacity>
      ) : (
        <BoxPlaceItemLoading style={styles.viewBorder} />
      )}
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

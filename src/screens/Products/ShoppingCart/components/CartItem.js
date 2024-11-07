import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CheckBox from '~/components/CheckBox';
import {CImage, CText} from '~/components';
import {COLORS, images, SIZES} from '~/assets/constants';
import {SwipeListView} from 'react-native-swipe-list-view';
import {formatPrice} from '~/utils/format';
import Counter from '~/components/Counter';
import {useNavigation} from '@react-navigation/native';
import {scale} from '~/utils/scale';

export default function CartItem({data, deleteItem}) {
  const {navigate} = useNavigation();
  return (
    <View style={styles.rowFront}>
      <TouchableOpacity style={styles.itemContainer}>
        <CheckBox />
        <CImage source={{uri: data?.images[0]?.url}} style={styles.image} />
        <CText
          numberOfLines={2}
          style={{color: COLORS.blue, fontSize: SIZES.xMedium}}
          textType="semiBold">
          {data?.shop}
        </CText>
      </TouchableOpacity>
      <SwipeListView
        data={data?.items}
        style={{rowGap: scale(10)}}
        keyExtractor={(_, index) => `key-list-doctor-appointment${index}`}
        renderItem={({item: value}) => (
          <TouchableOpacity style={styles.itemDetails} activeOpacity={0.9}>
            <CheckBox />
            <CImage
              source={{uri: value?.images[0]?.url}}
              style={styles.itemImage}
              resizeMode="contain"
            />
            <View style={{flex: 1}}>
              <CText
                numberOfLines={2}
                style={{color: COLORS.White, fontSize: SIZES.xMedium}}
                textType="semiBold">
                {value?.name}
              </CText>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <CText
                  numberOfLines={2}
                  style={{
                    color: COLORS.cyan,
                    fontSize: SIZES.xMedium,
                    flex: 1,
                  }}
                  textType="semiBold">
                  {formatPrice(value?.price)}
                </CText>
                <Counter
                  editable={false}
                  max={10}
                  styleWrapper={{width: '60%'}}
                  onChange={value => {}}
                  min={1}
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
        renderHiddenItem={({item: value}) => (
          <View style={styles.rowBack}>
            <TouchableOpacity
              style={styles.backRightBtn}
              onPress={() => deleteItem(data?.id, value?.id)}>
              <Text style={styles.backTextWhite}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        disableRightSwipe
        rightOpenValue={-65}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rowFront: {
    borderRadius: scale(10),
    minHeight: scale(150),
    marginHorizontal: scale(5),
    paddingHorizontal: scale(10),
    justifyContent: 'center',
    zIndex: 1,
    paddingBottom: scale(20),
    rowGap: scale(10),
    borderBottomWidth: 1,
    borderColor: COLORS.overlay,
  },
  itemContainer: {
    flexDirection: 'row',
    columnGap: scale(5),
    alignItems: 'center',
    paddingHorizontal: scale(20),
  },
  image: {
    height: scale(25),
    width: scale(50),
  },
  itemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#025B78',
    borderRadius: scale(10),
    paddingVertical: scale(5),
    paddingHorizontal: scale(20),
  },
  itemImage: {
    height: scale(70),
    aspectRatio: 1,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: COLORS.input,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderRadius: scale(10),
    zIndex: 0,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    backgroundColor: COLORS.error,

    right: 0,
    borderTopRightRadius: scale(10),
    borderBottomRightRadius: scale(10),
  },
  backTextWhite: {
    color: '#FFF',
  },
});

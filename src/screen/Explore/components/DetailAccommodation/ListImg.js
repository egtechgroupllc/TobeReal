/* eslint-disable react-hooks/exhaustive-deps */
import React, {useLayoutEffect, useMemo, useRef, useState} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, SIZES, WIDTH, scale} from '../../../../assets/constants';
import {IconGoBack} from '../../../../assets/icon/Icon';
import CustomImage from '../../../../components/CustomImage';
import CustomText from '../../../../components/CustomText';
export default function ListImg({dataImg, open, onClose}) {
  const insets = useSafeAreaInsets();

  const flatListRef = useRef(null);
  // const images = useMemo(() => dataImg.map(uri => ({uri})), [dataImg]);

  const [visible, setIsVisible] = useState(false);
  const [indexNavigation, setIndexNavigation] = useState(1);

  useLayoutEffect(() => {
    if (dataImg.length > 1) {
      flatListRef.current.scrollToIndex({
        animated: true,
        index: indexNavigation,
      });
    }
  }, [indexNavigation]);
  console.log(dataImg[0]);
  return (
    <Modal
      visible={!!open}
      transparent
      animationType={dataImg.length === 1 ? 'none' : 'fade'}
      onRequestClose={onClose && onClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: dataImg.length === 1 ? 'transparent' : '#fff',
        }}>
        {dataImg.length > 1 && (
          <>
            <View
              style={{...styles.headerBar, minHeight: insets.top + scale(35)}}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onClose && onClose}
                style={{
                  padding: scale(4),
                }}>
                <IconGoBack style={styles.icon} fill="#fff" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: insets.top + scale(35),
              }}
            />

            <FlatList
              ref={flatListRef}
              onScrollToIndexFailed={({index}) => {
                const wait = new Promise(resolve => setTimeout(resolve, 100));
                wait.then(() => {
                  setIndexNavigation(open - 1);
                });
              }}
              data={dataImg}
              contentContainerStyle={{
                rowGap: scale(6),
              }}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={{
                    width: WIDTH.widthScreen,
                    height: WIDTH.heightScreen / 3,
                  }}
                  activeOpacity={0.9}
                  onPress={() => setIsVisible(index)}>
                  <CustomImage
                    source={item}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </TouchableOpacity>
              )}
            />
          </>
        )}

        {(!!visible || dataImg.length === 1 || visible === 0) && (
          <ImageView
            images={dataImg}
            imageIndex={visible}
            visible={true}
            onRequestClose={() => {
              setIsVisible(false);
              dataImg.length === 1 && onClose && onClose();
            }}
            onImageIndexChange={e => e && setIndexNavigation(e - 1)}
            swipeToCloseEnabled={false}
            FooterComponent={({imageIndex}) => {
              const imgDetail = dataImg?.find(
                item => item?.index === imageIndex,
              );

              return (
                imgDetail?.description && (
                  <View style={styles.footer} key={imageIndex}>
                    <CustomText
                      style={{
                        color: COLORS.white,
                        fontSize: SIZES.medium,
                        flex: 1,
                      }}>
                      {imgDetail?.description}
                    </CustomText>
                  </View>
                )
              );
            }}
          />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    backgroundColor: COLORS.primary,
    position: 'absolute',
    zIndex: 99,
    width: '100%',

    alignItems: 'flex-start',
    padding: scale(10),
    justifyContent: 'flex-end',
  },
  icon: {
    width: scale(20),
    height: scale(20),
    zIndex: 9,
  },
  footer: {
    backgroundColor: COLORS.overlay,
    padding: scale(10),
    borderRadius: scale(10),
    marginBottom: scale(80),
    marginHorizontal: scale(20),
    alignSelf: 'flex-start',
  },
});

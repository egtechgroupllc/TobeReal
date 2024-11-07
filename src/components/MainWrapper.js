import {useHeaderHeight} from '@react-navigation/elements';
import React, {memo, useLayoutEffect, useRef} from 'react';
import {ImageBackground, RefreshControl, StyleSheet, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

import {COLORS, images, SIZES} from '../assets/constants';
import {scale} from '~/utils/scale';
import {useQueryClient} from '@tanstack/react-query';

export default function MainWrapper({
  children,
  backgroundColor,
  styleContent,
  styleWrapper,
  styleScroll,
  noSafeArea,
  scrollEnabled = true,
  noImgColor = true,
  noBackgroundColor,
  onScroll = () => {},
  headerTitle,
  headerShown = true,
  optionsHeader,
  radius = scale(20),
  sourceImage,
  refreshControl = false,
}) {
  const {setOptions} = useNavigation();

  useLayoutEffect(() => {
    if (headerTitle || optionsHeader) {
      setOptions({
        headerShown: headerShown,
        headerTitle: headerTitle || '',
        ...optionsHeader,
      });
    }
  }, [headerTitle, optionsHeader, headerShown]);

  return (
    <ContentMemo
      children={children}
      backgroundColor={backgroundColor}
      styleContent={styleContent}
      styleWrapper={styleWrapper}
      noSafeArea={noSafeArea}
      scrollEnabled={scrollEnabled}
      noImgColor={noImgColor}
      onScroll={onScroll}
      noBackgroundColor={noBackgroundColor}
      radius={radius}
      styleScroll={styleScroll}
      sourceImage={sourceImage}
      refreshControl={refreshControl}
    />
  );
}

const ContentMemo = memo(
  ({
    children,
    radius,
    backgroundColor,
    styleContent,
    styleWrapper,
    noSafeArea,
    noBackgroundColor,
    scrollEnabled = true,
    noImgColor,
    styleScroll,
    onScroll = () => {},
    sourceImage,
    refreshControl,
  }) => {
    const headerHeight = useHeaderHeight();

    const Component = !noImgColor ? View : ImageBackground;
    const {top} = useSafeAreaInsets();

    const _radius = {
      borderTopLeftRadius: radius,
      borderTopRightRadius: radius,
    };
    const queryClient = useQueryClient();

    const refresh = useRef(false);
    function pullToRefresh(value) {
      refresh.current = true;
      queryClient.invalidateQueries();
      refresh.current = false;
    }
    return (
      <SafeAreaView style={{flex: 1}} edges={['right', 'left']}>
        <Component
          tintColor={!noImgColor && backgroundColor}
          source={sourceImage || images.background}
          resizeMode="stretch"
          style={[
            styles.wrapper,
            {
              // backgroundColor: COLORS.body,
              paddingTop:
                noSafeArea || !!headerHeight
                  ? headerHeight + SIZES.xxSmall
                  : top + SIZES.small,
            },
            backgroundColor && {backgroundColor},
            styleWrapper,
          ]}>
          {scrollEnabled ? (
            <ScrollView
              overScrollMode="never"
              nestedScrollEnabled
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              scrollEnabled={scrollEnabled}
              onScroll={onScroll}
              refreshControl={
                refreshControl && (
                  <RefreshControl
                    refreshing={refresh.current}
                    onRefresh={pullToRefresh}
                    tintColor={COLORS.White}
                  />
                )
              }
              style={{
                paddingBottom: scale(20),
                ..._radius,
                backgroundColor: noBackgroundColor
                  ? 'transparent'
                  : backgroundColor || COLORS.body,
                ...styleScroll,
                height: '100%',
              }}
              contentContainerStyle={{
                minHeight: '100%',
              }}
              scrollEventThrottle={16}>
              <View
                style={{
                  ...styles.content,
                  ...styleContent,
                }}>
                {children}
              </View>
            </ScrollView>
          ) : (
            <View
              style={{
                flex: 1,
                overflow: 'hidden',
                ..._radius,
                backgroundColor: noBackgroundColor
                  ? 'transparent'
                  : backgroundColor || COLORS.body,
                ...styleContent,
              }}>
              {children}
            </View>
          )}
        </Component>
      </SafeAreaView>
    );
  },
);

const styles = StyleSheet.create({
  wrapper: {
    // backgroundColor: COLORS.Blue,
    flex: 1,
    // maxWidth: scale(400),
    // alignSelf: 'center',
  },
  content: {
    flex: 1,
    paddingTop: scale(20),
    paddingBottom: scale(20),
  },
});

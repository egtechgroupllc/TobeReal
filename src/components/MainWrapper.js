import {useHeaderHeight} from '@react-navigation/elements';
import {useQueryClient} from '@tanstack/react-query';
import React, {useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {COLORS, images, scale} from '../assets/constants';
import CustomImage from './CustomImage';

export default function MainWrapper({
  children,
  backgroundColor,
  styleContent,
  styleWrapper,
  noSafeArea,
  refreshControl = false,
  scrollEnabled = true,
  noImgColor,
  onScroll = () => {},
}) {
  const headerHeight = useHeaderHeight();
  const [refresh, setRefresh] = useState(false);
  const queryClient = useQueryClient();

  function pullToRefresh() {
    setRefresh(true);
    queryClient.invalidateQueries();
    setRefresh(false);
  }
  const Component = noImgColor ? View : CustomImage;

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: COLORS.primary}}
      edges={noSafeArea || !!headerHeight ? [''] : ['top', 'right', 'left']}>
      <Component
        source={images.background}
        resizeMode="stretch"
        style={[
          styles.wrapper,
          {backgroundColor: '#f7f9fa'},
          backgroundColor && {backgroundColor},
          styleWrapper,
        ]}>
        <View />
        {scrollEnabled ? (
          <ScrollView
            refreshControl={
              refreshControl && (
                <RefreshControl
                  refreshing={refresh}
                  onRefresh={pullToRefresh}
                  tintColor={COLORS.primary}
                />
              )
            }
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            scrollEnabled={scrollEnabled}
            onScroll={onScroll}
            scrollEventThrottle={16}>
            <View style={{flex: 1, paddingBottom: scale(20), ...styleContent}}>
              {children}
            </View>
          </ScrollView>
        ) : (
          <View style={{flex: 1, ...styleContent}}>{children}</View>
        )}
      </Component>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // maxWidth: scale(400),
    // alignSelf: 'center',
  },
});

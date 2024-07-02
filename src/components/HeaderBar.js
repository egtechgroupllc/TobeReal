import {useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, SIZES, scale} from '../assets/constants';
import {IconGoBack} from '../assets/icon/Icon';
import CustomText from './CustomText';

export default memo(function HeaderBar({back, navigation, options, route}) {
  const {goBack, navigate} = useNavigation();
  const insets = useSafeAreaInsets();

  if (!options?.headerShown) return null;
  return (
    <View
      style={[styles.wrapper, {paddingTop: insets.top}, options?.headerStyle]}>
      <View
        style={{
          flex: options?.headerTitleStyle?.textAlign === 'left' ? 0 : 1,
          alignItems: 'flex-start',
          ...options?.headerLeftStyle,
        }}>
        {(options?.isGoBack || (!!back && !options?.headerLeft)) && (
          <Pressable
            onPress={() => {
              options?.headerLeftNavigate
                ? navigate(options?.headerLeftNavigate)
                : goBack();
            }}
            style={{padding: scale(6), paddingHorizontal: scale(8)}}>
            <IconGoBack
              fill={options?.headerTitleStyle?.color || '#fff'}
              style={{
                width: scale(16),
                height: scale(16),
              }}
            />
          </Pressable>
        )}

        {options?.headerLeft && options?.headerLeft()}
      </View>

      {!options?.headerTitleComponent ? (
        <CustomText
          textType="semiBold"
          style={[styles.textHeader, options?.headerTitleStyle]}
          numberOfLines={1}>
          {options?.headerTitle || options?.title}
        </CustomText>
      ) : (
        options?.headerTitleComponent()
      )}

      <View
        style={{
          alignItems: 'flex-end',
          flex: options?.headerTitleStyle?.textAlign === 'right' ? 0 : 1,
          ...options?.headerRight,
        }}>
        {options?.headerRight && options?.headerRight()}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    minHeight: scale(40),
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: scale(16),
    paddingVertical: scale(2),
    columnGap: scale(10),
    // overflow: 'hidden',
  },
  active: {
    minWidth: scale(30),
    backgroundColor: '#fff',
  },
  textHeader: {
    fontSize: SIZES.medium,
    maxWidth: scale(300),
    textAlign: 'center',
    color: COLORS.white,
  },
});

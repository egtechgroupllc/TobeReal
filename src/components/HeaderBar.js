import {useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {ImageBackground, Pressable, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CText from './CText';
import {scale} from '~/utils/scale';
import {COLORS, SIZES, images} from '~/assets/constants';
import {IconArrowLeft} from '@tabler/icons-react-native';
import Button from './Button';

export default memo(function HeaderBar({back, navigation, options, route}) {
  const {goBack, navigate} = useNavigation();
  const insets = useSafeAreaInsets();
  if (!options?.headerShown) return null;
  return (
    <View
      tintColor={options?.headerStyle?.backgroundColor}
      source={images.background}
      style={[styles.wrapper, {paddingTop: insets.top}, options?.headerStyle]}>
      {options?.headerComponent ? (
        options?.headerComponent()
      ) : (
        <>
          <View
            style={{
              flex: 0,
              alignItems: 'flex-start',
              ...options?.headerLeftStyle,
            }}>
            {(options?.isGoBack || (!!back && !options?.headerLeft)) && (
              <Button.Icon
                onPress={() => {
                  options?.headerLeftNavigate
                    ? navigate(options?.headerLeftNavigate)
                    : goBack();
                }}
                Icon={IconArrowLeft}
                size={scale(20)}
                padding={scale(4)}
                color={options?.headerTitleStyle?.color || COLORS.White}
                style={{
                  marginHorizontal: scale(6),
                }}
              />
            )}

            {options?.headerLeft && options?.headerLeft()}
          </View>

          {!options?.headerTitleComponent ? (
            <CText
              size={SIZES.xMedium}
              textType="medium"
              color={COLORS.White}
              style={[styles.textHeader, options?.headerTitleStyle]}
              numberOfLines={1}>
              {options?.headerTitle || options?.title}
            </CText>
          ) : (
            options?.headerTitleComponent()
          )}

          <View
            style={{
              alignItems: 'flex-end',
              flex: options?.headerTitleStyle?.textAlign === 'right' ? 0 : 1,
              ...options?.headerRightStyle,
            }}>
            {options?.headerRight && options?.headerRight()}
          </View>
        </>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    minHeight: scale(40),
    // backgroundColor: COLORS.primary,
    backgroundColor: 'transparent',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: scale(10),
    paddingVertical: scale(4),
    columnGap: scale(10),
    // overflow: 'hidden',
  },
  active: {
    minWidth: scale(30),
    backgroundColor: '#fff',
  },
  textHeader: {
    fontSize: SIZES.medium,
    maxWidth: '70%',
    color: COLORS.White,
    textAlign: 'left',
  },
});

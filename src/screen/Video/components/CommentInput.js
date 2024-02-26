import React, {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  KeyboardEvents,
  KeyboardStickyView,
} from 'react-native-keyboard-controller';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, images, scale} from '../../../assets/constants';
import {
  IconEmojiFace,
  IconGoBack,
  IconKeyBroad,
} from '../../../assets/icon/Icon';
import {CustomInput} from '../../../components';
import CustomImage from '../../../components/CustomImage';
import Emojis from './Emojis';

const KeyboardStickyViewAnimated =
  Animated.createAnimatedComponent(KeyboardStickyView);

export default function CommentInput({isComment}) {
  const {watch, control, reset, setValue} = useForm();
  const insets = useSafeAreaInsets();
  const [isKBEmojis, setIsKBEmojis] = useState(false);
  const [showKB, setShowKB] = useState(false);

  const heightKB = useSharedValue(0);
  const heightKBRef = useRef(0);
  const inputRef = useRef();

  useEffect(() => {
    const show = KeyboardEvents.addListener('keyboardWillShow', event => {
      setIsKBEmojis(false);
      setShowKB(event.height);
      heightKB.value = withTiming(event.height);
      heightKBRef.current = event.height;
    });

    const hidden = KeyboardEvents.addListener('keyboardWillHide', event => {
      setShowKB(0);

      if (!isKBEmojis) {
        heightKB.value = withTiming(0);
      }
    });

    return () => {
      show.remove();
      hidden.remove();
    };
  }, [isKBEmojis, heightKB]);

  useEffect(() => {
    heightKB.value = withTiming(
      isKBEmojis ? heightKBRef.current || scale(290) : 0,
      {
        duration: 10,
      },
    );
  }, [isKBEmojis, heightKB]);

  useEffect(() => {
    isComment && inputRef.current.focus();
  }, [isComment]);

  return (
    <>
      <KeyboardStickyViewAnimated
        style={[
          styles.wrapper,
          {
            bottom: isKBEmojis ? heightKB : showKB ? 0 : insets.bottom,
          },
        ]}>
        <View style={styles.content}>
          <CustomImage
            style={{
              width: scale(36),
              aspectRatio: 1,
            }}
            source={images.avatar}
          />

          <CustomInput
            ref={inputRef}
            control={control}
            name="comment"
            maxLength={150}
            placeholder="Nhập bình luận..."
            iconRight={!isKBEmojis ? IconEmojiFace : IconKeyBroad}
            style={[
              styles.input,
              watch('comment')?.length > 60 && {minHeight: scale(40)},
            ]}
            styleIcon={{
              width: scale(20),
              height: scale(20),
              color: '#000',
            }}
            multiline
            onSubmitEditing={() => {}}
            onPressIconRight={() => {
              setIsKBEmojis(!isKBEmojis);
              if (!isKBEmojis) {
                Keyboard.dismiss();
              } else {
                inputRef.current.focus();
              }
            }}
          />

          {watch('comment') && (
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: scale(999),
                transform: [
                  {
                    rotate: '90deg',
                  },
                ],
              }}>
              <IconGoBack fill={COLORS.white} />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardStickyViewAnimated>

      <Animated.View
        style={[
          styles.emoji,
          {
            height: heightKB,
          },
        ]}>
        {isKBEmojis && (
          <Emojis
            onPress={value => {
              setValue('comment', `${watch('comment') || ''}${value}`);
            }}
          />
        )}
      </Animated.View>

      {(showKB || isKBEmojis) && (
        <TouchableWithoutFeedback
          onPress={() => {
            setIsKBEmojis(false);
            setShowKB(false);
            Keyboard.dismiss();
          }}>
          <View style={styles.overLay} />
        </TouchableWithoutFeedback>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: '100%',
    zIndex: 999,
    padding: scale(12),
    minHeight: scale(50),
  },
  content: {
    flexDirection: 'row',
    columnGap: scale(10),
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 0,
    maxHeight: scale(90),
    backgroundColor: '#f1f1f2',
  },
  emoji: {
    width: '100%',
    position: 'absolute',
    bottom: 1,
    backgroundColor: '#fff',
    zIndex: 2,
  },
  overLay: {
    backgroundColor: '#00000030',
    position: 'absolute',
    right: 0,
    left: 0,
    height: 1000,
    zIndex: 1,
  },
});

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
  KeyboardControllerView,
  KeyboardStickyView,
} from 'react-native-keyboard-controller';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, SIZES, images, scale} from '../../../assets/constants';
import {
  IconEmojiFace,
  IconGoBack,
  IconKeyBroad,
} from '../../../assets/icon/Icon';
import {CustomInput} from '../../../components';
import CustomImage from '../../../components/CustomImage';
import Emojis from './Emojis';
import CustomText from '../../../components/CustomText';

const KeyboardStickyViewAnimated =
  Animated.createAnimatedComponent(KeyboardStickyView);

export default function CommentInput({isComment, onDismiss}) {
  const {watch, control, reset, setValue} = useForm();
  const insets = useSafeAreaInsets();
  const [isKBEmojis, setIsKBEmojis] = useState(false);
  const [showKB, setShowKB] = useState(false);
  const [isMultiLine, setIsMultiLine] = useState(false);

  const heightKB = useSharedValue(0);
  const heightKBRef = useRef(0);
  const inputRef = useRef();

  useEffect(() => {
    const show = KeyboardEvents.addListener('keyboardWillShow', event => {
      setIsKBEmojis(false);
      setShowKB(true);
      heightKB.value = withTiming(event.height);
      heightKBRef.current = event.height;
    });

    const hidden = KeyboardEvents.addListener('keyboardWillHide', event => {
      setShowKB(false);

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
        {isComment !== true && isComment && (
          <CustomText style={{marginBottom: scale(10)}}>
            Reply{' '}
            <CustomText textType="semiBold" style={{color: '#2b5db9'}}>
              {isComment}
            </CustomText>
            <CustomText onPress={() => Keyboard.dismiss()}>
              {' '}
              - Cancel
            </CustomText>
          </CustomText>
        )}

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
            onContentSizeChange={e => {
              const numLines = e.nativeEvent.contentSize.height / SIZES.medium;
              setIsMultiLine(numLines >= 3);
            }}
            placeholder="Nhập bình luận..."
            iconRight={!isKBEmojis ? IconEmojiFace : IconKeyBroad}
            style={[styles.input, isMultiLine && {minHeight: scale(40)}]}
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
        {!isKBEmojis && !!showKB && (
          <View>
            <Emojis
              short
              onPress={value => {
                setValue('comment', `${watch('comment') || ''}${value}`);
              }}
            />
          </View>
        )}
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
            onDismiss();
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

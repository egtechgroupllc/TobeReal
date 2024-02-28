import {
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SIZES, scale} from '../../../assets/constants';
import {BottomSheetFlatList, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import CustomText from '../../../components/CustomText';
import {IconDeleteText} from '../../../assets/icon/Icon';
const listEmojis = [
  '😡',
  '🙂',
  '🤡',
  '😎',
  '😏',
  '😝',
  '🤣',
  '😍',
  '😄',
  '😆',
  '😅',
  '🐧',
  '😂',
  '😊',
  '😌',
  '😯',
  '😑',
  '😐',
  '🤐',
  '😶',
  '😤',
  '🙄',
  '🤔',
  '😉',
  '😲',
  '😧',
  '😨',
  '😰',
  '😘',
  '😗',
  '😱',
  '😪',
  '😙',
  '😚',
  '😴',
  '😬',
  '🤗',
  '😀',
  '😳',
  '🤥',
  '🤧',
  '🙃',
  '😇',
  '🤒',
  '😷',
  '😈',
  '😛',
  '🤕',
  '😵',
  '😜',
  '🤢',
  '🤠',
  '😋',
  '🤤',
  '👿',
  '🤓',
  '👹',
  '👺',
  '🤑',
  '😒',
  '👻',
  '💀',
  '🙁',
  '👽',
  '👾',
  '😞',
  '😔',
  '🤖',
  '💩',
  '😖',
  '😓',
  '😢',
  '🎃',
  '😢',
  '😭',
  '😟',
  '😣',
  '😩',
  '😫',
  '😕',
  '😠',
];
export default function Emojis({onDelete, onPress, short}) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: scale(-35),
      }}>
      {!short ? (
        <BottomSheetFlatList
          canCancelContentTouches
          // data={listEmojis}
          data={listEmojis}
          // horizontal
          scrollEnabled={!short}
          showsVerticalScrollIndicator={false}
          numColumns={7}
          style={{
            flex: 1,
          }}
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: scale(20),
          }}
          renderItem={({item}) => (
            <Pressable
              onPress={e => onPress && onPress(`${item}`)}
              style={{padding: scale(8)}}>
              <CustomText
                style={{
                  fontSize: SIZES.xxLarge,
                }}>
                {item}
              </CustomText>
            </Pressable>
          )}
        />
      ) : (
        <View
          style={{
            flexDirection: 'row',
            paddingBottom: scale(20),
          }}>
          {listEmojis.slice(0, 7).map(item => (
            <Pressable
              onPress={e => onPress && onPress(`${item}`)}
              style={{padding: scale(8)}}>
              <CustomText
                style={{
                  fontSize: SIZES.xxLarge,
                }}>
                {item}
              </CustomText>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});

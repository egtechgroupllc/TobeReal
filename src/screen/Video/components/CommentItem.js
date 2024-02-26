import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  Touchable,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CustomImage from '../../../components/CustomImage';
import CustomText from '../../../components/CustomText';
import {IconHeart, IconPlayVideo} from '../../../assets/icon/Icon';
import Favourite from '../../../components/Favourite';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {images, scale} from '../../../assets/constants';
import Emojis from './Emojis';

export default function CommentItem({comment}) {
  const [lengthReplace, setLengthReplace] = useState(0);
  console.log(comment);
  return (
    <View>
      {comment?.name && (
        <TouchableOpacity style={styles.wrapper} activeOpacity={0.7}>
          <CustomImage style={styles.avatar} source={images.avatar} />
          <View style={styles.commentContent}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: scale(6),
              }}>
              <CustomText style={styles.name} textType="semiBold">
                {comment?.name}
              </CustomText>
              {comment?.replace && (
                <>
                  <IconPlayVideo
                    fill={'#000'}
                    style={{width: scale(7), height: scale(7)}}
                  />
                  <CustomText style={styles.name} textType="semiBold">
                    {comment?.replace}
                  </CustomText>
                </>
              )}
            </View>
            <CustomText style={styles.commentText} textType="regular">
              {comment?.comment}
            </CustomText>
            <View style={styles.commentSubContent}>
              <View style={styles.subCommentLeft}>
                <CustomText style={styles.time} textType="regular">
                  22 time
                </CustomText>
                <TouchableOpacity
                  style={{
                    padding: scale(4),
                  }}>
                  <CustomText style={styles.reply} textType="semiBold">
                    Tra loi
                  </CustomText>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.subCommentRight}
                activeOpacity={0.7}>
                <IconHeart style={styles.iconHeart} />
                <CustomText style={styles.numHeart} textType="regular">
                  172
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[
          comment?.items?.length > 2 && lengthReplace
            ? styles.replaceMore
            : styles.viewReplyMore,
        ]}
        activeOpacity={0.7}>
        {comment?.items?.length > 2 && !lengthReplace ? (
          <>
            <CustomText style={styles.line} textType="regular" />
            <CustomText
              style={styles.commentText}
              onPress={() => setLengthReplace(true)}>
              View more {comment?.items?.length} reply
            </CustomText>
          </>
        ) : (
          <FlatList
            scrollEnabled={false}
            data={comment?.items || []}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <CommentItem key={index} comment={item} />
            )}
          />
          // <ActivityIndicator size={'small'} />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    columnGap: scale(6),
    paddingHorizontal: scale(16),
  },
  avatar: {
    width: scale(34),
    aspectRatio: 1,
  },
  commentContent: {
    flex: 1,
    rowGap: scale(1),
  },
  name: {},
  commentText: {
    color: '#000',
    lineHeight: scale(16),
    // marginTop: scale(2),
  },
  commentSubContent: {
    marginTop: scale(6),
    flexDirection: 'row',
    columnGap: scale(6),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subCommentLeft: {
    flexDirection: 'row',
    columnGap: scale(20),
    alignItems: 'center',
    marginTop: scale(-2),
  },
  time: {},
  reply: {},
  subCommentRight: {
    flexDirection: 'row',
    columnGap: scale(5),
    alignItems: 'center',
  },
  iconHeart: {
    width: scale(14),
    aspectRatio: 1,
  },
  numHeart: {},
  viewReplyMore: {
    marginLeft: scale(38),
    flexDirection: 'row',
    columnGap: scale(6),
    alignItems: 'center',
    marginTop: scale(5),
    paddingVertical: scale(6),
    alignSelf: 'flex-start',
  },
  line: {
    width: scale(20),
    height: 0.1,
    backgroundColor: '#ccc',
  },
  replaceMore: {
    marginLeft: scale(38),
    marginTop: scale(10),
  },
});

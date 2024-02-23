import {Pressable, StyleSheet, Text, Touchable, View} from 'react-native';
import React from 'react';
import CustomImage from '../../../components/CustomImage';
import CustomText from '../../../components/CustomText';
import {IconHeart} from '../../../assets/icon/Icon';
import Favourite from '../../../components/Favourite';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {images, scale} from '../../../assets/constants';
import Emojis from './Emojis';

export default function CommentItem() {
  return (
    <View style={{marginTop: scale(10)}}>
      <TouchableOpacity style={styles.wrapper} activeOpacity={0.7}>
        <CustomImage style={styles.avatar} source={images.avatar} />
        <View style={styles.commentContent}>
          <CustomText style={styles.name} textType="semiBold">
            Name
          </CustomText>
          <CustomText style={styles.commentText} textType="regular">
            commentContentcommentContentcommentContent commentContent
          </CustomText>
          <View style={styles.commentSubContent}>
            <View style={styles.subCommentLeft}>
              <CustomText style={styles.time} textType="regular">
                22 time
              </CustomText>
              <CustomText style={styles.reply} textType="semiBold">
                Tra loi
              </CustomText>
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

      <TouchableOpacity style={styles.viewReplyMore} activeOpacity={0.7}>
        <CustomText style={styles.line} textType="regular" />
        <CustomText style={styles.commentText}>View more 30 reply</CustomText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    columnGap: scale(6),
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
});

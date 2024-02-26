import React, {
  forwardRef,
  memo,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {scale} from '../../assets/constants';
import {IconEmojiFace} from '../../assets/icon/Icon';
import {CustomInput} from '../../components';
import BottomSheet from '../../components/BottomSheet';
import {formatNumber} from '../../utils/format';
import CommentInput from './components/CommentInput';
import CommentItem from './components/CommentItem';

const comments = {
  id: 1,
  items: [
    {
      id: 12321312321,
      name: 'B',
      comment: 'BBBBBBBBBBBBBBBBBBBBBBBBBBB',
      items: [
        {
          id: 12321312321,
          name: 'B',
          comment: 'BBBBBBBBBBBBBBBBBBBBBBBBBBB',
          replace: 'A',
        },
        {
          id: 12321312321,
          name: 'C',
          comment: 'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
          replace: 'A',
        },
        {
          id: 12321312321,
          name: 'D',
          comment: 'DDDDDDDDDDDĐDDDDDDDDDDDĐDDDDDDDDDDDĐDDDDDDDDDDDĐ',
          replace: 'B',
        },
        {
          id: 12321312321,
          name: 'F',
          comment: 'fffFFFFFFfffFFFFFFfffFFFFFFfffFFFFFFfffFFFFFFfffFFFFFF',
          replace: 'C',
        },
      ],
    },
    {
      id: 12321312321,
      name: 'CC',
      comment: 'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
    },
    {
      id: 12321312321,
      name: 'D',
      comment: 'DDDDDDDDDDDĐDDDDDDDDDDDĐDDDDDDDDDDDĐDDDDDDDDDDDĐ',
      replaceNum: 4,
      items: [
        {
          id: 12321312321,
          name: 'B',
          comment: 'BBBBBBBBBBBBBBBBBBBBBBBBBBB',
          replace: 'AA',
        },
        {
          id: 12321312321,
          name: 'CC',
          comment: 'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
          replace: 'AA',
        },
        {
          id: 12321312321,
          name: 'D',
          comment: 'DDDDDDDDDDDĐDDDDDDDDDDDĐDDDDDDDDDDDĐDDDDDDDDDDDĐ',
          replace: 'B',
        },
        {
          id: 12321312321,
          name: 'F',
          comment: 'fffFFFFFFfffFFFFFFfffFFFFFFfffFFFFFFfffFFFFFFfffFFFFFF',
          replace: 'C',
        },
      ],
    },
    {
      id: 12321312321,
      name: 'F',
      comment: 'fffFFFFFFfffFFFFFFfffFFFFFFfffFFFFFFfffFFFFFFfffFFFFFF',
      replace: 'C',
    },
    {
      id: 12321312321,
      name: 'F',
      comment: 'fffFFFFFFfffFFFFFFfffFFFFFFfffFFFFFFfffFFFFFFfffFFFFFF',
      replace: 'C',
      items: [
        {
          id: 12321312321,
          name: 'B',
          comment: 'BBBBBBBBBBBBBBBBBBBBBBBBBBB',
          replace: 'AA',
        },
        {
          id: 12321312321,
          name: 'CC',
          comment: 'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
          replace: 'AA',
        },
        {
          id: 12321312321,
          name: 'D',
          comment: 'DDDDDDDDDDDĐDDDDDDDDDDDĐDDDDDDDDDDDĐDDDDDDDDDDDĐ',
          replace: 'B',
        },
        {
          id: 12321312321,
          name: 'F',
          comment: 'fffFFFFFFfffFFFFFFfffFFFFFFfffFFFFFFfffFFFFFFfffFFFFFF',
          replace: 'C',
        },
      ],
    },
    {
      id: 12321312321,
      name: 'F',
      comment: 'fffFFFFFFfffFFFFFFfffFFFFFFfffFFFFFFfffFFFFFFfffFFFFFF',
      replace: 'C',
      items: [
        {
          id: 12321312321,
          name: 'CC',
          comment: 'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
          replace: 'AA',
        },
        {
          id: 12321312321,
          name: 'D',
          comment: 'DDDDDDDDDDDĐDDDDDDDDDDDĐDDDDDDDDDDDĐDDDDDDDDDDDĐ',
          replace: 'B',
        },
        {
          id: 12321312321,
          name: 'F',
          comment: 'fffFFFFFFfffFFFFFFfffFFFFFFfffFFFFFFfffFFFFFFfffFFFFFF',
          replace: 'C',
        },
      ],
    },
  ],
};
export default memo(
  forwardRef(function Comment(props, ref) {
    const bottomSheetRef = useRef();
    const [isComment, setIsComment] = useState(false);

    useImperativeHandle(
      ref,
      () => ({
        open: () => {
          bottomSheetRef.current.open();
        },
      }),
      [],
    );

    return (
      <View
        style={{
          width: '100%',
        }}>
        <CustomInput
          placeholder="Nhập bình luận..."
          iconRight={IconEmojiFace}
          onPress={() => {
            bottomSheetRef.current.open();
            setIsComment(true);
          }}
          style={{
            width: '100%',
            height: scale(50),
            borderWidth: 0,
          }}
          styleIcon={{
            width: scale(20),
            height: scale(20),
          }}
        />

        <BottomSheet
          ref={bottomSheetRef}
          disableScroll
          titleIndicator={`${formatNumber(10000)} Comment`}
          snapPoints={['70%']}
          styleContent={{
            rowGap: scale(10),
          }}
          onDismiss={() => setIsComment(false)}>
          <>
            <BottomSheetScrollView showsVerticalScrollIndicator={false}>
              <FlatList
                scrollEnabled={false}
                data={comments?.items || []}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: scale(50),
                }}
                renderItem={({item, index}) => <CommentItem comment={item} />}
              />
            </BottomSheetScrollView>
            <CommentInput isComment={isComment} />
          </>
        </BottomSheet>
      </View>
    );
  }),
);

const styles = StyleSheet.create({});

import React, {memo, useRef} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {scale} from '../../assets/constants';
import {IconEmojiFace} from '../../assets/icon/Icon';
import {CustomInput} from '../../components';
import BottomSheet from '../../components/BottomSheet';
import {formatNumber} from '../../utils/format';
import CommentInput from './components/CommentInput';
import CommentItem from './components/CommentItem';

export default memo(function Comment() {
  const bottomSheetRef = useRef();

  return (
    <View
      style={{
        width: '100%',
      }}>
      <CustomInput
        placeholder="Nhập bình luận..."
        iconRight={IconEmojiFace}
        onPress={() => bottomSheetRef.current.open()}
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
        }}>
        <BottomSheetScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            scrollEnabled={false}
            data={[...Array(10)]}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: scale(20),
              paddingBottom: scale(50),
            }}
            renderItem={({item, index}) => <CommentItem key={index} />}
          />
        </BottomSheetScrollView>
        <CommentInput />
      </BottomSheet>
    </View>
  );
});

const styles = StyleSheet.create({});

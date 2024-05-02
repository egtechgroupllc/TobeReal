import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import WrapperContent from '../../WrapperContent';
import {scale} from '../../../../../assets/constants';
import BoxPlaceItem from '../BoxPlaceItem';
import VideoCompact from './VideoCompact';
import {useNavigation} from '@react-navigation/native';
import video from '../../../../../assets/constants/video';
import InViewPort from '../../../../../components/InViewport';

const data = [
  {
    id: 1,
    src: video.video1,
  },
  {
    id: 3,
    src: video.video3,
  },
  {
    id: 4,
    src: video.video4,
  },
  {
    id: 5,
    src: video.video5,
  },
];

export default function VideoInfluencerApproved() {
  const {navigate} = useNavigation();
  const [isRender, setIsRender] = useState(false);

  return (
    <InViewPort onChange={render => render && setIsRender(render)} delay={190}>
      {isRender && (
        <WrapperContent heading="Influencer Approved Units ✨">
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data}
            contentContainerStyle={styles.content}
            renderItem={({item, index}) => (
              <VideoCompact
                onPlay={() =>
                  navigate('NoBottomTab', {
                    screen: 'ListVideoInfluencerScreen',
                    params: {index},
                  })
                }
                source={item?.src}
              />
            )}
          />
        </WrapperContent>
      )}
    </InViewPort>
  );
}

const styles = StyleSheet.create({
  content: {
    columnGap: scale(14),
    paddingVertical: scale(6),
    paddingHorizontal: scale(16),
  },
});

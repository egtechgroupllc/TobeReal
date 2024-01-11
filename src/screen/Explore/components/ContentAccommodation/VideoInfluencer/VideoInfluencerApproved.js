import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import WrapperContent from '../../WrapperContent';
import {scale} from '../../../../../assets/constants';
import BoxPlaceItem from '../BoxPlaceItem';
import VideoCompact from './VideoCompact';
import ListVideoInfluencer from './ListVideoInfluencer';
import {useNavigation} from '@react-navigation/native';

export default function VideoInfluencerApproved() {
  const [playVideo, setPlayVideo] = useState(false);
  const {navigate} = useNavigation();
  return (
    <WrapperContent heading="Influencer Approved Units ✨">
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={[...Array(10)]}
        contentContainerStyle={styles.content}
        renderItem={({item}) => (
          <VideoCompact onPlay={() => navigate('ListVideoInfluencer')} />
        )}
      />
      {/* {playVideo && <ListVideoInfluencer />} */}
    </WrapperContent>
  );
}

const styles = StyleSheet.create({
  content: {
    columnGap: scale(14),
    paddingVertical: scale(6),
    paddingHorizontal: scale(16),
  },
});

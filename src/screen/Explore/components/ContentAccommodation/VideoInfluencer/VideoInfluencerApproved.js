import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import WrapperContent from '../../WrapperContent';
import {scale} from '../../../../../assets/constants';
import BoxPlaceItem from '../BoxPlaceItem';
import VideoCompact from './VideoCompact';
import ListVideoInfluencerScreen from './ListVideoInfluencerScreen';
import {useNavigation} from '@react-navigation/native';
import video from '../../../../../assets/constants/video';

const data = [
  {
      id:1,
      src:video.video1,
   
  },
  {
    id:2,
    src:video.video2,
 
},
{
  id:3,
  src:video.video3,

},
{
  id:4,
  src:video.video4,

},
{
  id:5,
  src:video.video5,

},
  
]


export default function VideoInfluencerApproved() {
  const [playVideo, setPlayVideo] = useState(false);
  const {navigate} = useNavigation();
  return (
    <WrapperContent heading="Influencer Approved Units ✨">
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        contentContainerStyle={styles.content}
        renderItem={({item}) => (
          <VideoCompact  onPlay={() => navigate('ListVideoInfluencerScreen')}  source={item?.src}/>
        )}
      />
      {/* {playVideo && <ListVideoInfluencerScreen />} */}
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

import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RecommendedUnitItem from './RecommendedUnitItem';
import {images, scale} from '../../../../assets/constants';
const data = [
  {
    id: 1,
    src: 'https://cdn.tgdd.vn/Files/2021/07/27/1371027/bo-tui-kinh-nghiem-du-lich-jakarta-tu-tuc-sieu-chi-tiet-tu-a-z-202107270720172819.jpg',
    name:'Jakarta',
  },
  {
    id: 2,
    src: 'https://www.indonesia.travel/content/dam/indtravelrevamp/en/destinations/revisi-2020/destinations-thumbnail/Bandung-Thumbnail.jpg',
    name:'Bandung',
  },
  {
    id: 3,
    src: 'https://content.r9cdn.net/rimg/dimg/02/9b/35b2f30d-city-15965-16a2d1c37d9.jpg?crop=true&width=1020&height=498',
    name:'Tangerang',
  },
  {
    id: 4,
    src: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/ad/a1/6a/summarecon-mall-bekasi.jpg?w=1200&h=-1&s=1',
    name: 'Bekasi',
  },
  {
    id: 5,
    src: 'https://static.vecteezy.com/system/resources/previews/002/197/349/non_2x/depok-indonesia-2021-aerial-view-of-playground-yard-in-public-park-surrounded-by-green-trees-free-photo.JPG',
    name:'Depok',
  },
  {
    id: 6,
    src: 'https://media.istockphoto.com/id/1082929112/vi/anh/c%E1%BA%A3nh-quan-th%C3%A0nh-ph%E1%BB%91-surabaya-indonesia.jpg?s=612x612&w=0&k=20&c=BvmYz7JLO7eui-cBLPeqM-XTJSytJFoeZOhFSZus5Do=',
    name:'Surabaya',
  },
  {
    id: 7,
    src: 'https://ik.imagekit.io/tvlk/image/imageResource/2021/09/19/1632058681028-1e23d643cae19075ed21f570d149ac76.jpeg',
    name:'Medan',
  },
  {
    id: 8,
    src: 'https://media.istockphoto.com/id/496378448/photo/traffic-along-the-streets-of-bogor-indonesia.jpg?s=612x612&w=0&k=20&c=4cREVj-jK2OQZzt9d9MBzBEqu905CYTJI5l8bHDolY8=',
    name:'Bogor',
  },
  {
    id: 9,
    src: 'https://media-cdn.tripadvisor.com/media/photo-c/768x250/0b/18/a8/aa/dsc02816-02-largejpg.jpg',
    name:'Makassar (Ujung Pandang)',
  },
  {
    id: 10,
    src: 'https://sisemar.sumedangkab.go.id/assets/upload/034f45f91503754d82bc21d83d3c4c1f.jpg',
    name:'Sumedang',
  },
  {
    id: 11,
    src: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Alun-alun-sidoarjo.jpg',
    name:'Sidoarjo',
  },
  {
    id: 12,
    src: 'https://hnm.1cdn.vn/2020/10/02/hanoimoi.com.vn-uploads-images-phananh-2020-10-01-_yogyakarta1.jpg',
    name:'Yogyakarta (Jogja)',
  },
  {
    id: 13,
    src: 'https://dailytravelpill.com/wp-content/uploads/2021/01/java-indonesia-rainbow-village-kampung-pelangi.jpg',
    name:'Semarang',
  },
];
export default function BigCity({
  styleItem,
  styleWrapper,
  styesTextTitle,
  onPress,
}) {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      contentContainerStyle={[styles.content, styleWrapper]}
      renderItem={({item, index}) => (
        <RecommendedUnitItem
          viewShow={2.5}
          isCenter
          title={item?.name}
          data={true}
          img={item?.src}
          styesWrapper={styleItem}
          styesTextTitle={styesTextTitle}
          onPress={() => onPress && onPress({item, index})}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    columnGap: scale(14),
    paddingVertical: scale(6),
    paddingHorizontal: scale(16),
  },
});

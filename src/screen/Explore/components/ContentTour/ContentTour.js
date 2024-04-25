import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {images, scale} from '../../../../assets/constants';
import {useLanguage} from '../../../../hooks/useLanguage';
import PackageTour from './PackageTour';
import ThemedTour from './ThemedTour';
import WorldTour from './WorldTour';
import DiscoveryTour from './DiscoveryTour';
const dataPackage = [
  {
    id: 1,
    src: images.tourthailand,
    name: 'Thailand tour package ( Bangkok, Pattaya) - 5N4Đ',
    price: 6690000,
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
  {
    id: 2,
    src: images.tourbali,
    name: 'Thailand tour Bali( kintamani, Pattaya) ....',
    price: 10880000,
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
  {
    id: 3,
    src: images.toursingapore,
    name: 'Tour Singapore (Gardens by the Bay, Sentosa, Jurassic Mile)',
    price: 9900000,
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
];
const dataThemed = [
  {
    id: 1,
    src: images.tourbana,
    name: 'Tour to explore Ba Na (Da Nang Golden Bridge) - 1N',
    price: 722000,
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
  {
    id: 2,
    src: images.tournhatrang,
    name: 'Nha Trang vip island tour',
    price: 750000,
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
  {
    id: 3,
    src: images.tourhalong,
    name: 'Ha Long Bay cruise tour',
    price: 160000,
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
];
const dataWorld = [
  {
    id: 1,
    src: images.hanbok,
    name: 'Hanbok Rental & Photoshoot by the D....',
    price: 224000,
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
  {
    id: 2,
    src: images.seoul,
    name: 'Moonlight Seoul Night Tour (Royal Palace, Cheonggyecheon stream, Naksan Park & Foodie Market)',
    price: 995000,
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
  {
    id: 3,
    src: images.jejubus,
    name: 'Bus Tour West Island Jeju one day',
    price: 280000,
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
];
const dataDomestic = [
  {
    id: 1,
    src: images.dalat,
    name: 'Đà Lạt',
    price: 224000,
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
  {
    id: 2,
    src: images.danang,
    name: 'Đà Nẵng',
    price: 995000,
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
  {
    id: 3,
    src: images.halong,
    name: 'Hạ Long',
    price: 280000,
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
  {
    id: 4,
    src: images.hanoi,
    name: 'Hà Nội',
    price: 280000,
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
  {
    id: 5,
    src: images.hoian,
    name: 'Hội An',
    price: 280000,
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
  {
    id: 6,
    src: images.nhatrang,
    name: 'Nha Trang',
    price: 280000,
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
  {
    id: 7,
    src: images.phuquoc,
    name: 'Phú Quốc',
    price: 280000,
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
  {
    id: 8,
    src: images.ninhbinh,
    name: 'Ninh Bình',
    price: 280000,
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
];
const dataInternational = [
  {
    id: 1,
    src: images.singapore,
    name: 'Singapore',
    price: 224000,
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
  {
    id: 2,
    src: images.thailan,
    name: 'Thailand',
    price: 995000,
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
  {
    id: 3,
    src: images.indo,
    name: 'Indonesia',
    price: 280000,
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
  {
    id: 4,
    src: images.malay,
    name: 'Malaysia',
    price: 280000,
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
  {
    id: 5,
    src: images.philip,
    name: 'Philippines',
    price: 280000,
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
  {
    id: 6,
    src: images.korea,
    name: 'Korea',
    price: 280000,
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
  {
    id: 7,
    src: images.japan,
    name: 'Japan',
    price: 280000,
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
  {
    id: 8,
    src: images.taiwan,
    name: 'Taiwan',
    price: 280000,
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
];
export default function ContentTour() {
  const [tourData, setTourData] = useState(dataDomestic);

  const handleCategoryChange = categoryData => {
    if (categoryData === 'Domestic destination') {
      setTourData(dataDomestic);
    } else if (categoryData === 'International destination') {
      setTourData(dataInternational);
    }
  };

  const {t} = useLanguage();
  return (
    <View style={styles.wrapper}>
      <PackageTour />
      {/* <ThemedTour data={dataThemed} /> */}
      <WorldTour data={dataWorld} />
      <DiscoveryTour data={tourData} onPressCategory={handleCategoryChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: scale(16),
    rowGap: scale(10),
  },
  content: {
    columnGap: scale(14),
    paddingVertical: scale(6),
    paddingHorizontal: scale(16),
  },
});

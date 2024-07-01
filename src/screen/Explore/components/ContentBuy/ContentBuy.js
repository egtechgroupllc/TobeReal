import React, {memo, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {images, scale} from '../../../../assets/constants';
import {useLanguage} from '../../../../hooks/useLanguage';
import BuySell from './BuySell';
import Discount from './Discount';
import FeatureEstate from './FeatureEstate';
import TopLocation from './TopLocation';
import TopEstateAgent from './TopEstateAgent';
import ExploreNearbyEstate from './ExploreNearbyEstate';
import DiscoveryEstate from './DiscoveryEstate';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useCountry} from '../../../../hooks/useCountry';
import {useQuery} from '@tanstack/react-query';
import {getListSell} from '../../../../Model/api/apiEstate';

const dataWorld = [
  {
    id: 1,
    src: images.c15,
    name: 'C15_05_BlockC Emerald',
    type: 'Apartment',
    price: 25000000,
    imgdetail: [
      images.c15_1,
      images.c15_2,
      images.c15_3,
      images.c15_4,
      images.c15_5,
      images.c15_6,
    ],
  },
  {
    id: 2,
    src: images.c16,
    name: 'D11.06 Emerald',
    type: 'House',
    price: 16000000,
    imgdetail: [
      images.c16_1,
      images.c16_2,
      images.c16_3,
      images.c16_4,
      images.c16_5,
      images.c16_6,
      images.c16_7,
      images.c16_8,
      images.c16_9,
    ],
  },
  {
    id: 3,
    src: images.p14,
    name: 'P14.07 Diamond',
    type: 'Villa',
    price: 28000000,
    imgdetail: [
      images.p14_1,
      images.p14_2,
      images.p14_3,
      images.p14_4,
      images.p14_5,
      images.p14_6,
      images.p14_7,
      images.p14_8,
    ],
  },
  {
    id: 4,
    src: images.q10,
    name: 'Centrosa Garden Q.10',
    type: 'House',
    price: 26000000,
    imgdetail: [
      images.q10_1,
      images.q10_2,
      images.q10_3,
      images.q10_4,
      images.q10_5,
      images.q10_6,
    ],
  },
  {
    id: 5,
    src: images.a6,
    name: 'A6.7.08 Diamod Alanta Plus',
    type: 'House',
    price: 18000000,
    imgdetail: [
      images.a6_1,
      images.a6_2,
      images.a6_3,
      images.a6_4,
      images.a6_5,
    ],
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
const dataLocation = [
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
const dataAgent = [
  {
    id: 1,
    src: images.hanbok,
    name: 'Bali',
    price: 224000,
    type: 'Apartment',
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
  {
    id: 2,
    src: images.seoul,
    name: 'Jakarta',
    price: 995000,
    type: 'Villa',
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
  {
    id: 3,
    src: images.jejubus,
    type: 'House',
    name: 'Yogyakarta',
    price: 280000,
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
  {
    id: 4,
    src: images.danang,
    type: 'House',
    name: 'Semarang',
    price: 280000,
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
  {
    id: 5,
    src: images.halloween,
    type: 'House',
    name: 'Semarang',
    price: 280000,
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
];
export default memo(function ContentBuy() {
  const {t} = useLanguage();
  const [tourData, setTourData] = useState(dataDomestic);
  const {country} = useCountry();
  const [listSavedName, setListSavedName] = useState([]);
  const handleCategoryChange = categoryData => {
    if (categoryData === 'Domestic destination') {
      setTourData(dataDomestic);
    } else if (categoryData === 'International destination') {
      setTourData(dataInternational);
    }
  };
  const {data, isLoading, isError, error} = useQuery({
    queryKey: [
      'estate',
      'list-post',
      {
        estate_type_id: 1,
        country_id: country?.id,
        // province_id: filter?.id,
      },
    ],
    queryFn: () => getListSell({country_id: country?.id}),
  });
  useEffect(() => {
    const loadSavedName = async () => {
      const result = await EncryptedStorage.getItem('@save_name_estate');

      setListSavedName(JSON.parse(result));
    };
    loadSavedName();
  }, []);

  const dataNew = useMemo(() => {
    const filterSaved = listSavedName?.filter(item => {
      return item?.country_id === country?.id;
    });

    const dataIds = data?.data?.rows?.map(element => element?.id) || [];
    const result = filterSaved?.filter(item => {
      return dataIds.includes(item?.id);
    });

    return result;
  }, [listSavedName, country?.id, data?.data?.count]);
  return (
    <View style={styles.wrapper}>
      {dataNew?.length > 0 ? <BuySell data={dataNew} /> : <View />}
      {/* <Discount /> */}
      <FeatureEstate />
      {/* <TopEstateAgent data={dataAgent} /> */}
      <ExploreNearbyEstate country={country} />
      {/* <TopLocation data={dataLocation} /> */}

      {/* <DiscoveryEstate data={tourData} onPressCategory={handleCategoryChange} /> */}
    </View>
  );
});

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

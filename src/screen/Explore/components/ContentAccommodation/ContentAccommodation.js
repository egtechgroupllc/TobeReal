import React, {memo, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {scale} from '../../../../assets/constants';
import {useLanguage} from '../../../../hooks/useLanguage';
import AccommodationPremium from './AccommodationPremium';
import BigCity from './BigCity';
import FindBest from './FindBest';
import HotelResidence from './HotelResidence';
import ThematicInstagram from './ThematicInstagram';
import {useCountry} from '../../../../hooks/useCountry';
import {useQuery} from '@tanstack/react-query';
import {getListRent} from '../../../../Model/api/apiAccom';
import {formatDate} from '../../../../utils/format';

export default memo(function ContentAccommodation({}) {
  const {t} = useLanguage();

  const [listSavedName, setListSavedName] = useState([]);
  const {country, currency} = useCountry();
  const {data, isLoading, isError, error} = useQuery({
    queryKey: [
      'accommodation',
      'list-rent',
      {
        accommodation_type_id: 1,
        currency_id: currency?.id,
        country_id: country?.id,
      },
    ],
    queryFn: () =>
      getListRent({
        date_end: formatDate(new Date(), {addDays: 1}),
        date_start: formatDate(),
        country_id: country?.id,
        currency_id: currency?.id,
      }),
  });
  useEffect(() => {
    const loadSavedName = async () => {
      const result = await EncryptedStorage.getItem('save_name');
      // const result = await EncryptedStorage.removeItem('save_name');
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
      {dataNew?.length > 0 ? <HotelResidence data={dataNew} /> : <View />}
      <AccommodationPremium currency={currency} />
      <FindBest country={country} currency={currency} />
      <ThematicInstagram />
      {/* <RecommendedUnit data={data} /> */}
      {/* <StayMonthly /> */}

      {/* <VideoInfluencerApproved /> */}
      {/* <FindApartmentFitsBudget /> */}

      {/* <WeeklyHotDeal /> */}

      {/* <BestSelling /> */}

      {/* <RecommendedApartments /> */}

      <BigCity />
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

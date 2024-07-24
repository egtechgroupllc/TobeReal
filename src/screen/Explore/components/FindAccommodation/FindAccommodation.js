/* eslint-disable react-hooks/exhaustive-deps */
import {useQuery} from '@tanstack/react-query';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  getListTypeEstateSell,
  getListTypeRent,
} from '../../../../Model/api/common';
import {WIDTH, scale} from '../../../../assets/constants';
import {
  IconApartment,
  IconEmigrate,
  IconHome,
  IconHotel,
  IconLand,
  IconTourTopic,
  IconVilla,
  IconWorld,
} from '../../../../assets/icon/Icon';
import {Category, InViewport, TabSelect} from '../../../../components';
import InViewPort from '../../../../components/InViewport';
import MainWrapper from '../../../../components/MainWrapper';
import {useLanguage} from '../../../../hooks/useLanguage';
import ContentAccommodation from '../ContentAccommodation/ContentAccommodation';
import ContentBuy from '../ContentBuy/ContentBuy';
import ContentTour from '../ContentTour/ContentTour';
import FindAccommodationStart from './FindAccommodationStart';
import FindContent from './FindContent';
import OptionAccommodation from './OptionAccommodation';
import FindContentTour from './FindContentTour';

export default function FindAccommodation() {
  // const ContentAccommodation = React.lazy(() =>
  //   import('../ContentAccommodation/ContentAccommodation'),
  // );
  const {t, locale} = useLanguage();

  const listMenu = useMemo(
    () => [
      {
        id: 'RENT',
        name: t('RENT'),
      },
      {
        id: 'BUY',
        name: t('BUY'),
      },
      {
        id: 'TOUR',
        name: t('TOUR'),
      },
    ],
    [locale],
  );
  const listRental = useMemo(
    () => [
      {
        id: 'daily',
        name: t('daily'),
      },
      {
        id: 'monthly',
        name: t('monthly'),
      },
      {
        id: 'yearly',
        name: t('yearly'),
      },
    ],
    [locale],
  );

  const listTour = useMemo(
    () => [
      {
        name: t('domestic'),
        icon: IconEmigrate,
      },
      {
        name: t('world'),
        icon: IconWorld,
      },
    ],
    [locale],
  );
  const listRent = useMemo(
    () => [
      {
        id: 1,
        name: t('hotel'),
        icon: IconHotel,
      },
      {
        id: 2,
        name: t('apartment'),
        icon: IconApartment,
      },
      {
        id: 3,
        name: t('house'),
        icon: IconHome,
      },
      {
        id: 4,
        name: t('villa'),
        icon: IconVilla,
      },
    ],
    [locale],
  );

  const listBuy = useMemo(
    () => [
      {
        id: 1,
        name: t('apartment'),
        icon: IconApartment,
      },
      {
        id: 2,
        name: t('house'),
        icon: IconHome,
      },
      {
        id: 3,
        name: t('villa'),
        icon: IconVilla,
      },
      {
        id: 4,
        name: t('land'),
        icon: IconLand,
      },
    ],
    [locale],
  );

  const typeRent = useQuery({
    queryKey: ['common', 'accommodation', 'list-type'],
    queryFn: () => getListTypeRent(),
  });
  const typeBuy = useQuery({
    queryKey: ['common', 'estate', 'list-type'],
    queryFn: () => getListTypeEstateSell(),
  });

  const [tabSelect, setTabSelect] = useState(listMenu[0]?.id);
  const [category, setCategory] = useState(listRental[0]);
  const [isRender, setIsRender] = useState();
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const typeId =
      tabSelect === 'RENT'
        ? typeRent?.data?.data?.[0]?.id
        : typeBuy?.data?.data?.[0]?.id;
    setSelectedId(typeId);
  }, [tabSelect, typeRent?.data?.data?.[0]?.id]);

  const handleChangeTab = useCallback(value => {
    setTabSelect(value?.id);
    tabSelect !== 'RENT' && setCategory(listRental[0]);
  }, []);

  return (
    <MainWrapper refreshControl noSafeArea>
      <View
        style={{
          width: WIDTH.widthContain,
          alignSelf: 'center',
          marginTop: scale(20),
        }}>
        <InViewPort ComponentLoading={<FindAccommodationStart />}>
          <TabSelect
            isObj
            data={listMenu}
            onChange={handleChangeTab}
            renderView={() => (
              <>
                <View style={styles.category}>
                  {tabSelect === 'RENT' && (
                    <Category
                      isObject
                      indexDefault={1}
                      data={listRental}
                      onPress={value => setCategory(value)}
                    />
                  )}
                  <OptionAccommodation
                    styleIcon={{color: '#BCBCBC'}}
                    // multiSelect
                    // isSelectAll
                    onSelect={value => setSelectedId(value.id)}
                    keyTextView={'name'}
                    data={
                      tabSelect === 'RENT'
                        ? listRent || typeRent?.data?.data
                        : tabSelect === 'BUY'
                        ? listBuy || typeBuy?.data?.data
                        : tabSelect === 'TOUR'
                        ? listTour
                        : []
                    }
                  />
                </View>
                {tabSelect !== 'TOUR' ? (
                  <FindContent
                    isBuy={tabSelect === 'BUY'}
                    rental={category?.id}
                    dataFind={{type: selectedId, menu: tabSelect}}
                  />
                ) : (
                  <FindContentTour
                    rental={category?.id}
                    dataFind={{type: selectedId, menu: tabSelect}}
                  />
                )}
              </>
            )}
          />
        </InViewPort>
      </View>

      {tabSelect === 'TOUR' ? (
        <ContentTour />
      ) : tabSelect === 'RENT' ? (
        <ContentAccommodation />
      ) : (
        <ContentBuy />
      )}
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  category: {
    rowGap: scale(14),
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
});

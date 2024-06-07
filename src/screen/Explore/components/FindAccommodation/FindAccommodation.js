/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {WIDTH, images, scale} from '../../../../assets/constants';
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
import {Category, TabSelect} from '../../../../components';
import InViewPort from '../../../../components/InViewport';
import {useLanguage} from '../../../../hooks/useLanguage';
import ContentAccommodation from '../ContentAccommodation/ContentAccommodation';
import ContentBuy from '../ContentBuy/ContentBuy';
import ContentTour from '../ContentTour/ContentTour';
import FindAccommodationStart from './FindAccommodationStart';
import FindContent from './FindContent';
import OptionAccommodation from './OptionAccommodation';
import {useQuery} from '@tanstack/react-query';
import {
  getListTypeRoom,
  getMyListCreateAccom,
} from '../../../../Model/api/apiAccom';
import {useAuthentication} from '../../../../hooks/useAuthentication';
import {
  getListTypeEstateSell,
  getListTypeRent,
} from '../../../../Model/api/common';
import {ScrollView} from 'react-native-gesture-handler';
import MainWrapper from '../../../../components/MainWrapper';

export default function FindAccommodation() {
  // const ContentAccommodation = React.lazy(() =>
  //   import('../ContentAccommodation/ContentAccommodation'),
  // );
  const {t, locale} = useLanguage();

  const listMenu = useMemo(
    () => [
      {
        id: 'RENT',
        name: t('rent'),
      },
      {
        id: 'BUY',
        name: t('buy'),
      },
      {
        id: 'TOUR',
        name: t('tour'),
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

  const listTour = useMemo(
    () => [
      {
        name: t('tour_by_topic'),
        icon: IconTourTopic,
      },
      {
        name: t('emigrate'),
        icon: IconEmigrate,
      },
      {
        name: t('world'),
        icon: IconWorld,
      },
    ],
    [locale],
  );

  const [tabSelect, setTabSelect] = useState(listMenu[0]?.id);
  const [category, setCategory] = useState();
  const [isRender, setIsRender] = useState();
  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    const typeId =
      tabSelect === 'RENT'
        ? typeRent?.data?.data?.[0]?.id
        : typeBuy?.data?.data?.[0]?.id;
    setSelectedId(typeId);
  }, [tabSelect, typeRent?.data?.data?.[0]?.id]);
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
  return (
    <MainWrapper refreshControl noSafeArea>
      <InViewPort
        onChange={render => {
          render && setIsRender(render);
        }}
        delay={20}>
        <View
          style={{
            width: WIDTH.widthContain,
            alignSelf: 'center',
            marginTop: scale(20),
          }}>
          <TabSelect
            isObj
            data={listMenu}
            onChange={value => {
              setTabSelect(value?.id);
            }}
            renderView={() => (
              <>
                {isRender ? (
                  <>
                    <View style={styles.category}>
                      {tabSelect === 'RENT' && (
                        <Category
                          indexDefault={1}
                          data={[t('daily'), t('monthly'), t('yearly')]}
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
                        rental={category}
                        dataFind={{type: selectedId, menu: tabSelect}}
                      />
                    ) : (
                      <FindContent
                        tour
                        dataFind={{type: selectedId, menu: tabSelect}}
                      />
                    )}
                  </>
                ) : (
                  <FindAccommodationStart />
                )}
              </>
            )}
          />
        </View>
      </InViewPort>
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

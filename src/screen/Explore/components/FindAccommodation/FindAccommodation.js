import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
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
import {Category, TabSelect} from '../../../../components';
import InViewPort from '../../../../components/InViewport';
import {useLanguage} from '../../../../hooks/useLanguage';
import ContentAccommodation from '../ContentAccommodation/ContentAccommodation';
import ContentBuy from '../ContentBuy/ContentBuy';
import ContentTour from '../ContentTour/ContentTour';
import FindAccommodationStart from './FindAccommodationStart';
import FindContent from './FindContent';
import OptionAccommodation from './OptionAccommodation';

export default function FindAccommodation() {
  // const ContentAccommodation = React.lazy(() =>
  //   import('../ContentAccommodation/ContentAccommodation'),
  // );
  const {t} = useLanguage();

  const listMenu = useRef([
    {
      id: 'TOUR',
      name: t('TOUR'),
    },
    {
      id: 'RENT',
      name: t('RENT'),
    },
    {
      id: 'HOUSE',
      name: t('HOUSE'),
    },
  ]).current;

  const listRent = useRef([
    // {
    //   text: t('all'),
    //   icon: IconCity,
    // },
    {
      text: t('apartment'),
      icon: IconApartment,
    },
    {
      text: t('hotel'),
      icon: IconHotel,
    },
    {
      text: t('villa'),
      icon: IconVilla,
    },
    {
      text: t('home'),
      icon: IconHome,
    },
    // {
    //   text: t('others'),
    //   icon: IconAccommodationOther,
    // },
  ]).current;

  const listBuy = useRef([
    // {
    //   text: t('all'),
    //   icon: IconCity,
    // },
    {
      text: t('apartment'),
      icon: IconApartment,
    },
    {
      text: t('villa'),
      icon: IconHotel,
    },
    {
      text: t('home'),
      icon: IconHome,
    },
    {
      text: t('land'),
      icon: IconLand,
    },
    // {
    //   text: t('others'),
    //   icon: IconAccommodationOther,
    // },
  ]).current;

  const listTour = useRef([
    {
      text: t('tour_by_topic'),
      icon: IconTourTopic,
    },
    {
      text: t('emigrate'),
      icon: IconEmigrate,
    },
    {
      text: t('world'),
      icon: IconWorld,
    },
  ]).current;

  const [tabSelect, setTabSelect] = useState(listMenu[0]?.id);
  const [category, setCategory] = useState();
  const [isRender, setIsRender] = useState();

  return (
    <View>
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
                        multiSelect
                        isSelectAll
                        styleWrapper={{
                          backgroundColor: 'transparent',
                          marginBottom: scale(20),
                        }}
                        data={
                          tabSelect === 'RENT'
                            ? listRent
                            : tabSelect === 'HOUSE'
                            ? listBuy
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
                      />
                    ) : (
                      <FindContent tour />
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
    </View>
  );
}

const styles = StyleSheet.create({
  category: {
    rowGap: scale(14),
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
});

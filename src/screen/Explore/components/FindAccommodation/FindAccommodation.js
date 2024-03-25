import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {WIDTH, scale} from '../../../../assets/constants';
import {
  IconAccommodationOther,
  IconApartment,
  IconCity,
  IconEmigrate,
  IconHome,
  IconHotel,
  IconHouse,
  IconLand,
  IconRoom,
  IconTourTopic,
  IconVilla,
  IconWorld,
} from '../../../../assets/icon/Icon';
import {Category, TabSelect} from '../../../../components';
import FindContent from './FindContent';
import OptionAccommodation from './OptionAccommodation';
import {useLanguage} from '../../../../hooks/useLanguage';
import InViewPort from '../../../../components/InViewport';
import FindAccommodationStart from './FindAccommodationStart';
import ContentAccommodation from '../ContentAccommodation/ContentAccommodation';
import ContentTour from '../ContentTour/ContentTour';
import ContentBuy from '../ContentBuy/ContentBuy';

export default function FindAccommodation() {
  // const ContentAccommodation = React.lazy(() =>
  //   import('../ContentAccommodation/ContentAccommodation'),
  // );
  const {t} = useLanguage();
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

  const [tabSelect, setTabSelect] = useState(t('RENT'));
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
            data={[t('RENT'), t('BUY'), t('TOUR')]}
            onChange={value => {
              setTabSelect(value);
            }}
            renderView={() => (
              <>
                {isRender ? (
                  <>
                    <View style={styles.category}>
                      {tabSelect === t('RENT') && (
                        <Category
                          data={[t('daily'), t('monthly'), t('yearly')]}
                          onPress={value => setCategory(value)}
                        />
                      )}
                      <OptionAccommodation
                        styleIcon={{color: '#BCBCBC'}}
                        multiSelect
                        isSelectAll
                        data={
                          tabSelect === t('RENT')
                            ? listRent || []
                            : tabSelect === t('BUY')
                            ? listBuy || []
                            : tabSelect === t('TOUR')
                            ? listTour
                            : []
                        }
                      />
                    </View>
                    {tabSelect != t('TOUR') ? (
                      <FindContent
                        isBuy={tabSelect === t('BUY')}
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
      {tabSelect === 'TOUR' ? <ContentTour /> : tabSelect === 'RENT' ? <ContentAccommodation /> : <ContentBuy />}
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

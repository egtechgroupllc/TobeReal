import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {WIDTH, scale} from '../../../../assets/constants';
import {
  IconAccommodationOther,
  IconApartment,
  IconCity,
  IconHome,
  IconHotel,
  IconHouse,
  IconLand,
  IconRoom,
  IconVilla,
} from '../../../../assets/icon/Icon';
import {Category, TabSelect} from '../../../../components';
import FindContent from './FindContent';
import OptionAccommodation from './OptionAccommodation';
import { useLanguage } from '../../../../hooks/useLanguage';


export default function FindAccommodation() {
  const {t}= useLanguage()
const listRent = [
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
];
const listBuy = [
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
    icon: IconVilla,
  },
  {
    text: t('land'),
    icon: IconLand,
  },
  // {
  //   text: t('others'),
  //   icon: IconAccommodationOther,
  // },
];
const listTour = [
  {
    text: '',
    icon: '',
  },
];

  const [tabSelect, setTabSelect] = useState(t('RENT'));
  const [category, setCategory] = useState();

  return (
    <View
      style={{
        width: WIDTH.widthContain,
        alignSelf: 'center',
        marginTop:scale(20)
      }}>
      <TabSelect
        data={[t('rent'),  t('buy'), t('tour')]}
        onChange={value => {
          setTabSelect(value);
        }}
        renderView={() => (
          <>
            <View style={styles.category}>
              {tabSelect !== t('BUY') && tabSelect!==t('TOUR')&&(
                <Category
                  data={[t('daily'), t('monthly'), t('yearly')]}
                  onChange={value => setCategory(value)}
                />
              )}

              <OptionAccommodation
                styleIcon={{color:'#BCBCBC'}}
                multiSelect
                isSelectAll
                data={
                  tabSelect === t('RENT')
                  ? listRent || []
                  : tabSelect === t('BUY')
                  ? listBuy || [] 
                  : tabSelect === t('TOUR')
                  ? listTour : []

                }
              />
            </View>
            <FindContent isBuy={tabSelect === t('BUY')} rental={category} />
          </>
        )}
      />
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

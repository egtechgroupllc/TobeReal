import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {WIDTH, scale} from '../../../../assets/constants';
import {
  IconAccommodationOther,
  IconApartment,
  IconCity,
  IconHouse,
  IconRoom,
  IconVilla,
} from '../../../../assets/icon/Icon';
import {Category, TabSelect} from '../../../../components';
import FindContent from './FindContent';
import OptionAccommodation from './OptionAccommodation';
import { useLanguage } from '../../../../hooks/useLanguage';


export default function FindAccommodation() {
  const {t}= useLanguage()
const listAccommodation = [
  {
    text: t('all'),
    icon: IconCity,
  },
  {
    text: t('apartment'),
    icon: IconApartment,
  },
  {
    text: t('house'),
    icon: IconHouse,
  },
  {
    text: t('villa'),
    icon: IconVilla,
  },
  {
    text: t('room'),
    icon: IconRoom,
  },
  {
    text: t('others'),
    icon: IconAccommodationOther,
  },
];

  const [tabSelect, setTabSelect] = useState('RENT');
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
              {tabSelect !== 'BUY' && (
                <Category
                  data={[t('daily'), t('monthly'), t('yearly')]}
                  onChange={value => setCategory(value)}
                />
              )}

              <OptionAccommodation
                multiSelect
                isSelectAll
                data={
                  tabSelect !== 'BUY'
                    ? listAccommodation
                    : [listAccommodation[1]]
                }
              />
            </View>
            <FindContent isBuy={tabSelect === 'BUY'} rental={category} />
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

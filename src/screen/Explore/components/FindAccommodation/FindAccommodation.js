import React, {useState} from 'react';
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

const listAccommodation = [
  {
    text: 'All',
    icon: IconCity,
  },
  {
    text: 'Apartment',
    icon: IconApartment,
  },
  {
    text: 'House',
    icon: IconHouse,
  },
  {
    text: 'Villa',
    icon: IconVilla,
  },
  {
    text: 'Room',
    icon: IconRoom,
  },
  {
    text: 'Others',
    icon: IconAccommodationOther,
  },
];

export default function FindAccommodation() {
  const [tabSelect, setTabSelect] = useState('RENT');

  return (
    <View
      style={{
        width: WIDTH.widthContain,
        alignSelf: 'center',
      }}>
      <TabSelect
        data={['RENT', 'BUY']}
        onChange={value => {
          setTabSelect(value);
        }}
        renderView={() => (
          <>
            <View style={styles.category}>
              {tabSelect !== 'BUY' && (
                <Category data={['Daily', 'Monthly', 'Yearly']} />
              )}

              <OptionAccommodation
                data={
                  tabSelect !== 'BUY'
                    ? listAccommodation
                    : [listAccommodation[1]]
                }
              />
            </View>

            <FindContent isBuy={tabSelect === 'BUY'} />
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

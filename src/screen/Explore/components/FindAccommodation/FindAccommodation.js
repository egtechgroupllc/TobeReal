import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../../../../components/CustomButton';
import {COLORS, scale} from '../../../../assets/constants';
import {Category, CustomInput, TabSelect} from '../../../../components';
import OptionAccommodation from './OptionAccommodation';
import {
  IconAccommodationOther,
  IconApartment,
  IconCalendar,
  IconCity,
  IconHouse,
  IconMarker,
  IconRoom,
  IconVilla,
} from '../../../../assets/icon/Icon';
import FindContent from './FindContent';

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
        width: '94%',
        alignSelf: 'center',
      }}>
      <TabSelect
        data={['RENT', 'BUY']}
        onChange={value => {
          setTabSelect(value);
        }}
      />

      <View
        style={[
          styles.content,
          tabSelect !== 'BUY' && {
            borderTopLeftRadius: 0,
          },
          tabSelect !== 'RENT' && {
            borderTopRightRadius: 0,
          },
        ]}>
        <View style={styles.category}>
          {tabSelect !== 'BUY' && (
            <Category data={['Daily', 'Monthly', 'Yearly']} />
          )}

          <OptionAccommodation
            data={
              tabSelect !== 'BUY' ? listAccommodation : [listAccommodation[1]]
            }
          />
        </View>

        <FindContent />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: scale(16),
    rowGap: scale(14),
  },
  category: {
    rowGap: scale(14),
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
});

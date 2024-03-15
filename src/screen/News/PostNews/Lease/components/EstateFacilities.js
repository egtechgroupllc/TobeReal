import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import {COLORS, scale} from '../../../../../assets/constants';
import {IconDown, IconRight} from '../../../../../assets/icon/Icon';
import {CustomButton, CustomInput} from '../../../../../components';
import CheckBox from '../../../../../components/CheckBox';
import {useLanguage} from '../../../../../hooks/useLanguage';
const dataFacilities = [
  {
    id: '1',
    name: 'Common',
    include: [
      {title: 'Parking Area'},
      {title: 'Room Service'},
      {title: 'Safety Deposit Box'},
      {title: 'Coffee Shop'},
      {title: 'Restaurant'},
    ],
  },
  {
    id: '2',
    name: 'Accessibility',
    include: [
      {title: 'Accessible Bathroom'},
      {title: 'Accessible Parking'},
      {title: 'Roll In Shower'},
    ],
  },
  {
    id: '3',
    name: 'Business',
    include: [
      {title: 'Business Center'},
      {title: 'Meeting Facilities'},
      {title: 'Computer Station'},
    ],
  },
  {
    id: '4',
    name: 'Connectivity',
    include: [{title: 'Wifi Free'}, {title: 'Wifi Public Area Surcharge'}],
  },
  {
    id: '5',
    name: 'Facilities',
    include: [
      {title: 'Family Room'},
      {title: 'Smoking Area'},
      {title: 'Air Conditioning'},
    ],
  },
];

export default function EstateFacilities() {
  const {t} = useLanguage();

  const [viewFacilities, setViewFacilities] = useState(false);
  const [showFacilitiesItem, setshowFacilitiesItem] = useState('');

  const facilitiesCheckBox = name => {};
  return (
    <View>
      <CustomButton
        outline
        style={styles.buttonCategories}
        text={t('estate_facilities')}
        iconRight={() => <IconRight />}
        onPress={() => setViewFacilities(prev => !prev)}
        styleText={{
          color: COLORS.text,
        }}
      />
      <Collapsible collapsed={!viewFacilities} style={styles.box}>
        <Accordion
          containerStyle={styles.content}
          activeSections={[showFacilitiesItem]}
          sections={dataFacilities}
          renderHeader={(item, index) => {
            return (
              <CustomButton
                style={{
                  ...styles.select,
                  borderTopWidth: scale(index === 0 ? 0 : 1),
                }}
                text={item?.name}
                iconRight={() => <IconDown />}
                onPress={() => setshowFacilitiesItem(index)}
                styleText={{
                  color: COLORS.text,
                  textType: 'medium',
                }}
              />
            );
          }}
          renderSectionTitle={(item, index) => {
            return (
              index === 0 && (
                <CustomInput
                  value={t('estate_facilities')}
                  style={{
                    borderWidth: 0,
                  }}
                  styleText={{color: COLORS.black}}
                  styleTextLabel={{color: COLORS.black}}
                  editable={false}
                />
              )
            );
          }}
          renderContent={(item, index, isActive) => {
            return item.include.map((nestedItem, index) => (
              <CheckBox
                text={nestedItem.title}
                textLeft
                onPress={() => facilitiesCheckBox(item)}
                style={styles.checkBox}
              />
            ));
          }}
        />
      </Collapsible>
    </View>
  );
}
const styles = StyleSheet.create({
  buttonCategories: {
    backgroundColor: 'white',
    borderRadius: scale(6),
    borderColor: '#F0B90B80',
    height: scale(50),
    justifyContent: 'space-between',
    marginTop: scale(20),
    paddingHorizontal: scale(20),
  },

  box: {
    paddingVertical: scale(20),
    minHeight: scale(100),
    backgroundColor: '#FFFFFF',
    borderRadius: scale(6),
    paddingHorizontal: scale(20),
    alignItems: 'center',
    borderColor: '#F0B90B80',
    borderWidth: scale(1),
  },
  select: {
    justifyContent: 'space-between',
    backgroundColor: '#EEEEEE',
    borderRadius: 0,
    paddingHorizontal: scale(25),
    borderTopColor: '#ddd',
  },
  checkBox: {
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    paddingVertical: scale(7),
  },

  content: {
    borderWidth: scale(2),
    borderRadius: scale(6),
    borderColor: '#EEEEEE',
    justifyContent: 'center',
    width: '100%',
    minHeight: scale(100),
  },
});

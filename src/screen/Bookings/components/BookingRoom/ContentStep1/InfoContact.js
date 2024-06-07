import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SHADOW, SIZES, scale} from '../../../../../assets/constants';
import CheckBox from '../../../../../components/CheckBox';
import FormChangeContact from './FormChangeContact';
import {useLanguage} from '../../../../../hooks/useLanguage';

export default function InfoContact({data}) {
  const {t} = useLanguage();

  const typePeopleBooking = useRef([
    t('individual'),
    t('book_for_someone'),
  ]).current;

  const [userBooking, setUserBooking] = useState(typePeopleBooking[0]);

  return (
    <View
      style={{
        backgroundColor: '#fff',
        ...SHADOW,
        borderRadius: scale(10),
      }}>
      <FormChangeContact
        data={data}
        isOpen={userBooking === typePeopleBooking[1]}
      />

      <View style={styles.typePeople}>
        {typePeopleBooking?.map((item, index) => {
          return (
            <CheckBox
              key={index}
              textBold
              isRadio
              text={item}
              isChecked={userBooking === item}
              onPress={() => setUserBooking(item)}
              textStyle={{
                fontSize: SIZES.xMedium,
              }}
            />
          );
        })}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  typePeople: {
    rowGap: scale(10),
    backgroundColor: '#f5f5f5',
    padding: scale(12),
    borderBottomEndRadius: scale(10),
    borderBottomStartRadiusRadius: scale(10),
  },
});

import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import FormChangeContact from './FormChangeContact';
import {useLanguage} from '~/hooks/useLanguage';
import {COLORS, SHADOW, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';
import CheckBox from '~/components/CheckBox';

export default function InfoContact({data, isTour}) {
  const {t} = useLanguage();

  const typePeopleBooking = useRef([
    t('User information'),
    t('Change information'),
  ]).current;

  const [userBooking, setUserBooking] = useState(typePeopleBooking[0]);

  return (
    <View
      style={{
        ...SHADOW,
        borderRadius: scale(10),
      }}>
      <FormChangeContact
        data={data}
        isOpen={userBooking === typePeopleBooking[1]}
        isTour={isTour}
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
                color: COLORS.White,
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
    paddingHorizontal: scale(12),
    borderBottomEndRadius: scale(10),
    borderBottomStartRadiusRadius: scale(10),
  },
});

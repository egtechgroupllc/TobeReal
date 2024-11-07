import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';
import {CText} from '~/components';
import {useLanguage} from '~/hooks/useLanguage';

export default function Note() {
  const {t} = useLanguage();
  return (
    <View style={styles.view}>
      <CText
        style={{color: COLORS.White, fontSize: SIZES.medium}}
        textType="bold">
        *{t('note')}:{'\n'}
        <CText style={{color: COLORS.White}}>
          {t(
            'the_information_you_provide_will_be_used_to_create_a_medical_record',
          )}
          {'\n'}
        </CText>
        <CText style={{color: COLORS.White}}>
          -{' '}
          {t(
            'clearly_write_your_full_name_capitalizing_the_first_letters_e_g_mr_david',
          )}
          .{'\n'}
        </CText>
        <CText style={{color: COLORS.White}}>
          -{' '}
          {t(
            'fill_out_all_details_accurately_and_thoroughly_and_please_review_the_information_before_clicking_confirm',
          )}
          .
        </CText>
      </CText>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: COLORS.input,
    borderRadius: scale(5),
    rowGap: scale(15),
    padding: scale(15),
    borderWidth: scale(1),
    borderColor: COLORS.input,
  },
});

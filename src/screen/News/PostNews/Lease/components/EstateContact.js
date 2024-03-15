import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {CustomButton, CustomInput} from '../../../../../components';
import {useLanguage} from '../../../../../hooks/useLanguage';
import {IconRight} from '../../../../../assets/icon/Icon';
import Collapsible from 'react-native-collapsible';
import {COLORS, SIZES, scale} from '../../../../../assets/constants';
import {requireField} from '../../../../../utils/validate';

export default function EstateContact() {
  const {t} = useLanguage();
  const [viewContact, setViewContact] = useState(false);

  return (
    <View>
      <CustomButton
        outline
        style={styles.buttonCategories}
        text={t('estate_contact')}
        iconRight={() => <IconRight />}
        onPress={() => setViewContact(prev => !prev)}
        styleText={{
          color: COLORS.text,
        }}
      />

      <Collapsible collapsed={!viewContact} style={styles.box}>
        <CustomInput
          label={`${t('contact_info')}:`}
          styleTextLabel={styles.label}
          placeholder={t('full_name')}
          rules={requireField(t('this_field_required'))}
          style={{...styles.textInput}}
        />
        <CustomInput
          placeholder={t('phone')}
          rules={requireField(t('this_field_required'))}
          style={{...styles.textInput}}
        />

        <CustomInput
          placeholder={t('email')}
          rules={requireField(t('this_field_required'))}
          style={{...styles.textInput}}
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
    paddingTop: scale(20),
    minHeight: scale(100),
    backgroundColor: '#FFFFFF',
    borderRadius: scale(6),
    paddingHorizontal: scale(20),
    alignItems: 'center',
    borderColor: '#F0B90B80',
    borderWidth: scale(1),
    width: '100%',
    paddingBottom: scale(20),
    rowGap: scale(16),
  },
  textInput: {
    backgroundColor: '#E3E3E3',
    borderColor: '#E3E3E3',
    borderRadius: scale(6),
  },
  label: {
    fontSize: SIZES.xMedium,
    color: COLORS.black,
    marginBottom: SIZES.xSmall,
  },
});

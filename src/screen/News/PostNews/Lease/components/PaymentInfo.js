import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {CustomButton, CustomInput} from '../../../../../components';
import {useLanguage} from '../../../../../hooks/useLanguage';
import {IconDown, IconRight} from '../../../../../assets/icon/Icon';
import Collapsible from 'react-native-collapsible';
import {COLORS, SIZES, scale} from '../../../../../assets/constants';
import {requireField} from '../../../../../utils/validate';

export default function PaymentInfo() {
  const {t} = useLanguage();
  const [viewContact, setViewContact] = useState(false);

  return (
    <View>
      <CustomButton
        outline
        style={styles.buttonCategories}
        text={t('payment_information')}
        iconRight={() => <IconRight />}
        onPress={() => setViewContact(prev => !prev)}
        styleText={{
          color: COLORS.text,
        }}
      />

      <Collapsible collapsed={!viewContact} style={styles.box}>
        <CustomInput
          label={t('account_number')}
          placeholder={t('Select')}
          // value={t(selectedEstateCheckBox.name)}
          onPress={() => {}}
          rules={requireField(t('this_field_required'))}
          style={{...styles.textInput}}
          iconRight={() => <IconDown />}
          styleText={{color: COLORS.black}}
          styleTextLabel={{color: COLORS.black}}
        />
        <View style={styles.line} />

        <CustomInput
          label={t('account_number')}
          placeholder={t('account_number')}
          rules={requireField(t('this_field_required'))}
          style={{...styles.textInput}}
        />
        <View style={styles.line} />

        <CustomInput
          label={t('account_holder')}
          placeholder={t('account_holder')}
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
  line: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#F0B90B',
  },
});

import {useQuery} from '@tanstack/react-query';
import React, {useEffect, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Collapsible from 'react-native-collapsible';

import {getListTypeEstateSell} from '../../../../../../Model/api/common';
import {COLORS, SIZES, scale} from '../../../../../../assets/constants';
import {CustomInput} from '../../../../../../components';
import InViewPort from '../../../../../../components/InViewport';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import {
  requireField,
  validateMaxLengthText,
} from '../../../../../../utils/validate';
import ButtonTabValidate from '../../../Lease/components/ButtonTabValidate';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import {ScrollView} from 'react-native-gesture-handler';
import CheckBox from '../../../../../../components/CheckBox';
import CustomText from '../../../../../../components/CustomText';
import PricePercentTicket from './PricePercentTicket';

export default function TypeTicket({
  maxCharacters,
  control,
  setValue,
  watch,
  errors,
  manage,
  priceListed,
  update,
}) {
  const {t} = useLanguage();

  const [isView, setView] = useState(false);

  const viewGeneral = () => {
    setView(prev => !prev);
  };

  const arrKeywords = useRef([
    'description',
    'quantity',
    'price_percent',
    'name',
  ]).current;

  return (
    <View style={{marginTop: scale(-10)}}>
      <ButtonTabValidate
        title={t('type_ticket')}
        onPress={viewGeneral}
        errors={errors}
        watch={watch}
        arrKeywords={arrKeywords}
        disabled={!watch('price') ? true : false}
      />

      <InViewPort noLoading={true}>
        <Collapsible
          collapsed={
            (manage && !manage) || (update && !update) ? !isView : isView
          }
          style={styles.box}>
          <View
            style={{
              borderWidth: scale(1),
              borderColor: '#EEEEEE',
              marginBottom: scale(10),
              minHeight: scale(40),
              padding: scale(10),
              rowGap: scale(10),
            }}>
            <CustomInput
              label={t('name')}
              control={control}
              name="name_item"
              placeholder={t('enter_name_type_ticket')}
              rules={requireField(t('this_field_required'))}
              style={{...styles.textInput}}
            />
            <CustomInput
              styleTextLabel={styles.label}
              label={t('description_content')}
              control={control}
              name="description_item"
              placeholder={t('enter_a_description')}
              rules={[requireField(t('this_field_required'))]}
              style={[
                styles.textInput,
                {
                  minHeight: scale(50),
                  maxHeight: scale(300),
                },
              ]}
            />
            <PricePercentTicket
              watch={watch}
              control={control}
              setValue={setValue}
              priceListed={priceListed}
              update={update}
            />

            <CustomInput
              label={t('quantity')}
              control={control}
              name="quantity"
              placeholder={t('Enter quantity')}
              rules={requireField(t('this_field_required'))}
              style={{...styles.textInput}}
              keyboardType="number-pad"
              enableFormatNum
              maxLength={2}
            />
          </View>
        </Collapsible>
      </InViewPort>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: SIZES.xMedium,
    color: COLORS.black,
  },
  text2: {
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  box: {
    paddingTop: scale(20),
    minHeight: scale(100),
    backgroundColor: '#FFFFFF',
    borderRadius: scale(6),
    paddingHorizontal: scale(10),
    // alignItems: 'center',
    borderColor: '#F0B90B80',
    borderWidth: scale(1),
    width: '100%',
    paddingBottom: scale(20),
    rowGap: scale(16),
  },
  line: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#F0B90B',
  },

  textInput: {
    backgroundColor: '#E3E3E3',
    borderColor: '#E3E3E3',
    borderRadius: scale(6),
  },
  numText: {
    fontSize: SIZES.small,
    position: 'absolute',
    top: scale(-20),
    right: 0,
    color: COLORS.black,
  },
});

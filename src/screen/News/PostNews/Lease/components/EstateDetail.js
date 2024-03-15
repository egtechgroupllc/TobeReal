import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {CustomButton, CustomInput} from '../../../../../components';
import {IconRight} from '../../../../../assets/icon/Icon';
import {COLORS, SIZES, scale} from '../../../../../assets/constants';
import CustomText from '../../../../../components/CustomText';
import DatePicker from 'react-native-date-picker';
import {requireField} from '../../../../../utils/validate';
import {useForm} from 'react-hook-form';
import {useLanguage} from '../../../../../hooks/useLanguage';
import Collapsible from 'react-native-collapsible';
import {formatDate, formatDistance} from 'date-fns';
import {formatDateTime} from '../../../../../utils/format';
import TimeCheckOut from './EstateDetail/TimeCheckOut';
import SelectCurrency from '../../components/SelectCurrency';
import TimeCheckIn from './EstateDetail/TimeCheckIn';

let date = new Date();
export default function EstateDetail() {
  const {t} = useLanguage();
  const {control, watch, setValue} = useForm();

  const [viewDetail, setViewDetail] = useState(false);

  return (
    <View>
      <CustomButton
        outline
        style={styles.buttonCategories}
        text={t('estate_detail')}
        iconRight={() => <IconRight />}
        onPress={() => setViewDetail(prev => !prev)}
        styleText={{
          color: COLORS.text,
        }}
      />

      <Collapsible collapsed={!viewDetail} style={styles.box}>
        <SelectCurrency
          onChange={value => {
            setValue('check_in_time_start', value?.timeCheckStart);
          }}
        />

        <View style={styles.line} />

        <TimeCheckIn
          onChange={value => {
            setValue('check_in_time_start', value?.timeCheckStart);
            setValue('check_in_time_end', value?.timeCheckEnd);
          }}
        />
        <TimeCheckOut
          onChange={value => {
            setValue('check_out_time_start', value?.timeCheckStart);
            setValue('check_out_time_end', value?.timeCheckEnd);
          }}
        />

        <View style={styles.line} />

        <CustomInput
          label={t('distance_to_city')}
          styleTextLabel={styles.label}
          control={control}
          name="km"
          placeholder={t('KM')}
          rules={requireField(t('this_field_required'))}
          style={{...styles.textInput}}
        />

        <View style={styles.line} />

        <CustomInput
          label={t('number_of_floors')}
          styleTextLabel={styles.label}
          control={control}
          name="floor"
          placeholder={t('floors')}
          rules={requireField(t('this_field_required'))}
          style={{...styles.textInput}}
        />
      </Collapsible>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: SIZES.small,
    color: COLORS.black,
  },
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
  line: {
    borderWidth: 0.5,
    width: '100%',
    marginTop: scale(10),
    borderColor: '#F0B90B',
  },

  textInput: {
    backgroundColor: '#E3E3E3',
    borderColor: '#E3E3E3',
    borderRadius: scale(6),
  },
});

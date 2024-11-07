import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Input from '~/components/Input';
import {useLanguage} from '~/hooks/useLanguage';
import {requireField} from '~/utils/validate';
import {COLORS, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';
import {CText} from '~/components';
import {formatDate} from '~/utils/format';
import DatePicker from 'react-native-date-picker';
import ButtonTabValidate from '~/components/ChoosePhoto/ButtonTabValidate';
import Collapsible from 'react-native-collapsible';
import SelectCountry from '~/components/Country/SelectCountry';

export default function General({control, setValue, errors, watch, data}) {
  const {t} = useLanguage();

  const listSort = [
    {id: 'Male', name: t('male')},
    {id: 'Female', name: t('female')},
  ];
  const [checked, setChecked] = useState(listSort?.[0]?.id);
  const [openCheckStart, setOpenCheckStart] = useState(false);
  const [isView, setView] = useState(false);
  const arrKeywords = useRef([
    'fullname',
    'address',
    'gender',
    'birthday',
  ]).current;

  const [timeCheckStart, setTimeCheckStart] = useState(
    new Date('2024-01-01T6:00:00'),
  );
  useEffect(() => {
    setValue('gender', checked);
    setValue('birthday', formatDate(timeCheckStart));
  }, [checked, timeCheckStart]);
  const viewGeneral = () => {
    setView(prev => !prev);
  };

  return (
    <View>
      <ButtonTabValidate
        title={t('general_information')}
        onPress={viewGeneral}
        errors={errors}
        watch={watch}
        arrKeywords={arrKeywords}
      />
      <Collapsible collapsed={!isView} style={styles.box}>
        <Input
          label={t('full_name')}
          control={control}
          name="fullname"
          placeholder={t('enter_fullname')}
          rules={[requireField(t('this_field_required'))]}
          style={styles.textInput}
          sizeInput="medium"
          styleTextLabel={styles.styleLabel}
          styleContent={{backgroundColor: COLORS.input, borderWidth: 0}}
          styleText={{
            fontSize: SIZES.xMedium,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: scale(130),
            columnGap: scale(20),
          }}>
          <CText style={{color: COLORS.White}}>{t('gender')}:</CText>
          {listSort.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.item}
              activeOpacity={0.7}
              onPress={() => {
                setChecked(item?.id);
              }}>
              <View style={styles.radio}>
                {checked === item?.id ? <View style={styles.dot} /> : null}
              </View>
              <CText style={{color: COLORS.White}}>{item?.name}</CText>
            </TouchableOpacity>
          ))}
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: scale(20),
          }}>
          <CText style={{color: COLORS.White, fontSize: SIZES.xMedium}}>
            {t('date_of_birth')}
          </CText>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setOpenCheckStart(true)}>
            <CText style={{color: COLORS.White}}>
              {formatDate(timeCheckStart)}
            </CText>
          </TouchableOpacity>
        </View>
        <DatePicker
          mode="date"
          title={t('select_hour')}
          modal
          open={openCheckStart}
          date={timeCheckStart}
          onConfirm={time => {
            setOpenCheckStart(false);
            setTimeCheckStart(time);
          }}
          onCancel={() => {
            setOpenCheckStart(false);
          }}
        />
        <Input
          label={t('phone')}
          control={control}
          name="phone"
          placeholder={t('enter_phone')}
          rules={[requireField(t('this_field_required'))]}
          style={styles.textInput}
          sizeInput="medium"
          styleTextLabel={styles.styleLabel}
          styleContent={{backgroundColor: COLORS.input, borderWidth: 0}}
          styleText={{
            fontSize: SIZES.xMedium,
          }}
          keyboardType="numeric"
        />
        <SelectCountry setValue={setValue} control={control} watch={watch} />

        <Input
          label={t('address')}
          control={control}
          name="address"
          placeholder={t('enter_address')}
          style={styles.textInput}
          sizeInput="medium"
          rules={[requireField(t('this_field_required'))]}
          styleTextLabel={styles.styleLabel}
          styleContent={{backgroundColor: COLORS.input, borderWidth: 0}}
          styleText={{
            fontSize: SIZES.xMedium,
          }}
        />
      </Collapsible>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    rowGap: scale(14),
    marginTop: '10%',
    paddingHorizontal: scale(12),
  },
  button: {
    width: '100%',
    marginTop: scale(30),
  },
  input: {
    height: scale(30),
    backgroundColor: COLORS.input,
    paddingHorizontal: scale(10),
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: scale(10),
  },
  box: {
    paddingTop: scale(20),
    minHeight: scale(100),
    borderRadius: scale(6),
    paddingHorizontal: scale(15),
    borderColor: COLORS.input,
    borderWidth: scale(1),
    width: '100%',
    paddingBottom: scale(20),
    rowGap: scale(16),
  },
  textInput: {
    backgroundColor: COLORS.grey50,
    borderWidth: 0,
  },
  styleLabel: {
    textType: 'medium',
  },
  radio: {
    height: scale(10),
    aspectRatio: 1,
    borderRadius: 99,
    alignItems: 'center',
    backgroundColor: COLORS.White,
    justifyContent: 'center',
  },
  dot: {
    height: '100%',
    aspectRatio: 1,
    borderRadius: 99,
    backgroundColor: COLORS.green,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(4),
    columnGap: scale(10),
  },
});

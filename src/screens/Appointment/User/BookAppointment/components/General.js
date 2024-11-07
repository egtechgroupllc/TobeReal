import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Input from '~/components/Input';
import {scale} from '~/utils/scale';
import {requireField, validateEmail} from '~/utils/validate';
import {useLanguage} from '~/hooks/useLanguage';
import {CText} from '~/components';
import {COLORS} from '~/assets/constants';
import {formatDate} from '~/utils/format';
import DatePicker from 'react-native-date-picker';
import SelectCountry from '~/components/Country/SelectCountry';

export default function General({control, setValue, params, watch}) {
  const {t} = useLanguage();
  const listSort = [
    {id: 'MALE', name: t('male')},
    {id: 'FEMALE', name: t('female')},
  ];
  const [openCheckStart, setOpenCheckStart] = useState(false);
  const [checked, setChecked] = useState(params?.gender || listSort?.[0]?.id);
  const [timeCheckStart, setTimeCheckStart] = useState(
    new Date(`${params?.birth_date || '2024-01-01'}T6:00:00`),
  );

  useEffect(() => {
    setValue('gender', checked);
    setValue('birth_date', formatDate(timeCheckStart));
  }, [checked, timeCheckStart]);
  return (
    <View style={{rowGap: scale(15)}}>
      <Input
        control={control}
        maxLength={30}
        styleContent={{...styles.input, borderWidth: scale(0)}}
        sizeInput="small"
        rules={[requireField(t('this_field_required'))]}
        name="name"
        placeholder={t('enter_fullname')}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
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
        <CText style={{color: COLORS.White}}>{t('date_of_birth')}</CText>
        <TouchableOpacity
          style={styles.inputBirthday}
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
        name={'phone'}
        placeholder={t('phone')}
        control={control}
        rules={[requireField(t('this_field_required'))]}
        styleContent={{...styles.input, borderWidth: scale(0)}}
        sizeInput="small"
        keyboardType="number-pad"
      />
      <Input
        control={control}
        styleContent={{...styles.input, borderWidth: scale(0)}}
        sizeInput="small"
        rules={[
          requireField(t('this_field_required')),
          validateEmail(t('invalid_email')),
        ]}
        name="email"
        placeholder={t('enter_email')}
      />

      <SelectCountry setValue={setValue} control={control} />

      <Input
        control={control}
        styleContent={{...styles.input, borderWidth: scale(0)}}
        sizeInput="small"
        name="address"
        placeholder={t('enter_address')}
      />
      <Input
        control={control}
        styleContent={{...styles.input, borderWidth: scale(0)}}
        sizeInput="small"
        name="description"
        placeholder={t('enter_medical_examination_reason')}
        multiline
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: COLORS.input,
    borderRadius: scale(5),
    rowGap: scale(15),
    padding: scale(15),
  },
  inputBirthday: {
    height: scale(30),
    backgroundColor: COLORS.input,
    paddingHorizontal: scale(10),
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: scale(10),
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(10),
  },
  viewLogo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: scale(120),
  },

  image: {
    width: scale(210),
    height: scale(100),
    marginBottom: scale(40),
  },
  imageBack: {
    width: scale(70),
    height: scale(70),
  },
  logo: {
    width: scale(40),
    height: scale(40),
    marginVertical: scale(10),
  },

  input: {
    backgroundColor: COLORS.input,
    borderRadius: scale(5),
    alignSelf: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(4),
    columnGap: scale(10),
    flex: 1,
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
});

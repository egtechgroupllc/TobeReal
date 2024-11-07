import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useLanguage} from '~/hooks/useLanguage';
import {useNavigation} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';
import Input from '~/components/Input';
import {requireField, validateEmail} from '~/utils/validate';
import {COLORS, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';
import {CText} from '~/components';
import {formatDate} from '~/utils/format';
import DatePicker from 'react-native-date-picker';
import SelectCountry from '~/components/Country/SelectCountry';
import ButtonTabValidate from '~/components/ChoosePhoto/ButtonTabValidate';
import Collapsible from 'react-native-collapsible';

export default function General({control, setValue, errors, watch, params}) {
  const {t} = useLanguage();
  const listRelative = [
    {id: 'FATHER', name: t('FATHER')},
    {id: 'MOTHER', name: t('MOTHER')},
    {id: 'WIFE', name: t('WIFE')},
    {id: 'HUSBAND', name: t('HUSBAND')},
    {id: 'CHILD', name: t('CHILD')},
    {id: 'OTHER', name: t('other')},
  ];
  const listSort = [
    {id: 'MALE', name: t('male')},
    {id: 'FEMALE', name: t('female')},
  ];
  const {navigate} = useNavigation();
  const [isView, setView] = useState(false);
  const [openCheckStart, setOpenCheckStart] = useState(false);
  const [timeCheckStart, setTimeCheckStart] = useState(
    new Date(`${params?.birth_date || '2024-01-01'}T6:00:00`),
  );
  const [checked, setChecked] = useState(listSort?.[0]?.id);

  const [checkRelationship, setCheckRelationship] = useState(
    params?.relationship || listRelative?.[0]?.id,
  );
  const [inputValue, setInputValue] = useState('');
  const viewGeneral = () => {
    setView(prev => !prev);
  };

  const arrKeywords = useRef([
    'name',
    'gender',
    'date_of_birth',
    'phone',
    'address',
    'relationship',
  ]).current;
  useEffect(() => {
    setValue('gender', checked);
    setValue('relationship', checkRelationship);
    setValue('birth_date', formatDate(timeCheckStart));
  }, [checked, timeCheckStart, checkRelationship]);
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
        <View style={styles.container}>
          <Input
            label={t('full_name')}
            control={control}
            name="name"
            placeholder={t('enter_fullname')}
            rules={[requireField(t('this_field_required'))]}
            styleContent={{
              backgroundColor: COLORS.input,
              borderWidth: 0,
            }}
            style={styles.textInput}
            sizeInput="medium"
            styleTextLabel={styles.styleLabel}
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
            <CText style={{color: COLORS.White, fontSize: SIZES.xMedium}}>
              {t('gender')}:
            </CText>
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
            label={t('phone')}
            control={control}
            name="phone"
            placeholder={t('enter_phone')}
            styleContent={{
              backgroundColor: COLORS.input,
              borderWidth: 0,
            }}
            rules={[requireField(t('this_field_required'))]}
            style={styles.textInput}
            sizeInput="medium"
            styleTextLabel={styles.styleLabel}
            styleText={{
              fontSize: SIZES.xMedium,
            }}
            keyboardType="numeric"
          />
          <Input
            label={t('email')}
            control={control}
            name="email"
            placeholder={t('enter_email')}
            styleContent={{
              backgroundColor: COLORS.input,
              borderWidth: 0,
            }}
            rules={[
              requireField(t('this_field_required')),
              validateEmail(t('invalid_email')),
            ]}
            style={styles.textInput}
            sizeInput="medium"
            styleTextLabel={styles.styleLabel}
            styleText={{
              fontSize: SIZES.xMedium,
            }}
          />
          <SelectCountry setValue={setValue} control={control} />

          <Input
            label={t('address')}
            control={control}
            name="address"
            styleContent={{
              backgroundColor: COLORS.input,
              borderWidth: 0,
            }}
            placeholder={t('enter_address')}
            rules={[requireField(t('this_field_required'))]}
            style={styles.textInput}
            sizeInput="medium"
            styleTextLabel={styles.styleLabel}
            styleText={{
              fontSize: SIZES.xMedium,
            }}
          />
          <CText style={{color: COLORS.White, fontSize: SIZES.xMedium}}>
            {t('relationship')}
          </CText>

          <FlatList
            data={listRelative}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  styles.item,
                  {width: '30%', marginHorizontal: scale(5)},
                ]}
                activeOpacity={0.7}
                onPress={() => {
                  setCheckRelationship(item?.id);
                }}>
                <View style={styles.radio}>
                  {checkRelationship === item?.id ? (
                    <View style={styles.dot} />
                  ) : null}
                </View>
                <CText style={{color: COLORS.White, fontSize: SIZES.xMedium}}>
                  {item?.name}
                </CText>
              </TouchableOpacity>
            )}
            contentContainerStyle={{
              minHeight: scale(50),
            }}
          />
          {checkRelationship === 'OTHER' && (
            <Input
              placeholder={t('enter_field')}
              rules={[requireField(t('this_field_required'))]}
              style={styles.textInput}
              sizeInput="medium"
              styleTextLabel={styles.styleLabel}
              styleText={{
                fontSize: SIZES.xMedium,
              }}
              value={inputValue}
              onChangeText={text => setInputValue(text)}
            />
          )}
        </View>
      </Collapsible>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: scale(14),
  },
  inputBirthday: {
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
    paddingHorizontal: scale(10),
    borderColor: COLORS.input,
    borderWidth: scale(1),
    width: '100%',
    paddingBottom: scale(20),
    rowGap: scale(16),
  },
  button: {
    width: '100%',
    marginTop: scale(30),
  },

  textInput: {
    backgroundColor: COLORS.grey,
    borderWidth: 0,
  },
  styleLabel: {
    fontSize: SIZES.xMedium,
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

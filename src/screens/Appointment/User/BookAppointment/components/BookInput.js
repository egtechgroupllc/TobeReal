import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import DatePicker from 'react-native-date-picker';
import {getListRelationship} from '~/api/relative';
import {COLORS, SIZES} from '~/assets/constants';
import {Button, CText} from '~/components';
import BottomSheet from '~/components/BottomSheet';
import CheckBox from '~/components/CheckBox';
import ButtonTabValidate from '~/components/ChoosePhoto/ButtonTabValidate';
import SelectCountry from '~/components/Country/SelectCountry';
import Input from '~/components/Input';
import {useLanguage} from '~/hooks/useLanguage';
import {formatDate} from '~/utils/format';
import {scale} from '~/utils/scale';
import {requireField, validateEmail} from '~/utils/validate';
import General from './General';

export default function BookInput({control, watch, setValue, errors, reset}) {
  const {t} = useLanguage();
  const [isView, setView] = useState(false);
  const {navigate} = useNavigation();
  const arrKeywords = useRef([
    'name',
    'phone',
    'email',
    'address',
    'country_id',
    'province_id',
    'description',
  ]).current;

  const listChoose = [
    {
      id: 'OTHER',
      name: t('book_for_someone_else'),
    },
    {
      id: 'FAMILY',
      name: t('book_for_family_member'),
    },
  ];
  const fake = [
    {
      id: 'MYSELF',
      name: 'Myself',
    },
    {
      id: 'MOM',
      name: 'Mom',
    },
    {
      id: 'DAD',
      name: 'Dad',
    },
  ];
  const [selectChoose, setSelectChoose] = useState();
  const [selectInfo, setSelectInfo] = useState(fake?.[0]?.id);
  const bottomSheetRef = useRef();

  const viewGeneral = () => {
    setView(prev => !prev);
  };
  const handleSelect = value => {
    setSelectChoose(value);
    if (value === 'FAMILY') {
      bottomSheetRef.current.open();
    }
  };
  const handleSelectInfo = value => {
    setSelectInfo(value);
    bottomSheetRef.current.close();
  };

  useEffect(() => {
    if (selectChoose) {
      setView(true);
    } else {
      setView(false);
    }
  }, [selectChoose]);

  const {data, isLoading, error} = useQuery({
    queryKey: [...getListRelationship.queryKey],
    queryFn: () => getListRelationship(),
  });

  useEffect(() => {
    if (selectInfo?.relationship) {
      reset();

      const entries = Object.entries(selectInfo);
      const arrKeyno = [
        'id',
        'userid',
        'created_at',
        'active',
        'country',
        'province',
        'relationship',
        'image_avatar',
      ];

      entries.map(item => {
        if (!arrKeyno.includes(item[0])) {
          const checkNum = typeof item[1] === 'number';
          setValue(item[0], checkNum ? String(item[1]) : item[1]);
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectInfo]);
  return (
    <View>
      <View
        style={{
          columnGap: scale(20),
          borderWidth: scale(1),
          padding: scale(10),
          marginBottom: scale(10),
          borderColor: COLORS.input,
          borderRadius: scale(5),
          backgroundColor: COLORS.input,
          paddingHorizontal: scale(15),
        }}>
        {listChoose.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{...styles.item}}
            activeOpacity={0.7}
            onPress={() => handleSelect(item?.id)}>
            <View style={{...styles.radio, height: scale(12)}}>
              {selectChoose === item?.id ? <View style={styles.dot} /> : null}
            </View>
            <CText style={{color: COLORS.White, fontSize: SIZES.xMedium}}>
              {item?.name}
            </CText>
          </TouchableOpacity>
        ))}
      </View>
      <ButtonTabValidate
        title={t('patient_information')}
        onPress={viewGeneral}
        errors={errors}
        watch={watch}
        arrKeywords={arrKeywords}
      />
      <Collapsible collapsed={!isView} style={styles.view}>
        <General
          control={control}
          setValue={setValue}
          params={selectInfo}
          watch={watch}
        />
      </Collapsible>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={['40%', '70%']}
        titleIndicator={t('information')}
        // onDismiss={!apply && reset}
        styleContent={{
          paddingHorizontal: scale(30),
          rowGap: scale(16),
        }}>
        {data?.data?.booking_orders?.map((item, index) => {
          return (
            <TouchableOpacity
              style={{flexDirection: 'row', justifyContent: 'space-between'}}
              key={index}
              onPress={() => handleSelectInfo(item)}>
              <CText style={{fontSize: SIZES.medium, color: COLORS.White}}>
                {item?.name}
              </CText>
              <CheckBox
                key={index}
                textBold
                isRadio
                // text={item}
                isChecked={selectInfo === item}
                onPress={() => handleSelectInfo(item)}
                textStyle={{
                  fontSize: SIZES.xMedium,
                }}
              />
            </TouchableOpacity>
          );
        })}
        <Button
          title={t('add_more_relative_information')}
          onPress={() => {
            bottomSheetRef.current.close();
            navigate('NoBottomTab', {screen: 'AddRelativeProfileScreen'});
          }}
          linearGradientProps={{colors: COLORS.linearButton}}
        />
      </BottomSheet>
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

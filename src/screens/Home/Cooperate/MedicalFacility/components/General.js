import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ButtonTabValidate from '~/components/ChoosePhoto/ButtonTabValidate';
import {useLanguage} from '~/hooks/useLanguage';
import Collapsible from 'react-native-collapsible';
import {scale} from '~/utils/scale';
import {COLORS, SIZES} from '~/assets/constants';
import Input from '~/components/Input';
import {requireField} from '~/utils/validate';
import SelectCountry from '~/components/Country/SelectCountry';
import {useNavigation} from '@react-navigation/native';
import RenderHTML from 'react-native-render-html';
import {preprocessHtml} from '~/utils/preprocessHtml';
import {CText} from '~/components';

export default function General({
  control,
  errors,
  watch,
  setValue,
  onGoBack,
  data,
}) {
  const {t} = useLanguage();
  const {width} = useWindowDimensions();
  const {navigate} = useNavigation();
  const [isView, setView] = useState(false);
  const [dataGoBack, setDataGoBack] = useState('');

  const arrKeywords = useRef(['name', 'description', 'address']).current;
  const viewGeneral = () => {
    setView(prev => !prev);
  };
  useEffect(() => {
    onGoBack && onGoBack(dataGoBack);
  }, [dataGoBack, onGoBack]);
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
          label={t('medical_facility_name')}
          control={control}
          name="name"
          placeholder={t('enter_medical_facility_name')}
          rules={[requireField(t('this_field_required'))]}
          styleContent={{backgroundColor: COLORS.input, borderWidth: 0}}
          styleTextLabel={styles.styleLabel}
          style={{...styles.textInput}}
          styleText={{
            fontSize: SIZES.xMedium,
          }}
          sizeInput="medium"
        />
        <Input
          label={t('medical_facility_phone')}
          control={control}
          name="phone"
          placeholder={t('enter_medical_facility_phone')}
          rules={[requireField(t('this_field_required'))]}
          styleContent={{backgroundColor: COLORS.input, borderWidth: 0}}
          styleTextLabel={styles.styleLabel}
          style={{...styles.textInput}}
          styleText={{
            fontSize: SIZES.xMedium,
          }}
          sizeInput="medium"
        />
        <SelectCountry setValue={setValue} control={control} />
        <Input
          label={t('address')}
          control={control}
          name="address"
          placeholder={t('enter_address')}
          rules={[requireField(t('this_field_required'))]}
          sizeInput="medium"
          styleContent={{backgroundColor: COLORS.input, borderWidth: 0}}
          styleTextLabel={styles.styleLabel}
          style={{...styles.textInput}}
          styleText={{
            fontSize: SIZES.xMedium,
          }}
        />
        <View style={{rowGap: scale(5), width: '100%'}}>
          <CText
            style={{
              fontSize: SIZES.xMedium,
              color: COLORS.White,
              alignSelf: 'flex-start',
            }}>
            {t('description')}
          </CText>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.input,
              borderRadius: scale(10),
              padding: scale(10),
              height: scale(150),
              width: '100%',
            }}
            onPress={() => {
              navigate('EditorScreen', {
                description: true,
                title: 'Description',
                dataExist: dataGoBack,
                onGoBack: value => {
                  setDataGoBack(value);
                },
              });
            }}>
            <View style={{height: '100%', overflow: 'hidden'}}>
              {data ? (
                <RenderHTML
                  contentWidth={width}
                  source={preprocessHtml(data)}
                  baseStyle={{
                    color: 'white',
                  }}
                  tagsStyles={{
                    p: {
                      marginVertical: 0,
                    },
                  }}
                />
              ) : (
                <CText
                  style={{fontSize: SIZES.xMedium, color: COLORS.greyLight}}
                  numberOfLines={5}>
                  Enter description
                </CText>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </Collapsible>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    paddingTop: scale(20),
    minHeight: scale(100),
    borderRadius: scale(6),
    paddingHorizontal: scale(10),
    alignItems: 'center',
    borderColor: COLORS.input,
    borderWidth: scale(1),
    width: '100%',
    paddingBottom: scale(20),
    rowGap: scale(16),
  },
  textInput: {
    backgroundColor: COLORS.grey,
    borderWidth: 0,
  },
  styleLabel: {
    fontSize: SIZES.xMedium,
  },
});

import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, SIZES, scale} from '../../../../../assets/constants';
import {
  IconCheckBox,
  IconDown,
  IconRight,
  IconUnCheckBox,
} from '../../../../../assets/icon/Icon';
import {CustomButton, CustomInput} from '../../../../../components';
import CustomText from '../../../../../components/CustomText';
import {useLanguage} from '../../../../../hooks/useLanguage';
import {requireField, validateMaxAmount} from '../../../../../utils/validate';
import Map from '../../../../Explore/components/DetailAccommodation/Map';
import Collapsible from 'react-native-collapsible';
import CheckBox from '../../../../../components/CheckBox';
const dataRealEstateType = [
  {id: '1', name: 'Hotel'},
  {id: '2', name: 'Hostel'},
  {id: '3', name: 'Villa'},
  {id: '4', name: 'Resort'},
  {id: '5', name: 'Apartment'},
  {id: '6', name: 'Homestay'},
];

export default function GeneralInformation({maxCharacters}) {
  const {control, watch, handleSubmit, setValue} = useForm();

  const {t} = useLanguage();
  const [isView, setView] = useState(false);
  const [showRealEstateType, setShowRealEstateType] = useState('');
  const viewShowRealEstateType = () => {
    setShowRealEstateType(prevshowRealEstateType => !prevshowRealEstateType);
  };
  const viewGeneral = () => {
    setView(prev => !prev);
  };
  const [selectedEstateCheckBox, setSelectedEstateCheckBox] = useState('');

  const estateTypeCheckBox = name => {
    setSelectedEstateCheckBox(selectedEstateCheckBox === name ? '' : name);
    setShowRealEstateType(false);
  };
  useEffect(() => {
    setValue('real_estate_type', selectedEstateCheckBox);
  }, [selectedEstateCheckBox]);

  return (
    <View>
      <CustomButton
        outline
        style={[styles.buttonCategories]}
        text={t('general_information')}
        iconRight={() => <IconRight />}
        onPress={viewGeneral}
        noDelay
      />

      <Collapsible collapsed={!isView} style={styles.box}>
        <CustomInput
          styleTextLabel={styles.label}
          label={t('real_estate_title')}
          control={control}
          name="name"
          multiline
          maxLength={maxCharacters}
          placeholder={t('enter_real_estate_title')}
          rules={[
            requireField(t('this_field_required')),
            validateMaxAmount('maxCharacters characters limit', maxCharacters),
          ]}
          style={styles.textArea}
          componentRight={
            <Text style={styles.numText}>
              {watch('name')?.length || 0}/{maxCharacters}
            </Text>
          }
        />

        <CustomInput
          styleTextLabel={styles.label}
          label={t('description_content')}
          control={control}
          name="description"
          maxLength={maxCharacters}
          multiline
          placeholder={t('enter_a_description')}
          rules={[
            requireField(t('this_field_required')),
            validateMaxAmount(maxCharacters, 'maxCharacters characters limit'),
          ]}
          style={styles.textArea}
          componentRight={
            <Text style={styles.numText}>
              {watch('description')?.length || 0}/{maxCharacters}
            </Text>
          }
        />

        <CustomInput
          styleTextLabel={styles.label}
          label={t('address')}
          control={control}
          name="address"
          placeholder={t('address')}
          rules={{
            ...requireField(t('this_field_required')),
          }}
          style={styles.textInput}
        />

        <View style={{width: '110%'}}>
          <Map />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: scale(40),
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <CustomText
            textType="medium"
            style={{
              ...styles.text1,
              color: COLORS.black,
            }}>
            {t('country')}
          </CustomText>

          <CustomInput
            onPress={() => {}}
            control={control}
            name="country_id"
            placeholder="USA"
            rules={{
              ...requireField(t('this_field_required')),
            }}
            style={{
              backgroundColor: '#E3E3E3',
              borderColor: '#E3E3E3',
              width: '50%',
            }}
            iconRight={() => <IconDown />}
          />
        </View>

        <View
          style={{
            width: '100%',
          }}>
          <CustomInput
            label={t('real_estate_type')}
            defaultValue={t(selectedEstateCheckBox) || t('real_estate_type')}
            onPress={viewShowRealEstateType}
            control={control}
            name="real_estate_type"
            rules={{
              ...requireField(t('this_field_required')),
            }}
            style={
              !showRealEstateType
                ? styles.buttonEstateType
                : styles.buttonEstateTypes
            }
            iconRight={() => <IconDown />}
          />
          <Collapsible collapsed={!showRealEstateType}>
            <FlatList
              data={dataRealEstateType}
              style={{
                width: '100%',
              }}
              contentContainerStyle={styles.listEstateType}
              scrollEnabled={false}
              renderItem={({item}) => (
                <CheckBox
                  text={item.name}
                  textLeft
                  isRadio
                  disabled={selectedEstateCheckBox === item.name}
                  onPress={() => estateTypeCheckBox(item.name)}
                  isChecked={selectedEstateCheckBox === item.name}
                  style={{
                    justifyContent: 'space-between',
                    paddingHorizontal: scale(12),
                    paddingVertical: scale(5),
                    width: '100%',
                  }}
                />
              )}
              keyExtractor={item => item.id}
            />
          </Collapsible>
        </View>
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
  textArea: {
    backgroundColor: '#E3E3E3',
    borderColor: '#E3E3E3',
    borderRadius: scale(6),
    height: scale(100),
    paddingHorizontal: scale(10),
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
  text: {
    fontSize: SIZES.small,
  },

  text2: {
    fontSize: SIZES.medium,
  },

  buttonEstateType: {
    borderWidth: scale(2),
    borderColor: '#EEEEEE',
    borderRadius: scale(10),
    width: '100%',
    height: scale(40),
    justifyContent: 'center',
    // backgroundColor:'#E3E3E3'
  },
  buttonEstateTypes: {
    borderRadius: scale(10),
    borderWidth: scale(2),
    borderColor: '#EEEEEE',
    width: '100%',
    height: scale(40),
    justifyContent: 'center',
  },
  listEstateType: {
    borderRadius: scale(10),
    backgroundColor: '#EEEEEE',
    paddingVertical: scale(5),
    width: '100%',
  },
});

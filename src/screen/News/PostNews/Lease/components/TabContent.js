import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useForm} from 'react-hook-form';
import {Image, StyleSheet, View} from 'react-native';

import {COLORS, SIZES, images, scale} from '../../../../../assets/constants';
import {CustomButton} from '../../../../../components';
import CheckBox from '../../../../../components/CheckBox';
import CustomText from '../../../../../components/CustomText';
import {useLanguage} from '../../../../../hooks/useLanguage';
import EstateContact from './EstateContact';
import EstateDetail from './EstateDetail';
import EstateFacilities from './EstateFacilities';
import EstatePhoto from './EstatePhoto';
import EstateRooms from './EstateRooms';
import GeneralInformation from './GeneralInformation';
import PaymentInfo from './PaymentInfo';

const maxCharacters = 1000;
export default function TabContent() {
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  const {handleSubmit, getValues} = useForm();

  const goContract = () => {
    navigate('ContractScreen');
  };

  return (
    <View
      style={{
        width: '90%',
        alignItems: 'center',
        marginVertical: scale(30),
        rowGap: scale(20),
        alignSelf: 'center',
      }}>
      <View style={styles.button}>
        <Image
          source={images.lease}
          style={{width: scale(38), height: scale(38)}}
        />
        <CustomText
          textType="medium"
          style={{...styles.text2, marginLeft: scale(20)}}>
          {t('lease')}
        </CustomText>
      </View>

      <View>
        <GeneralInformation maxCharacters={maxCharacters} />

        <EstateDetail />

        <EstateFacilities />

        <EstateContact />

        {/* <EstateRooms /> */}

        <EstatePhoto />

        <PaymentInfo />
      </View>

      <CheckBox
        text={t('do_you_agree')}
        textLeft
        textStyle={{
          color: COLORS.black,
          fontSize: SIZES.xSmall,
        }}
        fillColor="red"
      />

      <CustomButton
        linearGradientProps
        buttonType="medium"
        text={t('post')}
        onPress={handleSubmit(goContract)}
        style={{
          marginTop: scale(20),
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: scale(16),
    rowGap: scale(14),
  },
  category: {
    rowGap: scale(14),
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  text1: {
    fontSize: SIZES.small,
  },
  text3: {
    fontSize: SIZES.xSmall,
  },
  button: {
    height: scale(63),
    width: '90%',
    borderRadius: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: scale(1),
    borderColor: '#F0B90B40',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    shadowColor: '#F0B90B40',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  buttonCategories: {
    backgroundColor: 'white',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: scale(4),
    borderWidth: scale(1),
    borderColor: '#F0B90B80',
    height: scale(50),
    width: '90%',
    justifyContent: 'space-between',
    marginTop: scale(20),
    shadowColor: '#00000040',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    flexDirection: 'row',
    paddingHorizontal: scale(20),
  },
  box: {
    minHeight: scale(100),
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: scale(5),
    borderBottomRightRadius: scale(5),
    borderBottomStartRadius: scale(5),
    borderBottomEndRadius: scale(5),
    paddingHorizontal: scale(20),
    alignItems: 'center',
    borderColor: '#F0B90B80',
    borderWidth: scale(1),
    width: '90%',
    paddingBottom: scale(20),
  },
  buttonSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(5),
    backgroundColor: '#F0B90B',
    height: scale(36),
    width: '40%',
    borderRadius: scale(5),
  },
  line: {
    height: scale(2),
    backgroundColor: COLORS.grey,
    width: '95%',
    alignSelf: 'center',
    marginTop: scale(10),
    marginBottom: scale(20),
  },
  textArea1: {
    borderWidth: scale(2),
    borderColor: '#E3E3E3',
    borderRadius: scale(8),
    height: scale(250),
    overflow: 'hidden',
    justifyContent: 'space-between',
    marginTop: scale(10),
    width: '90%',
  },
  textArea: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    // borderWidth: scale(2),
    backgroundColor: '#E3E3E3',
    borderColor: '#E3E3E3',
    width: '100%',
    borderRadius: scale(5),
    height: scale(71),
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
    paddingTop: scale(5),
    marginTop: scale(10),
  },
  textInput: {
    backgroundColor: '#E3E3E3',
    marginTop: scale(10),
    borderRadius: scale(5),
    // borderWidth: scale(0),
    width: '100%',
  },
  text: {
    fontSize: SIZES.small,
  },
  buttonAdd: {
    alignItems: 'center',
    borderRadius: scale(10),
    height: scale(30),
    width: '100%',
    justifyContent: 'center',
    marginTop: scale(20),
    alignSelf: 'center',
    flexDirection: 'row',
    columnGap: scale(30),
  },
  text2: {
    fontSize: SIZES.medium,
  },
  roomBox: {
    width: '100%',
    borderRadius: scale(10),
    backgroundColor: '#EEEEEE',
    height: scale(40),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    marginTop: scale(10),
  },
  buttonEstateType: {
    marginTop: scale(10),
    borderWidth: scale(2),
    borderColor: '#EEEEEE',
    borderRadius: scale(10),
    width: '100%',
    height: scale(40),
    justifyContent: 'center',
    // backgroundColor:'#E3E3E3'
  },
  buttonEstateTypes: {
    marginTop: scale(20),
    borderTopLeftRadius: scale(10),
    borderTopEndRadius: scale(10),
    borderTopRightRadius: scale(10),
    borderWidth: scale(2),
    borderColor: '#EEEEEE',
    width: '100%',
    height: scale(40),
    justifyContent: 'center',
    // backgroundColor:'#E3E3E3'
  },
  listEstateType: {
    borderBottomLeftRadius: scale(10),
    borderBottomEndRadius: scale(10),
    borderBottomRightRadius: scale(10),
    backgroundColor: '#EEEEEE',
    justifyContent: 'center',
    width: '120%',
    minHeight: scale(100),
  },
  listFacilities: {
    borderBottomLeftRadius: scale(10),
    borderBottomEndRadius: scale(10),
    borderBottomRightRadius: scale(10),
    borderWidth: scale(2),
    borderColor: '#EEEEEE',
    justifyContent: 'center',
    width: '109%',
    minHeight: scale(100),
  },
});

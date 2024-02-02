import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SIZES, images, scale} from '../../../../../assets/constants';
import {useNavigation} from '@react-navigation/native';
import Header from '../../../components/Header';
import CategoriesButton from '../../../components/CategoriesButton';
import CustomText from '../../../../../components/CustomText';
import {CustomInput} from '../../../../../components';
import {
  IconAdd,
  IconAddBranch,
  IconCamera,
} from '../../../../../assets/icon/Icon';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../../components/Button';
import { useLanguage } from '../../../../../hooks/useLanguage';
export default function Content() {
  const {t}= useLanguage()
  const navigation = useNavigation();
  const [inputText, setInputText] = useState('');
  const handleInputChange = text => {
    setInputText(text);
  };
  const maxCharacters = 2000;
  const goBack = () => {
    navigation.goBack();
  };
  const onPress = () => {};
  const notify = () => {};
  return (
    <View style={styles.container}>
      <Header
        goback={true}
        subHeading={'Create a trading platform'}
        noti={true}
        onPress={goBack}
        notify={notify}
      />
      <TouchableOpacity style={styles.chooseLogo}>
        <CustomText
          textType="bold"
          style={{...styles.text1, color: COLORS.black}}>
          {t('choose_logo')}
        </CustomText>
      </TouchableOpacity>
      <CustomText
        textType="medium"
        style={{...styles.text, color: COLORS.black, marginTop: scale(20)}}>
      {t('name_of_trading')}
      </CustomText>
      <CustomInput
        style={{
          height: scale(40),
          backgroundColor: '#E3E3E3',
          marginTop: scale(10),
          borderRadius: scale(5),
          borderWidth: scale(0),
        }}
        placeholder={t('name_of_trading')}
      />
      <CustomText
        textType="regular"
        style={{...styles.text2, color: COLORS.black, marginTop: scale(20)}}>
         {t('description_content')}
      </CustomText>
      <View style={styles.textArea}>
        <ScrollView>
          <TextInput
            multiline
            numberOfLines={4} // You can adjust the number of lines as needed
            placeholder= {t('enter_a_description')}
            value={inputText}
            onChangeText={handleInputChange}
            style={{...styles.text, color: COLORS.black}}
          />
        </ScrollView>
        <Text style={{...styles.text, color: COLORS.black}}>
          {inputText.length}/{maxCharacters}
        </Text>
      </View>
      <CustomText
        textType="medium"
        style={{...styles.text, color: COLORS.black, marginTop: scale(20)}}>
         {t('introductory_photo')}
      </CustomText>
      <View style={{...styles.textArea1, backgroundColor: '#E3E3E3'}}>
        <Text style={{...styles.text, color: COLORS.black}}>0/10</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View></View>
          <TouchableOpacity style={{marginBottom: scale(10)}}>
            <IconCamera />
          </TouchableOpacity>
        </View>
      </View>
      <CustomText
        textType="medium"
        style={{...styles.text, color: COLORS.black, marginTop: scale(20)}}>
       {t('headquarter_information')}
      </CustomText>
      <CustomInput
        style={{
          height: scale(40),
          backgroundColor: '#E3E3E3',
          marginTop: scale(10),
          borderRadius: scale(5),
          borderWidth: scale(0),
        }}
        placeholder= {t('office_address')}
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <CustomInput
          style={{
            height: scale(40),
            backgroundColor: '#E3E3E3',
            marginTop: scale(10),
            borderRadius: scale(5),
            borderWidth: scale(0),
            width: '30%',
          }}
          placeholder= {t('province_city')}
        />
        <CustomInput
          style={{
            height: scale(40),
            backgroundColor: '#E3E3E3',
            marginTop: scale(10),
            borderRadius: scale(5),
            borderWidth: scale(0),
            width: '30%',
          }}
          placeholder= {t('country')}
        />
        <CustomInput
          style={{
            height: scale(40),
            backgroundColor: '#E3E3E3',
            marginTop: scale(10),
            borderRadius: scale(5),
            borderWidth: scale(0),
            width: '30%',
          }}
          placeholder= {t('ward_commune')}
        />
      </View>
      <CustomInput
        style={{
          height: scale(40),
          backgroundColor: '#E3E3E3',
          marginTop: scale(10),
          borderRadius: scale(5),
          borderWidth: scale(0),
        }}
        placeholder= {t('phone')}
      />
      <CustomInput
        style={{
          height: scale(40),
          backgroundColor: '#E3E3E3',
          marginTop: scale(10),
          borderRadius: scale(5),
          borderWidth: scale(0),
        }}
        placeholder= {t('hotline')}
      />
      <CustomText
        textType="medium"
        style={{...styles.text, color: COLORS.black, marginTop: scale(20)}}>
         {t('website')}
      </CustomText>
      <CustomInput
        style={{
          height: scale(40),
          backgroundColor: '#E3E3E3',
          marginTop: scale(10),
          borderRadius: scale(5),
          borderWidth: scale(0),
        }}
        placeholder= {t('website')}
      />
      <Image
        source={images.map}
        style={{
          height: scale(323),
          width: scale(323),
          marginTop: scale(30),
          alignSelf: 'center',
        }}></Image>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <CustomText
          textType="medium"
          style={{...styles.text, color: COLORS.black, marginTop: scale(20)}}>
          {t('branch_information')}
        </CustomText>
        <CustomText
          textType="medium"
          style={{...styles.text, color: COLORS.black, marginTop: scale(20)}}>
          0/10
        </CustomText>
      </View>
      <LinearGradient
        colors={['#F0B90B', '#FFEC88']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={{
          borderRadius: scale(8),
          marginTop: scale(5),
          marginBottom: scale(20),
        }}>
        <TouchableOpacity style={styles.addbank}>
          <View style={{marginLeft: scale(20)}}>
            <IconAddBranch />
          </View>

          <CustomText
            textType="medium"
            style={{...styles.text, marginLeft: scale(20)}}>
             {t('add_branch')}
          </CustomText>
        </TouchableOpacity>
      </LinearGradient>
      <CustomText
        textType="medium"
        style={{...styles.text, color: COLORS.black}}>
        {t('contact_person_information')}
      </CustomText>
      <CustomInput
        style={{
          height: scale(40),
          backgroundColor: '#E3E3E3',
          marginTop: scale(10),
          borderRadius: scale(5),
          borderWidth: scale(0),
        }}
        placeholder={t('full_name')}
      />
      <CustomInput
        style={{
          height: scale(40),
          backgroundColor: '#E3E3E3',
          marginTop: scale(10),
          borderRadius: scale(5),
          borderWidth: scale(0),
        }}
        placeholder=  {t('position')}
      />
      <CustomInput
        style={{
          height: scale(40),
          backgroundColor: '#E3E3E3',
          marginTop: scale(10),
          borderRadius: scale(5),
          borderWidth: scale(0),
        }}
        placeholder=  {t('email')}
      />
      <CustomInput
        style={{
          height: scale(40),
          backgroundColor: '#E3E3E3',
          marginTop: scale(10),
          borderRadius: scale(5),
          borderWidth: scale(0),
        }}
        placeholder=  {t('phone')}
      />
      <View style={{marginBottom: scale(30)}}>
        <Button title=  {t('create')}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: scale(30),
    width: '90%',
  },
  text: {
    fontSize: SIZES.small,
  },
  text1: {
    fontSize: SIZES.small,
    color: '#F0B90B',
  },
  text2: {
    fontSize: SIZES.medium,
  },
  button: {
    alignItems: 'center',
    borderRadius: scale(10),
    height: scale(40),
    width: scale(283),
    justifyContent: 'center',
    marginTop: scale(20),
    alignSelf: 'center',
  },
  line: {
    height: scale(1),
    backgroundColor: 'black',
  },
  chooseLogo: {
    width: scale(142),
    height: scale(142),
    backgroundColor: '#ECECEC',
    alignSelf: 'center',
    borderRadius: scale(999),
    borderWidth: scale(5),
    borderColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(20),
  },
  textArea: {
    flexDirection: 'row',
    borderWidth: scale(2),
    borderColor: '#E3E3E3',
    borderRadius: scale(5),
    height: scale(71),
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
    paddingTop: scale(5),
    marginTop: scale(10),
  },
  textArea1: {
    borderWidth: scale(2),
    borderColor: '#E3E3E3',
    borderRadius: scale(5),
    height: scale(124),
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
    paddingTop: scale(5),
    marginTop: scale(10),
  },
  addbank: {
    height: scale(48),
    width: '90%',
    borderRadius: scale(8),
    alignItems: 'center',
    justifyContent: 'center',
    // justifyContent:'center',
    flexDirection: 'row',
  },
});

import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SIZES, images, scale} from '../../../../../assets/constants';
import {useNavigation} from '@react-navigation/native';
import CustomText from '../../../../../components/CustomText';
import {
  IconCheckBox,
  IconCheckBoxWhite,
  IconDown,
  IconRight,
  IconUnCheckBox,
  IconUnCheckBoxWhite,
} from '../../../../../assets/icon/Icon';
import {CustomInput} from '../../../../../components';
import Button from '../../../../Profile/components/Button';
import { useLanguage } from '../../../../../hooks/useLanguage';
import { useForm } from 'react-hook-form';
import {requireField, validateMaxAmount} from '../../../../../utils/validate';
export default function TabContent() {
  const [inputText, setInputText] = useState('');
  const {control, watch, handleSubmit} = useForm();
  const handleInputChange = text => {
    setInputText(text);
  };
  const [viewgeneral, setViewgeneral] = useState(false);
  const viewGeneral = () => {
    setViewgeneral(prevViewgeneral => !prevViewgeneral);
  };
  const [viewday, setViewday] = useState(false);
  const viewDay= () => {
    setViewday(prevViewday => !prevViewday);
  };
  const [viewlocation, setViewlocation] = useState(false);
  const viewLocation= () => {
    setViewlocation(prevViewlocation => !prevViewlocation);
  };
  const [viewpicture, setViewpicture] = useState(false);
  const viewPicture= () => {
    setViewpicture(prevViewpicture=> !prevViewpicture);
  };
  const [viewprice, setViewprice] = useState(false);
  const viewPrice= () => {
    setViewprice(prevViewprice=> !prevViewprice);
  };
  const [viewcontactinfo, setViewcontactinfo] = useState(false);
  const viewContactinfo = () => {
    setViewcontactinfo(prevViewcontactinfo => !prevViewcontactinfo);
  };
  const maxCharacters = 2000;
  const navigation = useNavigation();
  const {t}= useLanguage()
  const [check, setCheck] = useState(false);
  const [check1, setCheck1] = useState(false);
  const toggleCheckBox = () => {
    setCheck(prevCheck => !prevCheck);
  };
  const toggleCheckBox1 = () => {
    setCheck1(prevCheck => !prevCheck);
  };
  const goPostScreen = () => {
    navigation.navigate('PostNewsScreen');
  };
  const ok = () => {};
  return (
    <View
      style={{
        width: '90%',
        alignItems: 'center',
        marginTop: scale(30),
        alignSelf: 'center',
      }}>
      <View style={styles.button}>
        <Image
          source={images.rentbuy}
          style={{width: scale(47), height: scale(38)}}
        />
        <View>
          <CustomText
            textType="semiBold"
            style={{...styles.text1, marginLeft: scale(20)}}>
            {t('tour')}
          </CustomText>
        </View>
      </View>

      {/* <View
        style={{
          flexDirection: 'row',
          marginTop: scale(30),
          columnGap: scale(30),
        }}>
        <TouchableOpacity
          onPress={toggleCheckBox}
          style={{...styles.buttonSmall, paddingHorizontal: scale(10)}}>
          {check ? <IconCheckBoxWhite /> : <IconUnCheckBoxWhite />}
          <CustomText
            textType="medium"
            style={{...styles.text1, color: COLORS.white}}>
            Need employ
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleCheckBox1} style={styles.buttonSmall}>
          {check1 ? <IconCheckBoxWhite /> : <IconUnCheckBoxWhite />}
          <CustomText
            textType="medium"
            style={{...styles.text1, color: COLORS.white}}>
            Need to buy
          </CustomText>
        </TouchableOpacity>
      </View> */}
      <TouchableOpacity style={styles.buttonCategories} onPress={viewGeneral}>
        <CustomText textType="medium" style={{...styles.text1}}>
          {t('Tour information')}
        </CustomText>
        <IconRight />
      </TouchableOpacity>
      {viewgeneral && (
        <View style={styles.box}>
        <CustomInput
            styleTextLabel={{
              ...styles.text1,
              color: COLORS.black,
              marginTop: scale(10),
            }}
            label={t('Title')}
            control={control}
            name="title"
            placeholder={t('Title')}
            rules={{
              ...requireField(t('this_field_required')),
            }}
            style={styles.textInput}
          />
          <View
            style={{
              borderWidth: 0.5,
              width: '100%',
              marginTop: scale(10),
              borderColor: '#F0B90B',
            }}></View>
          <CustomInput
            styleTextLabel={{
              ...styles.text1,
              color: COLORS.black,
              marginTop: scale(10),
            }}
            label={t('Provincial links')}
            control={control}
            name="provincial"
            placeholder={t('Provincial links')}
            rules={{
              ...requireField(t('this_field_required')),
            }}
            style={styles.textInput}
          />
          <View
            style={{
              borderWidth: 0.5,
              width: '100%',
              marginTop: scale(10),
              borderColor: '#F0B90B',
            }}></View>
          <CustomInput
            styleTextLabel={{
              ...styles.text1,
              color: COLORS.black,
              marginTop: scale(10),
            }}
            label={t('Tour code')}
            control={control}
            name="code"
            placeholder={t('code')}
            rules={{
              ...requireField(t('this_field_required')),
            }}
            style={styles.textInput}
          />
          <View
            style={{
              borderWidth: 0.5,
              width: '100%',
              marginTop: scale(10),
              borderColor: '#F0B90B',
            }}></View>
          <View>
            <CustomText
              textType="medium"
              style={{
                ...styles.text1,
                color: COLORS.black,
                marginTop: scale(10),
                alignSelf:'flex-start'
              }}>
              {t('Topic')}
            </CustomText>
            <TouchableOpacity
              style={{
                height: scale(40),
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#E3E3E3',
                width: '100%',
                alignItems: 'center',
                borderRadius: scale(5),
                marginTop: scale(10),
                paddingHorizontal: scale(10),
              }}>
              <CustomText
                textType="medium"
                style={{
                  ...styles.text,
                  color: '#979797',
                }}>
                Domestic tourism
              </CustomText>
              <IconDown />
            </TouchableOpacity>
          </View>
        </View>
      )}
         <TouchableOpacity style={styles.buttonCategories} onPress={viewDay}>
        <CustomText textType="medium" style={{...styles.text1}}>
          {t('Day')}
        </CustomText>
        <IconRight />
      </TouchableOpacity>
      {viewday&& (
        <View style={styles.box}>
        <CustomInput
            styleTextLabel={{
              ...styles.text1,
              color: COLORS.black,
              marginTop: scale(10),
            }}
            label={t('Title')}
            control={control}
            name="title"
            placeholder={t('Title')}
            rules={{
              ...requireField(t('this_field_required')),
            }}
            style={styles.textInput}
          />
          <View
            style={{
              borderWidth: 0.5,
              width: '100%',
              marginTop: scale(10),
              borderColor: '#F0B90B',
            }}></View>
          <CustomInput
            styleTextLabel={{
              ...styles.text1,
              color: COLORS.black,
              marginTop: scale(10),
            }}
            label={t('Provincial links')}
            control={control}
            name="provincial"
            placeholder={t('Provincial links')}
            rules={{
              ...requireField(t('this_field_required')),
            }}
            style={styles.textInput}
          />
          <View
            style={{
              borderWidth: 0.5,
              width: '100%',
              marginTop: scale(10),
              borderColor: '#F0B90B',
            }}></View>
          <CustomInput
            styleTextLabel={{
              ...styles.text1,
              color: COLORS.black,
              marginTop: scale(10),
            }}
            label={t('Tour code')}
            control={control}
            name="code"
            placeholder={t('code')}
            rules={{
              ...requireField(t('this_field_required')),
            }}
            style={styles.textInput}
          />
          <View
            style={{
              borderWidth: 0.5,
              width: '100%',
              marginTop: scale(10),
              borderColor: '#F0B90B',
            }}></View>
          <View>
            <CustomText
              textType="medium"
              style={{
                ...styles.text1,
                color: COLORS.black,
                marginTop: scale(10),
                alignSelf:'flex-start'
              }}>
              {t('Topic')}
            </CustomText>
            <TouchableOpacity
              style={{
                height: scale(40),
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#E3E3E3',
                width: '100%',
                alignItems: 'center',
                borderRadius: scale(5),
                marginTop: scale(10),
                paddingHorizontal: scale(10),
              }}>
              <CustomText
                textType="medium"
                style={{
                  ...styles.text,
                  color: '#979797',
                }}>
                Domestic tourism
              </CustomText>
              <IconDown />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <TouchableOpacity style={styles.buttonCategories} onPress={viewLocation}>
        <CustomText textType="medium" style={{...styles.text1}}>
          {t('Location')}
        </CustomText>
        <IconRight />
      </TouchableOpacity>
      {viewlocation&& (
        <View style={styles.box}>
        <CustomInput
            styleTextLabel={{
              ...styles.text1,
              color: COLORS.black,
              marginTop: scale(10),
            }}
            label={t('Title')}
            control={control}
            name="title"
            placeholder={t('Title')}
            rules={{
              ...requireField(t('this_field_required')),
            }}
            style={styles.textInput}
          />
          <View
            style={{
              borderWidth: 0.5,
              width: '100%',
              marginTop: scale(10),
              borderColor: '#F0B90B',
            }}></View>
          <CustomInput
            styleTextLabel={{
              ...styles.text1,
              color: COLORS.black,
              marginTop: scale(10),
            }}
            label={t('Provincial links')}
            control={control}
            name="provincial"
            placeholder={t('Provincial links')}
            rules={{
              ...requireField(t('this_field_required')),
            }}
            style={styles.textInput}
          />
          <View
            style={{
              borderWidth: 0.5,
              width: '100%',
              marginTop: scale(10),
              borderColor: '#F0B90B',
            }}></View>
          <CustomInput
            styleTextLabel={{
              ...styles.text1,
              color: COLORS.black,
              marginTop: scale(10),
            }}
            label={t('Tour code')}
            control={control}
            name="code"
            placeholder={t('code')}
            rules={{
              ...requireField(t('this_field_required')),
            }}
            style={styles.textInput}
          />
          <View
            style={{
              borderWidth: 0.5,
              width: '100%',
              marginTop: scale(10),
              borderColor: '#F0B90B',
            }}></View>
          <View>
            <CustomText
              textType="medium"
              style={{
                ...styles.text1,
                color: COLORS.black,
                marginTop: scale(10),
                alignSelf:'flex-start'
              }}>
              {t('Topic')}
            </CustomText>
            <TouchableOpacity
              style={{
                height: scale(40),
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#E3E3E3',
                width: '100%',
                alignItems: 'center',
                borderRadius: scale(5),
                marginTop: scale(10),
                paddingHorizontal: scale(10),
              }}>
              <CustomText
                textType="medium"
                style={{
                  ...styles.text,
                  color: '#979797',
                }}>
                Domestic tourism
              </CustomText>
              <IconDown />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <TouchableOpacity style={styles.buttonCategories} onPress={viewPicture}>
        <CustomText textType="medium" style={{...styles.text1}}>
          {t('Picture and video')}
        </CustomText>
        <IconRight />
      </TouchableOpacity>
      {viewpicture&& (
        <View style={styles.box}>
        <CustomInput
            styleTextLabel={{
              ...styles.text1,
              color: COLORS.black,
              marginTop: scale(10),
            }}
            label={t('Title')}
            control={control}
            name="title"
            placeholder={t('Title')}
            rules={{
              ...requireField(t('this_field_required')),
            }}
            style={styles.textInput}
          />
          <View
            style={{
              borderWidth: 0.5,
              width: '100%',
              marginTop: scale(10),
              borderColor: '#F0B90B',
            }}></View>
          <CustomInput
            styleTextLabel={{
              ...styles.text1,
              color: COLORS.black,
              marginTop: scale(10),
            }}
            label={t('Provincial links')}
            control={control}
            name="provincial"
            placeholder={t('Provincial links')}
            rules={{
              ...requireField(t('this_field_required')),
            }}
            style={styles.textInput}
          />
          <View
            style={{
              borderWidth: 0.5,
              width: '100%',
              marginTop: scale(10),
              borderColor: '#F0B90B',
            }}></View>
          <CustomInput
            styleTextLabel={{
              ...styles.text1,
              color: COLORS.black,
              marginTop: scale(10),
            }}
            label={t('Tour code')}
            control={control}
            name="code"
            placeholder={t('code')}
            rules={{
              ...requireField(t('this_field_required')),
            }}
            style={styles.textInput}
          />
          <View
            style={{
              borderWidth: 0.5,
              width: '100%',
              marginTop: scale(10),
              borderColor: '#F0B90B',
            }}></View>
          <View>
            <CustomText
              textType="medium"
              style={{
                ...styles.text1,
                color: COLORS.black,
                marginTop: scale(10),
                alignSelf:'flex-start'
              }}>
              {t('Topic')}
            </CustomText>
            <TouchableOpacity
              style={{
                height: scale(40),
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#E3E3E3',
                width: '100%',
                alignItems: 'center',
                borderRadius: scale(5),
                marginTop: scale(10),
                paddingHorizontal: scale(10),
              }}>
              <CustomText
                textType="medium"
                style={{
                  ...styles.text,
                  color: '#979797',
                }}>
                Domestic tourism
              </CustomText>
              <IconDown />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <TouchableOpacity style={styles.buttonCategories} onPress={viewPrice}>
        <CustomText textType="medium" style={{...styles.text1}}>
          {t('Price')}
        </CustomText>
        <IconRight />
      </TouchableOpacity>
      {viewprice&& (
        <View style={styles.box}>
        <CustomInput
            styleTextLabel={{
              ...styles.text1,
              color: COLORS.black,
              marginTop: scale(10),
            }}
            label={t('Title')}
            control={control}
            name="title"
            placeholder={t('Title')}
            rules={{
              ...requireField(t('this_field_required')),
            }}
            style={styles.textInput}
          />
          <View
            style={{
              borderWidth: 0.5,
              width: '100%',
              marginTop: scale(10),
              borderColor: '#F0B90B',
            }}></View>
          <CustomInput
            styleTextLabel={{
              ...styles.text1,
              color: COLORS.black,
              marginTop: scale(10),
            }}
            label={t('Provincial links')}
            control={control}
            name="provincial"
            placeholder={t('Provincial links')}
            rules={{
              ...requireField(t('this_field_required')),
            }}
            style={styles.textInput}
          />
          <View
            style={{
              borderWidth: 0.5,
              width: '100%',
              marginTop: scale(10),
              borderColor: '#F0B90B',
            }}></View>
          <CustomInput
            styleTextLabel={{
              ...styles.text1,
              color: COLORS.black,
              marginTop: scale(10),
            }}
            label={t('Tour code')}
            control={control}
            name="code"
            placeholder={t('code')}
            rules={{
              ...requireField(t('this_field_required')),
            }}
            style={styles.textInput}
          />
          <View
            style={{
              borderWidth: 0.5,
              width: '100%',
              marginTop: scale(10),
              borderColor: '#F0B90B',
            }}></View>
          <View>
            <CustomText
              textType="medium"
              style={{
                ...styles.text1,
                color: COLORS.black,
                marginTop: scale(10),
                alignSelf:'flex-start'
              }}>
              {t('Topic')}
            </CustomText>
            <TouchableOpacity
              style={{
                height: scale(40),
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#E3E3E3',
                width: '100%',
                alignItems: 'center',
                borderRadius: scale(5),
                marginTop: scale(10),
                paddingHorizontal: scale(10),
              }}>
              <CustomText
                textType="medium"
                style={{
                  ...styles.text,
                  color: '#979797',
                }}>
                Domestic tourism
              </CustomText>
              <IconDown />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <TouchableOpacity
        style={styles.buttonCategories}
        onPress={viewContactinfo}>
        <CustomText textType="medium" style={{...styles.text1}}>
          {t('Contact info')}
        </CustomText>
        <IconRight />
      </TouchableOpacity>
      {viewcontactinfo && (
        <View style={styles.box}>
          <CustomInput
            styleTextLabel={{
              ...styles.text1,
              color: COLORS.black,
              marginTop: scale(10),
            }}
            label={t('Name')}
            control={control}
            name="fullname"
            placeholder={t('full_name')}
            rules={{
              ...requireField(t('this_field_required')),
            }}
            style={styles.textInput}
          />
          <CustomInput
            styleTextLabel={{
              ...styles.text1,
              color: COLORS.black,
              marginTop: scale(10),
            }}
            label={t('phone')}
            control={control}
            name="phone"
            placeholder={t('phone')}
            rules={{
              ...requireField('This field is required'),
            }}
            style={styles.textInput}
          />
          <CustomInput
            styleTextLabel={{
              ...styles.text1,
              color: COLORS.black,
              marginTop: scale(10),
            }}
            control={control}
            label={t('email')}
            name="email"
            placeholder={t('email')}
            rules={{
              ...requireField('This field is required'),
            }}
            style={styles.textInput}
          />
        </View>
      )}
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop:scale(20)}}>
        <CustomText
          textType="medium"
          style={{
            ...styles.text3,
            color: COLORS.black,
            width: '80%',
            alignSelf: 'flex-start',
            marginTop: scale(5),
          }}>
          {t('do_you_agree')}
        </CustomText>
        <TouchableOpacity onPress={toggleCheckBox1}>
          {check1 ? <IconCheckBoxWhite/> : <IconUnCheckBoxWhite />}
        </TouchableOpacity>
      </View>
      <View style={{width: '100%', marginBottom: scale(30)}}>
        <Button title={'Post'} onPress={handleSubmit(ok)} />
      </View>
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
  text2: {
    fontSize: SIZES.xLarge,
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
    borderRadius: scale(5),
    height: scale(124),
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
    paddingTop: scale(5),
    marginTop: scale(20),
    width: '90%',
  },
  textArea: {
    flexDirection: 'row',
    borderWidth: scale(2),
    borderColor: '#E3E3E3',
    backgroundColor: '#E3E3E3',
    width: '100%',
    borderRadius: scale(5),
    height: scale(71),
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
    paddingTop: scale(5),
    marginTop: scale(10),
  },
  text: {
    fontSize: SIZES.small,
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
  textInput: {
    backgroundColor: '#E3E3E3',
    marginTop: scale(10),
    borderRadius: scale(5),
    // borderWidth: scale(0),
    width: '100%',
  },
});

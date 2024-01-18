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
  IconCheckBoxWhite,
  IconRight,
  IconUnCheckBoxWhite,
} from '../../../../../assets/icon/Icon';
import {CustomInput} from '../../../../../components';
import Button from '../../../../Profile/components/Button';
export default function TabContent() {
  const [inputText, setInputText] = useState('');
  const handleInputChange = text => {
    setInputText(text);
  };
  const maxCharacters = 2000;
  const navigation = useNavigation();
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
          Need to rent,
        </CustomText>
        <CustomText
          textType="semiBold"
          style={{...styles.text1, marginLeft: scale(20)}}>
          Need to buy
        </CustomText>
        </View>
      </View>
    
      <View
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
      </View>
      <CustomText
        textType="medium"
        style={{
          ...styles.text1,
          color: COLORS.black,
          marginTop: scale(20),
          alignSelf: 'flex-start',
          paddingHorizontal: scale(20),
        }}>
        Asset type
      </CustomText>
      <TouchableOpacity
        style={{
          height: scale(36),
          paddingHorizontal: scale(20),
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#E3E3E3',
          width: '90%',
          alignItems: 'center',
          borderRadius: scale(5),
          marginTop: scale(10),
        }}>
        <CustomText
          textType="medium"
          style={{
            ...styles.text1,
            color: '#979797',
          }}>
          Select asset type
        </CustomText>
        <IconRight />
      </TouchableOpacity>
      <CustomText
        textType="medium"
        style={{
          ...styles.text1,
          color: COLORS.black,
          marginTop: scale(20),
          alignSelf: 'flex-start',
          paddingHorizontal: scale(20),
        }}>
        Province/city
      </CustomText>
      <TouchableOpacity
        style={{
          height: scale(36),
          paddingHorizontal: scale(20),
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#E3E3E3',
          width: '90%',
          alignItems: 'center',
          borderRadius: scale(5),
          marginTop: scale(10),
        }}>
        <CustomText
          textType="medium"
          style={{
            ...styles.text1,
            color: '#979797',
          }}>
         Choose province/ city
        </CustomText>
        <IconRight />
      </TouchableOpacity>
      <CustomText
        textType="medium"
        style={{
          ...styles.text1,
          color: COLORS.black,
          marginTop: scale(20),
          alignSelf: 'flex-start',
          paddingHorizontal: scale(20),
        }}>
        District
      </CustomText>
      <TouchableOpacity
        style={{
          height: scale(36),
          paddingHorizontal: scale(20),
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#E3E3E3',
          width: '90%',
          alignItems: 'center',
          borderRadius: scale(5),
          marginTop: scale(10),
        }}>
        <CustomText
          textType="medium"
          style={{
            ...styles.text1,
            color: '#979797',
          }}>
          Choose District
        </CustomText>
        <IconRight />
      </TouchableOpacity>
      <CustomText
        textType="medium"
        style={{
          ...styles.text1,
          color: COLORS.black,
          marginTop: scale(20),
          alignSelf: 'flex-start',
          paddingHorizontal: scale(20),
        }}>
        Ward/commune
      </CustomText>
      <TouchableOpacity
        style={{
          height: scale(36),
          paddingHorizontal: scale(20),
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#E3E3E3',
          width: '90%',
          alignItems: 'center',
          borderRadius: scale(5),
          marginTop: scale(10),
          marginBottom: scale(20),
        }}>
        <CustomText
          textType="medium"
          style={{
            ...styles.text1,
            color: '#979797',
          }}>
         Choose ward / commune
        </CustomText>
        <IconRight />
      </TouchableOpacity>
      <CustomText
        textType="medium"
        style={{
          ...styles.text1,
          color: COLORS.black,
          alignSelf: 'flex-start',
          paddingHorizontal: scale(20),
        }}>
        Title
      </CustomText>
      <View style={styles.textArea}>
        <ScrollView>
          <TextInput
            multiline
            numberOfLines={4}
            placeholder="Enter Title"
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
        style={{
          ...styles.text1,
          color: COLORS.black,
          marginTop: scale(10),
          alignSelf: 'flex-start',
          paddingHorizontal: scale(20),
        }}>
        Description content
      </CustomText>
      <View style={styles.textArea}>
        <ScrollView>
          <TextInput
            multiline
            numberOfLines={4}
            placeholder="Enter Description content"
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
        style={{
          ...styles.text1,
          color: COLORS.black,
          marginTop: scale(10),
          alignSelf: 'flex-start',
          paddingHorizontal: scale(20),
        }}>
        Contact information
      </CustomText>
      <CustomText
        textType="medium"
        style={{
          ...styles.text,
          color: COLORS.black,
          marginTop: scale(20),
          alignSelf: 'flex-start',
          paddingHorizontal: scale(20),
        }}>
        First and last name
      </CustomText>
      <CustomInput
        styleWrapper={{
          height: scale(40),
          backgroundColor: '#E3E3E3',
          marginTop: scale(10),
          borderRadius: scale(5),
          borderWidth: scale(0),
          width: '90%',
        }}
      />
      <CustomText
        textType="medium"
        style={{
          ...styles.text,
          color: COLORS.black,
          marginTop: scale(20),
          alignSelf: 'flex-start',
          paddingHorizontal: scale(20),
        }}>
          Phone
      </CustomText>
      <CustomInput
        styleWrapper={{
          height: scale(40),
          backgroundColor: '#E3E3E3',
          marginTop: scale(10),
          borderRadius: scale(5),
          borderWidth: scale(0),
          width: '90%',
        }}
      />
      <View style={{width:'100%', marginBottom:scale(30)}}>
      <Button title={'Post'} onPress={ok} />
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
    fontSize: SIZES.medium,
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
    backgroundColor:'#E3E3E3',
    width: '90%',
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
});

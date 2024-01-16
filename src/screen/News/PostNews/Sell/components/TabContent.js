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
  IconCamera,
  IconCheckBox,
  IconDown,
  IconRight,
  IconUnCheckBox,
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
  const ok = () => {
  };
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
          source={images.sell}
          style={{width: scale(47), height: scale(38)}}
        />
        <CustomText
          textType="medium"
          style={{...styles.text2, marginLeft: scale(20)}}>
          Sell
        </CustomText>
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
          {check ? <IconCheckBox /> : <IconUnCheckBox />}
          <CustomText
            textType="medium"
            style={{...styles.text1, color: COLORS.white}}>
            Real estate
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleCheckBox1} style={styles.buttonSmall}>
          {check1 ? <IconCheckBox /> : <IconUnCheckBox />}
          <CustomText
            textType="medium"
            style={{...styles.text1, color: COLORS.white}}>
            Land for sale
          </CustomText>
        </TouchableOpacity>
      </View>
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
        style={{
          ...styles.text1,
          color: COLORS.black,
          marginTop: scale(20),
          alignSelf: 'flex-start',
          paddingHorizontal: scale(20),
        }}>
        Legal image
      </CustomText>
      <CustomText
        textType="regular"
        style={{
          ...styles.text3,
          color: COLORS.black,
          alignSelf: 'flex-start',
          paddingHorizontal: scale(20),
        }}>
        Update images to a maximum of two images
      </CustomText>
      <View style={{...styles.textArea1, backgroundColor: '#E3E3E3'}}>
        <View></View>
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
        style={{
          ...styles.text1,
          color: COLORS.black,
          marginTop: scale(20),
          alignSelf: 'flex-start',
          paddingHorizontal: scale(20),
        }}>
        Video Youtube (Add videos)
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
        placeholder="Link Youtube"
      />
      <CustomText
        textType="medium"
        style={{
          ...styles.text1,
          color: COLORS.black,
          marginTop: scale(20),
          alignSelf: 'flex-start',
          paddingHorizontal: scale(20),
        }}>
        Contact Info
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
        placeholder="Full name"
      />
      <CustomInput
        styleWrapper={{
          height: scale(40),
          backgroundColor: '#E3E3E3',
          marginTop: scale(10),
          borderRadius: scale(5),
          borderWidth: scale(0),
          width: '90%',
        }}
        placeholder="Phone"
      />
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
        Address
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
          marginBottom: scale(30),
        }}>
        <CustomText
          textType="medium"
          style={{
            ...styles.text1,
            color: '#979797',
          }}>
          Select address
        </CustomText>
        <IconRight />
      </TouchableOpacity>
      <Image
        source={images.map}
        style={{
          height: scale(323),
          width: '90%',
          alignSelf: 'center',
        }}></Image>
      <CustomText
        textType="medium"
        style={{
          ...styles.text1,
          color: COLORS.black,
          marginTop: scale(10),
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
            placeholder="Enter a desciption"
            value={inputText}
            onChangeText={handleInputChange}
            style={{...styles.text, color: COLORS.black}}
          />
        </ScrollView>
        <Text style={{...styles.text, color: COLORS.white}}>
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
            placeholder="Enter a desciption"
            value={inputText}
            onChangeText={handleInputChange}
            style={{...styles.text, color: COLORS.black}}
          />
        </ScrollView>
        <Text style={{...styles.text, color: COLORS.white}}>
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
        Acreage (m2)
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
        placeholder="Enter the land area"
      />
      <View style={{flexDirection: 'row', paddingHorizontal: scale(25)}}>
        <View>
          <CustomText
            textType="medium"
            style={{
              ...styles.text1,
              color: COLORS.black,
              marginTop: scale(10),
            }}>
            Horizontal (m)
          </CustomText>
          <CustomInput
            styleWrapper={{
              height: scale(40),
              backgroundColor: '#E3E3E3',
              marginTop: scale(10),
              borderRadius: scale(5),
              borderWidth: scale(0),
              width: '95%',
            }}
            placeholder="Enter the land area"
          />
        </View>
        <View>
          <CustomText
            textType="medium"
            style={{
              ...styles.text1,
              color: COLORS.black,
              marginTop: scale(10),
            }}>
            Longs (m)
          </CustomText>
          <CustomInput
            styleWrapper={{
              height: scale(40),
              backgroundColor: '#E3E3E3',
              marginTop: scale(10),
              borderRadius: scale(5),
              borderWidth: scale(0),
              width: '95%',
              columnGap: scale(10),
            }}
            placeholder="Enter the land area"
          />
        </View>
      </View>
      <CustomText
        textType="medium"
        style={{
          ...styles.text1,
          color: COLORS.black,
          alignSelf: 'flex-start',
          marginTop: scale(10),
          paddingHorizontal: scale(20),
        }}>
        Price
      </CustomText>
      <View style={{flexDirection:'row', alignSelf:'flex-start', paddingHorizontal:scale(20)}}>
      <CustomInput
        styleWrapper={{
          height: scale(40),
          backgroundColor: '#E3E3E3',
          marginTop: scale(10),
          borderRadius: scale(5),
          borderWidth: scale(0),
          width: '40%',
        }}
        placeholder="Enter price"
      />
        <TouchableOpacity
        style={{
          height: scale(40),
          paddingHorizontal: scale(15),
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#E3E3E3',
          width: '25%',
          alignItems: 'center',
          borderRadius: scale(5),
          marginTop: scale(10),
          marginLeft:scale(10)
        }}>
        <CustomText
          textType="medium"
          style={{
            ...styles.text,
            color: '#979797',
          }}>
           USD
        </CustomText>
        <IconDown />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          height: scale(40),
          paddingHorizontal: scale(5),
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#E3E3E3',
          width: '25%',
          alignItems: 'center',
          borderRadius: scale(5),
          marginTop: scale(10),
          marginLeft:scale(10)
        }}>
        <CustomText
          textType="medium"
          style={{
            ...styles.text3,
            color: '#979797',
          }}>
          Total area
        </CustomText>
        <IconDown />
      </TouchableOpacity>
      </View>
      <TouchableOpacity style={{marginTop:scale(10),flexDirection:'row', alignSelf:'flex-start', justifyContent:'center', alignItems:'center'}}>
      <CustomText
        textType="medium"
        style={{
          ...styles.text,
          color: COLORS.black,
          paddingHorizontal: scale(20),
          marginTop:scale(10)
        }}>
        Detailed information
      </CustomText>
      <IconDown />
      </TouchableOpacity>
      <View style={{flexDirection:'row', alignItems:'center'}}>
      <CustomText
        textType="medium"
        style={{
          ...styles.text3,
          color: COLORS.black,
          marginLeft:scale(-45),
          width:'70%',
          alignSelf:'flex-start',
          marginTop:scale(10)
        }}>
      Do you want to deposit with the Vietnamese brokerage community of 10k people?
      </CustomText>
      <TouchableOpacity onPress={toggleCheckBox1}>
          {check1 ? <IconCheckBox /> : <IconUnCheckBox />}
        </TouchableOpacity>
      </View>
      <CustomText
        textType="medium"
        style={{
          ...styles.text3,
          color: COLORS.black,
          paddingHorizontal:scale(20),
          width:'100%',
          alignSelf:'flex-start',
          marginTop:scale(10)
        }}>
     Note: TOBE REAL Real Estate does not allow properties to be posted that are not real or misleading to solicit customer information. If discovered, your account will be permanently banned.
      </CustomText>
      <Button title={'ok'} onPress={ok}/>
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

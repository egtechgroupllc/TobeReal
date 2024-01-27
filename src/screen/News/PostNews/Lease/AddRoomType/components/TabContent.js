import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import React, {useState} from 'react';
import {COLORS, SIZES, images, scale} from '../../../../../../assets/constants';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomText from '../../../../../../components/CustomText';
import {
  IconCamera,
  IconCheckBoxWhite,
  IconDown,
  IconUnCheckBoxWhite,
} from '../../../../../../assets/icon/Icon';
import {CustomInput} from '../../../../../../components';
import Button from '../../../../../Profile/components/Button';
import LinearGradient from 'react-native-linear-gradient';
import SelectService from './SelectService';
import ImageCropPicker from 'react-native-image-crop-picker';
import {
  requireField,
  validateMaxAmount,
} from '../../../../../../utils/validate';
import {useForm} from 'react-hook-form';
export default function TabContent() {
  const {control, watch, handleSubmit} = useForm();
  const navigation = useNavigation();
  const route = useRoute();
  const [roomImage, setRoomImage] = useState([]);
  const [roomType, setRoomType] = useState('');
  const [acreage, setAcreage] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [showBed, setShowBed] = useState('');
  const viewShowBed = () => {
    setShowBed(prevshowBed => !prevshowBed);
  };
  const handleRoomType = text => {
    setRoomType(text);
  };
  const handleDesciption = text => {
    setDescription(text);
  };
  const handleAcreage = text => {
    setAcreage(text);
  };
  const handlePrice = text => {
    setPrice(text);
  };
  const pickImage = () => {
    ImageCropPicker.openPicker({
      width: scale(300),
      height: scale(400),
      multiple: true,
      maxFiles: 100,
    }).then(image => {
      console.log(image);
      if (image) {
        setRoomImage(image);
        console.log(roomImage);
      }
    });
  };
  const maxCharacters = 1000;
  const [check, setCheck] = useState(false);
  const [check1, setCheck1] = useState(false);
  const toggleCheckBox1 = () => {
    setCheck1(prevCheck => !prevCheck);
  };
  const handleOk = () => {
    const roomDetails = {
      receivedRoomType: roomType,
      receivedDescription: description,
      receivedAcreage: acreage,
      receivedPrice: price,
      receivedRoomImages: roomImage.map(image => image.path),
    };
    // Pass the roomDetails back to the previous screen
    navigation.goBack();
    route.params.onOk(roomDetails);
  };
  const ok = () => {
    handleOk();
    // Clear the input fields
    setRoomType('');
    setDescription('');
    setAcreage('');
    setPrice('');
    setRoomImage('');
  };
  return (
    <View
      style={{
        width: '90%',
        alignItems: 'center',
        marginTop: scale(30),
        alignSelf: 'center',
      }}>
      {/* <View style={styles.button}>
        <Image
          source={images.lease}
          style={{width: scale(38), height: scale(38)}}
        />
        <CustomText
          textType="medium"
          style={{...styles.text2, marginLeft: scale(20)}}>
          Lease
        </CustomText>
      </View> */}
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
            Real estate
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleCheckBox1} style={styles.buttonSmall}>
          {check1 ? <IconCheckBoxWhite /> : <IconUnCheckBoxWhite />}
          <CustomText
            textType="medium"
            style={{...styles.text1, color: COLORS.white}}>
            Land for sale
          </CustomText>
        </TouchableOpacity>
      </View> */}
      <CustomInput
        styleTextLabel={{
          ...styles.text1,
          color: COLORS.black,
          marginTop: scale(10),
        }}
        label="Room type title"
        control={control}
        name="RoomTypeTitle"
        multiline
        numberOfLines={4}
        placeholder="Enter room type title"
        rules={{
          ...requireField('This field is required'),
          ...validateMaxAmount(1000, '1000 characters limit'),
        }}
        style={styles.textArea}
        componentRight={
          <Text style={{...styles.text, color: COLORS.black}}>
            {watch('RoomTypeTitle')?.length || 0}/{maxCharacters}
          </Text>
        }
      />
      <CustomInput
        styleTextLabel={{
          ...styles.text1,
          color: COLORS.black,
          marginTop: scale(10),
        }}
        label="Description content"
        control={control}
        name="Description"
        multiline
        numberOfLines={4}
        placeholder="Enter a description"
        rules={{
          ...requireField('This field is required'),
          ...validateMaxAmount(1000, '1000 characters limit'),
        }}
        style={styles.textArea}
        componentRight={
          <Text style={{...styles.text, color: COLORS.black}}>
            {watch('Description')?.length || 0}/{maxCharacters}
          </Text>
        }
      />
      {/* <Image
        source={images.map}
        style={{
          height: scale(323),
          width: '90%',
          alignSelf: 'center',
          marginTop: scale(30),
        }}></Image> */}
      <CustomInput
        styleTextLabel={{
          ...styles.text1,
          color: COLORS.black,
          marginTop: scale(10),
        }}
        label="Acreage(m2)"
        control={control}
        name="acreage"
        placeholder="Enter the land area"
        rules={{
          ...requireField('This field is required'),
        }}
        style={styles.textInput}
      />
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-start',
          paddingHorizontal: scale(20),
        }}>
        <CustomInput
          styleTextLabel={{
            ...styles.text1,
            color: COLORS.black,
            marginTop: scale(10),
          }}
          label="Price"
          control={control}
          name="price"
          placeholder="Enter price"
          rules={{
            ...requireField('This field is required'),
          }}
          style={{
            height: scale(40),
            backgroundColor: '#E3E3E3',
            borderRadius: scale(5),
            borderWidth: scale(0),
            width: '40%'
          }}
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
            alignSelf: 'flex-end',
            marginLeft: scale(10),
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
      </View>
      <CustomText
        textType="medium"
        style={{
          ...styles.text1,
          color: COLORS.black,
          alignSelf: 'flex-start',
          paddingHorizontal: scale(20),
          marginBottom: scale(10),
          marginTop: scale(20),
        }}>
        Select bed type
      </CustomText>
      <TouchableOpacity
        style={!showBed ? styles.buttonBed : styles.buttonBeds}
        onPress={viewShowBed}>
        <CustomText
          textType="regular"
          style={{
            ...styles.text,
            color: COLORS.black,
            paddingHorizontal: scale(20),
          }}>
          Select bed type
        </CustomText>
      </TouchableOpacity>
      {showBed && (
        <View style={styles.listBed}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: scale(25),
              paddingVertical: scale(10),
            }}>
            <CustomText
              textType="medium"
              style={{
                ...styles.text,
                color: '#979797',
              }}>
              Super king bed
            </CustomText>
            <CustomInput
              style={{
                height: scale(20),
                backgroundColor: 'white',
                borderRadius: scale(5),
                borderWidth: scale(0),
                width: '40%',
              }}
              placeholder="Quantity"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: scale(25),
              paddingVertical: scale(10),
            }}>
            <CustomText
              textType="medium"
              style={{
                ...styles.text,
                color: '#979797',
              }}>
              Super queen bed
            </CustomText>
            <CustomInput
              style={{
                height: scale(20),
                backgroundColor: 'white',
                borderRadius: scale(5),
                borderWidth: scale(0),
                width: '40%',
              }}
              placeholder="Quantity"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: scale(25),
              paddingVertical: scale(10),
            }}>
            <CustomText
              textType="medium"
              style={{
                ...styles.text,
                color: '#979797',
              }}>
              King bed
            </CustomText>
            <CustomInput
              style={{
                height: scale(20),
                backgroundColor: 'white',
                borderRadius: scale(5),
                borderWidth: scale(0),
                width: '40%',
              }}
              placeholder="Quantity"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: scale(25),
              paddingVertical: scale(10),
            }}>
            <CustomText
              textType="medium"
              style={{
                ...styles.text,
                color: '#979797',
              }}>
              Queen bed
            </CustomText>
            <CustomInput
              style={{
                height: scale(20),
                backgroundColor: 'white',
                borderRadius: scale(5),
                borderWidth: scale(0),
                width: '40%',
              }}
              placeholder="Quantity"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: scale(25),
              paddingVertical: scale(10),
            }}>
            <CustomText
              textType="medium"
              style={{
                ...styles.text,
                color: '#979797',
              }}>
              Single bed
            </CustomText>
            <CustomInput
              style={{
                height: scale(20),
                backgroundColor: 'white',
                borderRadius: scale(5),
                borderWidth: scale(0),
                width: '40%',
              }}
              placeholder="Quantity"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: scale(25),
              paddingVertical: scale(10),
            }}>
            <CustomText
              textType="medium"
              style={{
                ...styles.text,
                color: '#979797',
              }}>
              Couple bed
            </CustomText>
            <CustomInput
              style={{
                height: scale(20),
                backgroundColor: 'white',
                borderRadius: scale(5),
                borderWidth: scale(0),
                width: '40%',
              }}
              placeholder="Quantity"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: scale(25),
              paddingVertical: scale(10),
            }}>
            <CustomText
              textType="medium"
              style={{
                ...styles.text,
                color: '#979797',
              }}>
              Sofa bed
            </CustomText>
            <CustomInput
              style={{
                height: scale(20),
                backgroundColor: 'white',
                borderRadius: scale(5),
                borderWidth: scale(0),
                width: '40%',
              }}
              placeholder="Quantity"
            />
          </View>
        </View>
      )}
      <CustomText
        textType="medium"
        style={{
          ...styles.text1,
          color: COLORS.black,
          alignSelf: 'flex-start',
          paddingHorizontal: scale(20),
          marginTop: scale(10),
          marginBottom: scale(10),
        }}>
        Select service
      </CustomText>
      <SelectService />
      <CustomText
        textType="medium"
        style={{
          ...styles.text1,
          color: COLORS.black,
          marginTop: scale(20),
          alignSelf: 'flex-start',
          paddingHorizontal: scale(20),
        }}>
        Room images
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
      <View
        style={{
          alignSelf: 'flex-end',
          paddingHorizontal: scale(20),
        }}>
        <TouchableOpacity onPress={pickImage}>
          <IconCamera />
        </TouchableOpacity>
      </View>
      <View style={{...styles.textArea1, backgroundColor: '#E3E3E3'}}>
        <View></View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {roomImage.map((image, index) => (
            <Image
              key={index}
              source={{uri: image.path}}
              style={{
                width: '100%',
                height: scale(200),
                marginBottom: scale(10),
                marginTop: scale(10),
              }}
            />
          ))}
        </ScrollView>
      </View>
      {/* <TouchableOpacity
        style={{
          marginTop: scale(10),
          flexDirection: 'row',
          alignSelf: 'flex-start',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CustomText
          textType="medium"
          style={{
            ...styles.text,
            color: COLORS.black,
            paddingHorizontal: scale(20),
            marginTop: scale(10),
          }}>
          Detailed information
        </CustomText>
        <IconDown />
      </TouchableOpacity> */}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <CustomText
          textType="medium"
          style={{
            ...styles.text3,
            color: COLORS.black,
            marginLeft: scale(-45),
            width: '70%',
            alignSelf: 'flex-start',
            marginTop: scale(10),
          }}>
          Do you want to deposit with the Vietnamese brokerage community of 10k
          people?
        </CustomText>
        <TouchableOpacity onPress={toggleCheckBox1}>
          {check1 ? <IconCheckBoxWhite /> : <IconUnCheckBoxWhite />}
        </TouchableOpacity>
      </View>
      {/* <CustomText
        textType="medium"
        style={{
          ...styles.text3,
          color: COLORS.black,
          paddingHorizontal: scale(20),
          width: '100%',
          alignSelf: 'flex-start',
          marginTop: scale(10),
        }}>
        Note: TOBE REAL Real Estate does not allow properties to be posted that
        are not real or misleading to solicit customer information. If
        discovered, your account will be permanently banned.
      </CustomText> */}
      <View style={{width: '100%', marginBottom: scale(30)}}>
        <Button title={'Confirm'} onPress={ok} />
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
  textInput: {
    backgroundColor: '#E3E3E3',
    marginTop: scale(10),
    borderRadius: scale(5),
    borderWidth: scale(0),
    width: '90%',
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
    height: scale(250),
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
    paddingTop: scale(5),
    marginTop: scale(10),
    width: '90%',
  },
  textArea: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: scale(2),
    backgroundColor: '#E3E3E3',
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
  buttonAdd: {
    alignItems: 'center',
    borderRadius: scale(10),
    height: scale(30),
    width: '60%',
    justifyContent: 'center',
    marginTop: scale(20),
    alignSelf: 'center',
    flexDirection: 'row',
    columnGap: scale(30),
  },
  buttonBed: {
    borderWidth: scale(2),
    borderColor: '#EEEEEE',
    borderRadius: scale(10),
    width: '90%',
    height: scale(40),
    justifyContent: 'center',
  },
  buttonBeds: {
    borderTopLeftRadius: scale(10),
    borderTopEndRadius: scale(10),
    borderTopLeftRadius: scale(10),
    borderTopRightRadius: scale(10),
    borderWidth: scale(2),
    borderColor: '#EEEEEE',
    width: '90%',
    height: scale(40),
    justifyContent: 'center',
  },
  listBed: {
    borderBottomLeftRadius: scale(10),
    borderBottomEndRadius: scale(10),
    borderBottomLeftRadius: scale(10),
    borderBottomRightRadius: scale(10),
    backgroundColor: '#EEEEEE',
    justifyContent: 'center',
    width: '90%',
    minHeight: scale(100),
  },
  text2: {
    fontSize: SIZES.medium,
  },
});

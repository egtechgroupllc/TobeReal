import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Alert,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import React, {useState} from 'react';
import {COLORS, SIZES, images, scale} from '../../../../../assets/constants';
import {useNavigation} from '@react-navigation/native';
import CustomText from '../../../../../components/CustomText';
import {
  IconCamera,
  IconCheckBox,
  IconCheckBoxWhite,
  IconDown,
  IconRight,
  IconUnCheckBox,
  IconUnCheckBoxWhite,
} from '../../../../../assets/icon/Icon';
import {CustomInput} from '../../../../../components';
import Button from '../../../../Profile/components/Button';
import ImageCropPicker from 'react-native-image-crop-picker';
import axios from 'axios';
import Map from '../../../../Explore/components/DetailAccommodation/Map';
import {requireField, validateMaxAmount} from '../../../../../utils/validate';
import {useForm} from 'react-hook-form';
import ImageDetail from '../../../../Explore/components/DetailAccommodation/ImageDetail';
export default function TabContent() {
  const {control, watch, handleSubmit} = useForm();
  const [description, setDescription] = useState('');
  const [realesate, setRealEsate] = useState('');
  const handleDesciption = text => {
    setDescription(text);
  };
  const handleRealEsate = text => {
    setRealEsate(text);
  };
  const handlePrice = text => {
    setPrice(text);
  };
  const maxCharacters = 2000;
  const navigation = useNavigation();
  const [price, setPrice] = useState('');
  const [selectedImage, setSelectedImage] = useState([]);
  const [check, setCheck] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [showFurniture, setShowFurniture] = useState('');
  const viewShowFurniture = () => {
    setShowFurniture(prevshowFurniture => !prevshowFurniture);
  };
  const toggleCheckBox = () => {
    setCheck(prevCheck => !prevCheck);
  };
  const toggleCheckBox1 = () => {
    setCheck1(prevCheck => !prevCheck);
  };
  const goPostScreen = () => {
    navigation.navigate('PostNewsScreen');
  };
  const pickImage = () => {
    ImageCropPicker.openPicker({
      width: scale(300),
      height: scale(400),
      multiple: true,
      maxFiles: 100,
    })
      .then(image => {
        if (image) {
          setSelectedImage(image.map(img => img.path));
          // uploadImage(image.path);
        }
      })
      .catch(error => {
        console.log('Error picking image:', error);
      });
  };
  const uploadImage = async imagePath => {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: imagePath,
        type: 'image/jpeg',
        name: 'uploaded_image.jpg',
      });

      const response = await axios.post('YOUR_SERVER_API_ENDPOINT', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle the server response
      if (response.status === 200) {
        // Image uploaded successfully
        console.log('Image uploaded successfully');
      } else {
        // Handle error
        console.log('Error uploading image to server');
        Alert.alert('Error', 'Failed to upload image to the server');
      }
    } catch (error) {
      console.log('Error uploading image:', error);
      Alert.alert('Error', 'An error occurred while uploading image');
    }
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
          source={images.sell}
          style={{width: scale(47), height: scale(38)}}
        />
        <CustomText
          textType="medium"
          style={{...styles.text2, marginLeft: scale(20)}}>
          Sell
        </CustomText>
      </View>
      {/* <View
        style={{
          flexDirection: 'row',
          marginTop: scale(30),
          columnGap: scale(40),
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
        label="Real estate title"
        control={control}
        name="RealEstateTitle"
        multiline
        numberOfLines={4}
        placeholder="Enter real estate title"
        rules={{
          ...requireField('This field is required'),
          ...validateMaxAmount(1000, '1000 characters limit'),
        }}
        style={styles.textArea}
        componentRight={
          <Text style={{...styles.text, color: COLORS.black}}>
            {watch('RealEstateTitle')?.length || 0}/{maxCharacters}
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
      <CustomInput
        styleTextLabel={{
          ...styles.text1,
          color: COLORS.black,
          marginTop: scale(10),
        }}
        label="Contact info"
        control={control}
        name="fullname"
        placeholder="Full name"
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
        name="phone"
        placeholder="Phone"
        rules={{
          ...requireField('This field is required'),
        }}
        style={styles.textInput}
      />
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
        Select the furniture
      </CustomText>
      <TouchableOpacity
        style={
          !showFurniture ? styles.buttonFurnitury : styles.buttonFurniturys
        }
        onPress={viewShowFurniture}>
        <CustomText
          textType="regular"
          style={{
            ...styles.text,
            color: COLORS.black,
            paddingHorizontal: scale(20),
          }}>
          Select the furniture
        </CustomText>
      </TouchableOpacity>
      {showFurniture && (
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
              Toilet
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
              Bed room
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
              // justifyContent: 'space-between',
              paddingHorizontal: scale(25),
              paddingVertical: scale(10),
            }}>
            <CustomText
              textType="medium"
              style={{
                ...styles.text,
                color: '#979797',
                width: '50%',
              }}>
              Indoor furniture
            </CustomText>
            <TouchableOpacity
              onPress={toggleCheckBox}
              style={{width: '40%', alignItems: 'center'}}>
              {check ? <IconCheckBox /> : <IconUnCheckBox />}
            </TouchableOpacity>
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
              Home direction
            </CustomText>
            <CustomInput
              style={{
                height: scale(20),
                backgroundColor: 'white',
                borderRadius: scale(5),
                borderWidth: scale(0),
                width: '40%',
              }}
              placeholder="Direction"
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
              Balcony direction
            </CustomText>
            <CustomInput
              style={{
                height: scale(20),
                backgroundColor: 'white',
                borderRadius: scale(5),
                borderWidth: scale(0),
                width: '40%',
              }}
              placeholder="Direction"
            />
          </View>
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
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
            // borderWidth: scale(0),
            width: '90%',
          }}
        />
        {/* <TouchableOpacity
          style={{
            height: scale(40),
            paddingHorizontal: scale(15),
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#E3E3E3',
            width: '25%',
            alignItems: 'center',
            borderRadius: scale(5),
            alignSelf:'flex-end',
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
        </TouchableOpacity> */}
      </View>
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

      <View style={{flexDirection: 'row'}}>
        <CustomText
          textType="medium"
          style={{
            ...styles.text1,
            color: COLORS.black,
            marginTop: scale(20),
            width: '47%',
          }}>
          Country
        </CustomText>
        <TouchableOpacity
          style={{
            height: scale(40),
            paddingHorizontal: scale(15),
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#E3E3E3',
            width: '40%',
            alignItems: 'center',
            borderRadius: scale(5),
            marginTop: scale(10),
            marginLeft: scale(10),
          }}>
          <CustomText
            textType="medium"
            style={{
              ...styles.text,
              color: '#979797',
            }}>
            USA
          </CustomText>
          <IconDown />
        </TouchableOpacity>
      </View>
      <CustomInput
        styleTextLabel={{
          ...styles.text1,
          color: COLORS.black,
          marginTop: scale(10),
        }}
        label="Address"
        control={control}
        name="address"
        placeholder="Address"
        rules={{
          ...requireField('This field is required'),
        }}
        style={styles.textInput}
      />
      {/* <Image
        source={images.map}
        style={{
          height: scale(323),
          width: '90%',
          alignSelf: 'center',
        }}></Image> */}
      <View style={{width: '100%', marginTop: scale(10)}}>
        <Map />
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
        Real estate images
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
      <View
        style={{
          ...styles.textArea1,
          backgroundColor: '#E3E3E3',
          marginBottom: scale(10),
        }}>
        {/* <View></View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {selectedImage.map((image, index) => (
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
        </ScrollView> */}
        {selectedImage.length > 0 ? (
          <ImageDetail
            dataImg={selectedImage}
            styleWrapper={{flex: 1, backgroundColor: 'transparent'}}
          />
        ) : null}
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
  textInput: {
    backgroundColor: '#E3E3E3',
    marginTop: scale(10),
    borderRadius: scale(5),
    // borderWidth: scale(0),
    width: '90%',
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
    width: '90%',
    borderRadius: scale(5),
    height: scale(71),
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
    paddingTop: scale(5),
    marginTop: scale(10),
  },
  buttonFurnitury: {
    borderWidth: scale(2),
    borderColor: '#EEEEEE',
    borderRadius: scale(10),
    width: '90%',
    height: scale(40),
    justifyContent: 'center',
  },
  buttonFurniturys: {
    borderTopLeftRadius: scale(10),
    borderTopEndRadius: scale(10),
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
    borderBottomRightRadius: scale(10),
    backgroundColor: '#EEEEEE',
    justifyContent: 'center',
    width: '90%',
    minHeight: scale(100),
  },
  text: {
    fontSize: SIZES.small,
  },
});

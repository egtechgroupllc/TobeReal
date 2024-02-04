import {
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {SIZES, images, scale} from '../../../../assets/constants';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';
import {useLanguage} from '../../../../hooks/useLanguage';
import CustomText from '../../../../components/CustomText';
const listLanguage  =[
  { id: '1', name: 'English', flag: images.usa, languageCode: 'en', checked: false },
  { id: '2', name: 'Vietnamese', flag: images.vietnam, languageCode: 'vi', checked: false },
  { id: '3', name: 'Indonesia', flag: images.indonesia, languageCode: 'id', checked: false },
  { id: '4', name: 'Malaysia', flag: images.malaysia, languageCode: 'my', checked: false },
  { id: '5', name: 'Thailand', flag: images.thailand, languageCode: 'th', checked: false },
  { id: '6', name: 'Philippines', flag: images.philipin, languageCode: 'ph', checked: false },
  // Add more language items as needed
]
export default function Content() {
  const {t, changeLocale} = useLanguage();
  

  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };

 
  const notify = () => {};
  const [check, setCheck] = useState(false);
  const toggleCheckBox = (item) => {
    setCheck(item?.id)
    changeLocale(item.languageCode);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header
        goback={true}
        subHeading={t('select_language')}
        noti={true}
        onPress={goBack}
        notify={notify}></Header>
      <View style={{marginTop: scale(40)}}>
      <FlatList
        data={listLanguage}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.button} onPress={() => toggleCheckBox(item)}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
            <Image source={item.flag} style={styles.image} />
            <CustomText textType="medium" style={{marginLeft:scale(10)}}>{item.name}</CustomText>
            </View>
            {/* <View >
              {check === item.id ? <IconCheckBox /> : <IconUnCheckBox />}
            </View> */}
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
      {/* <Button title={'ok'} onPress={changeLanguage}></Button> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: scale(30),
    width: '90%',
    alignItems: 'center',
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
    borderRadius: scale(4),
    height: scale(36),
    width: scale(334),
    marginTop: scale(15),
    borderWidth: scale(1),
    borderColor: '#C2C2C2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
  },
  image: {
    height: scale(20),
    width: scale(28),
  },
});

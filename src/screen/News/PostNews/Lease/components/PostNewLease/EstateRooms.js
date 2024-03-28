import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {COLORS, SIZES, images, scale} from '../../../../../../assets/constants';
import {IconAdd, IconRight, IconX} from '../../../../../../assets/icon/Icon';
import {CustomButton} from '../../../../../../components';
import CustomImage from '../../../../../../components/CustomImage';
import CustomText from '../../../../../../components/CustomText';
import {useLanguage} from '../../../../../../hooks/useLanguage';

export default function EstateRooms() {
  const {t} = useLanguage();
  const [viewContact, setViewContact] = useState(false);
  const [roomTypes, setRoomTypes] = useState([]);

  const {navigate} = useNavigation();
  const goAddRoom = () => {
    navigate('AddRoomTypeScreen', {onOk: handleOk});
  };
  const handleOk = receivedRoomDetails => {
    // Update the state by adding the new roomDetails to the existing array
    setRoomTypes(prevRoomTypes => [...prevRoomTypes, receivedRoomDetails]);
  };

  const removeRoomType = index => {
    setRoomTypes(prevRoomTypes => {
      const updatedRoomTypes = [...prevRoomTypes];
      updatedRoomTypes.splice(index, 1);
      return updatedRoomTypes;
    });
  };
  return (
    <View>
      <CustomButton
        outline
        style={styles.buttonCategories}
        text={t('rooms')}
        iconRight={() => <IconRight />}
        onPress={() => setViewContact(prev => !prev)}
        styleText={{
          color: COLORS.text,
        }}
      />

      <Collapsible collapsed={!viewContact} style={styles.box}>
        {roomTypes.map((room, index) => (
          <View key={index} style={styles.roomBox}>
            <CustomImage
              source={images.lease}
              style={{width: scale(25), height: scale(25)}}
            />
            <CustomText
              key={index}
              numberOfLines={1}
              textType="semiBold"
              style={{flex: 1, fontSize: SIZES.xMedium}}>
              {room.RoomTypeTitle}
            </CustomText>
            <TouchableOpacity onPress={() => removeRoomType(index)}>
              <IconX style={{width: scale(20), height: scale(20)}} />
            </TouchableOpacity>
          </View>
        ))}

        <CustomButton
          style={{
            minWidth: '50%',
          }}
          linearGradientProps
          text={t('add_room')}
          iconLeft={() => <IconAdd />}
          onPress={goAddRoom}
          styleText={{
            color: COLORS.text,
          }}
        />
      </Collapsible>
    </View>
  );
}

const styles = StyleSheet.create({
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
    paddingHorizontal: scale(10),
    alignItems: 'center',
    borderColor: '#F0B90B80',
    borderWidth: scale(1),
    width: '100%',
    paddingBottom: scale(20),
    rowGap: scale(16),
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
    columnGap: scale(10),
  },
});

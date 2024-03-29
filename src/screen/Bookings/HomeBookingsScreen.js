import React, {useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {COLORS, SIZES, WIDTH, images, scale} from '../../assets/constants';
import {CustomButton, TabSelect} from '../../components';
import MainWrapper from '../../components/MainWrapper';
import CustomImage from '../../components/CustomImage';
import CustomText from '../../components/CustomText';
import {useNavigation} from '@react-navigation/native';
import EmptyData from '../../components/EmptyData';

const listTab = ['Active Booking', 'Booking History'];
export default function HomeBookingsScreen() {
  const {navigate} = useNavigation();

  const [tabSelect, setTabSelect] = useState(listTab[0]);

  return (
    <MainWrapper styleContent={styles.wrapper} scrollEnabled={false}>
      <View>
        <TabSelect
          data={listTab}
          styleWrapper={{
            alignItems: 'center',
            borderRadius: 5,
          }}
          styleContainerTab={styles.containTab}
          styleTabActive={styles.tabActive}
          styleTabDefault={{
            backgroundColor: 'transparent',
          }}
          onChange={e => setTabSelect(e)}
        />
        {tabSelect === listTab[0] && (
          <CustomButton
            buttonType="medium"
            text="ADD BOOKING"
            style={styles.btnAdd}
            styleText={{
              textType: 'semiBold',
            }}
            isShadow
          />
        )}
      </View>

      <EmptyData
        desc={' No active booking yet'}
        textBtn={'EXPLORE ACCOMMODATION'}
      />
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
    width: WIDTH.widthContain,
    marginVertical: scale(20),
    alignItems: 'center',
  },
  containTab: {
    height: scale(56),
    alignItems: 'center',
    borderRadius: scale(12),
    backgroundColor: '#e6e7e8',
    padding: scale(4),
  },
  tabActive: {
    color: COLORS.primary,
    borderRadius: scale(12),
    borderTopLeftRadius: scale(12),
    borderTopRightRadius: scale(12),
  },
  img: {
    width: scale(240),
    height: scale(240),
  },
  btnAdd: {
    position: 'absolute',
    bottom: scale(-70),
    right: 0,
    zIndex: 999,
    width: scale(150),
  },
});

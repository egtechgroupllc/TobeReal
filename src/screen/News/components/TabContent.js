import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {TabSelect} from '../../../components';
import {COLORS, SIZES, scale} from '../../../assets/constants';
import CategoriesButton from './CategoriesButton';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../../../components/CustomText';
import { IconNoHistory } from '../../../assets/icon/Icon';
export default function TabContent() {
  const [tabSelect, setTabSelect] = useState('Post news');
  const [viewbenefit, setViewbenefit] = useState(false);
  const [viewpakage, setViewpackage] = useState(false);
  const [viewcostnew, setViewcostnew] = useState(false);
  const [viewtradingflatform, setViewtradingflatform] = useState(false);
  const viewBenefit = () => {
    setViewbenefit(prevViewbenefit => !prevViewbenefit);
  };
  const viewPackage= () => {
    setViewpackage(prevViewpackage => !prevViewpackage );
  };
  const viewCostnew= () => {
    setViewcostnew(prevViewcostnew => !prevViewcostnew  );
  };
  const viewTradingflatform= () => {
    setViewtradingflatform(prevViewtradingflatform => !prevViewtradingflatform  );
  };
  const data = [
    // {
    //   id: 1,
    //   date: '30/10/2023',
    //   quantity: 5,
    //   status: 'done',
    // },
    // {
    //   id: 2,
    //   date: '30/10/2023',
    //   quantity: 5,
    //   status: 'done',
    // },
    // {
    //   id: 3,
    //   date: '30/10/2023',
    //   quantity: 5,
    //   status: 'done',
    // },
    // {
    //   id: 4,
    //   date: '30/10/2023',
    //   quantity: 5,
    //   status: 'done',
    // },
  ];
  return (
    <View
      style={{
        width: '94%',
        alignSelf: 'center',
        marginTop: scale(30),
      }}>
      <TabSelect
        data={['Post news', 'History']}
        onChange={value => {
          setTabSelect(value);
        }}
      />
      {tabSelect == 'Post news' ? (
        <View>
          <CategoriesButton
            title={'Benefits and annual account maintenance fees'}
            onPress={viewBenefit}
            viewbenefit={viewbenefit}
          />
          <CategoriesButton title={'Posting package'} onPress={viewPackage} viewpackage={viewpakage}/>
          <CategoriesButton title={'Cost for each type of news'} viewcostnew={viewcostnew} onPress={viewCostnew}/>
          <CategoriesButton title={'Create an online trading platform'} viewtradingflatform={viewtradingflatform} onPress={viewTradingflatform}/>
          <TouchableOpacity
            style={{alignItems: 'center', marginTop: scale(50)}}>
            <LinearGradient
              colors={['#FFE259', '#FFA751']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={[styles.button]}>
              <CustomText textType="semiBold" style={{...styles.text2}}>
                Post
              </CustomText>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      ) : data && data.length > 0 ? (
        <FlatList
          data={data}
          // horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          renderItem={({item}) => (
            <View>
              <View
                key={`${item?.id}`}
                style={{
                  flexDirection: 'row',
                  marginTop: scale(20),
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                {item?.id && (
                  <View
                    style={{
                      width: scale(50),
                      alignItems: 'center',
                      left: scale(10),
                    }}>
                    <CustomText textType="medium">{item?.id}</CustomText>
                  </View>
                )}
                {item?.date && (
                  <View
                    style={{
                      width: scale(100),
                      alignItems: 'center',
                      right: 20,
                    }}>
                    <CustomText textType="medium">{item?.date}</CustomText>
                  </View>
                )}
                {item?.quantity && (
                  <View
                    style={{width: scale(50), alignItems: 'center', right: 35}}>
                    <CustomText textType="medium">{item?.quantity}</CustomText>
                  </View>
                )}
                {item?.status && (
                  <View
                    style={{width: scale(50), alignItems: 'center', right: 15}}>
                    <CustomText textType="medium">{item?.status}</CustomText>
                  </View>
                )}
              </View>
              <View style={styles.line}></View>
            </View>
          )}
        />
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: scale(150),
            width: scale(325),
          }}>
          <IconNoHistory/>
        </View>
      )}
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
    fontSize: SIZES.medium,
  },
  button: {
    height: scale(50),
    width: '50%',
    borderRadius: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    height: scale(2),
    backgroundColor: COLORS.grey,
    width: '95%',
    alignSelf: 'center',
    marginTop: scale(10),
    marginBottom: scale(20),
  },
});

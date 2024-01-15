import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {CustomButton} from '../../../components';
import CustomText from '../../../components/CustomText';
import {COLORS, SIZES, images, scale} from '../../../assets/constants';
import {
  Avatar,
  IconEditProfile,
  IconGoBack,
  IconNotification,
  IconRight,
} from '../../../assets/icon/Icon';
import LinearGradient from 'react-native-linear-gradient';
import ButtonBuy from './ButtonBuy';

export default function CategoriesButton({
  title,
  viewbenefit,
  onPress,
  viewtradingflatform,
  small,
  viewcostnew,
  number,
  postManagement,
  viewpackage,
}) {
  const data = [
    {
      id: 1,
      type: 'VIP 1',
      benefit: 'Benefits/year (VND) 600.000\n(Not include VAT)',
      status: 'done',
      postingnews: '1 news/day',
      post3stars: '1 news/day',
      postsupervip: '',
    },
    {
      id: 2,
      type: 'VIP 2',
      benefit: 'Benefits/year (VND) 800.000\n(Not include VAT)',
      postingnews: '2 news/day',
      post3stars: '1 news/day',
      postsupervip: '1 news/day',
    },
    {
      id: 3,
      type: 'VIP 3',
      benefit: 'Benefits/year (VND) 1.000.000\n(Not include VAT)',
      postingnews: '3 news/day',
      post3stars: '2 news/day',
      postsupervip: '2 news/day',
    },
    {
      id: 4,
      type: 'Special',
      benefit: 'Benefits/year (VND) 10.000.000\n(Not include VAT)',
      postingnews: 'No limit',
      post3stars: '5 news/day',
      postsupervip: '5 news/day',
    },
  ];
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.button}>
          <CustomText textType="semiBold" style={{...styles.text2}}>
            {title}
          </CustomText>
          <IconRight />
        </View>
      </TouchableOpacity>
      {postManagement && (
        <View>
          <LinearGradient
            colors={['#F0B90B', '#FFFFFF00']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 0.8}}
            style={styles.button}>
            <CustomText textType="medium" style={{...styles.text2}}>
              {number}
            </CustomText>
            <CustomText textType="medium" style={{...styles.text2}}>
              {title}
            </CustomText>
            <CustomText
              textType="medium"
              style={{...styles.text2}}></CustomText>
          </LinearGradient>
        </View>
      )}
      {small && (
        <TouchableOpacity onPress={onPress}>
          <LinearGradient
            colors={['#F0B90B', '#FFFFFF00']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={[styles.buttonSmall]}>
            <CustomText textType="bold" style={{...styles.text2}}>
              {title}
            </CustomText>
            <IconRight />
          </LinearGradient>
        </TouchableOpacity>
      )}
      {viewbenefit && (
        <View style={styles.box}>
          <FlatList
            contentContainerStyle={{columnGap:scale(10)}}
            data={data}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
            renderItem={({item}) => (
              <LinearGradient
                colors={['#F0B90B', '#FFFFFF']}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                style={[styles.item]}>
                <CustomText
                  textType="bold"
                  style={{...styles.text, color: COLORS.white}}>
                  {item.type}
                </CustomText>
                <LinearGradient
                  colors={['#FF8A00', '#8F6F00']}
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 1}}
                  style={{
                    height: scale(40),
                    width: '100%',
                    borderTopLeftRadius: scale(10),
                    borderTopRightRadius: scale(10),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <CustomText
                    textType="bold"
                    style={{...styles.text2, color: COLORS.white}}>
                    {item.benefit}
                  </CustomText>
                </LinearGradient>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignSelf: 'flex-start',
                    padding: scale(20),
                    width: '90%',
                  }}>
                  <View>
                    <CustomText
                      textType="bold"
                      style={{...styles.text, color: COLORS.black}}>
                      Avatar
                    </CustomText>
                    <CustomText
                      textType="bold"
                      style={{...styles.text, color: COLORS.black}}>
                      Border
                    </CustomText>
                  </View>
                  <View style={{alignSelf: 'center'}}>
                    <Image
                      source={images.vip1}
                      style={{width: scale(46), height: scale(47)}}
                    />
                  </View>
                </View>
                <View style={{backgroundColor:'#997006', height:scale(32), width:'100%', alignItems:'center', justifyContent:'center', marginTop:scale(-15)}}>
                  <CustomText
                      textType="bold"
                      style={{...styles.text3, color: COLORS.white}}>
                      Posting news is usually free
                    </CustomText>
                    <CustomText
                      textType="semiBold"
                      style={{...styles.text3, color: COLORS.white}}>
                      {item.postingnews}
                    </CustomText>
                </View>
                <View style={{alignItems:'center', justifyContent:'center', marginTop:scale(10)}}>
                <CustomText
                      textType="bold"
                      style={{...styles.text3, color: COLORS.black}}>
                      Post 3-star vip news for free
                    </CustomText>
                    <CustomText
                      textType="medium"
                      style={{...styles.text3, color: COLORS.black}}>
                      {item.post3stars}
                    </CustomText>
                </View>
                <View style={{marginTop:scale(10),backgroundColor:'#997006', height:scale(32), width:'100%', alignItems:'center', justifyContent:'center'}}>
                  <CustomText
                      textType="bold"
                      style={{...styles.text3, color: COLORS.white}}>
                      Posting news is usually free
                    </CustomText>
                    <CustomText
                      textType="semiBold"
                      style={{...styles.text3, color: COLORS.white}}>
                      {item.postsupervip}
                    </CustomText>
                
                </View>
                <ButtonBuy title={'Buy NOW'}/>
              </LinearGradient>
            )}
          />
        </View>
      )}
      {viewpackage && <View style={styles.box}></View>}
      {viewcostnew && <View style={styles.box}></View>}
      {viewtradingflatform && <View style={styles.box}></View>}
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: scale(4),
    borderWidth: scale(1),
    borderColor: '#F0B90B80',
    height: scale(50),
    width: '100%',
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
  buttonSmall: {
    alignItems: 'center',
    borderRadius: scale(36),
    height: scale(29),
    justifyContent: 'space-between',
    marginTop: scale(20),
    // flex:1,
    borderWidth: scale(0.5),
    borderColor: '#0000001A',
    flexDirection: 'row',
    paddingHorizontal: scale(7),
    minWidth: '45%',
  },
  text2: {
    fontSize: SIZES.small,
  },
  text3: {
    fontSize: SIZES.xSmall,
  },
  text: {
    fontSize: SIZES.medium,
  },
  box: {
    height: scale(362),
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: scale(5),
    borderBottomRightRadius: scale(5),
    borderBottomStartRadius: scale(5),
    borderBottomEndRadius: scale(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    paddingTop: scale(10),
    borderColor: '#F0B90B80',
    borderWidth: scale(1),
  },
  item: {
    height: scale(330),
    backgroundColor: '#FFFFFF',
    // flexDirection: 'row',
    paddingTop: scale(10),
    borderColor: '#F0B90B80',
    borderWidth: scale(1),
    borderRadius: scale(16),
    width: scale(209),
    alignItems: 'center',
    //  justifyContent:'center'
  },
});

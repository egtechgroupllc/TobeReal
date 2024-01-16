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
      postingnews: '1 news/day',
      post3stars: '1 news/day',
      postsupervip: '',
      image: images.vip1,
    },
    {
      id: 2,
      type: 'VIP 2',
      benefit: 'Benefits/year (VND) 800.000\n(Not include VAT)',
      postingnews: '2 news/day',
      post3stars: '1 news/day',
      postsupervip: '1 news/day',
      image: images.vip2,
    },
    {
      id: 3,
      type: 'VIP 3',
      benefit: 'Benefits/year (VND) 1.000.000\n(Not include VAT)',
      postingnews: '3 news/day',
      post3stars: '2 news/day',
      postsupervip: '2 news/day',
      image: images.vip3,
    },
    {
      id: 4,
      type: 'Special',
      benefit: 'Benefits/year (VND) 10.000.000\n(Not include VAT)',
      postingnews: 'No limit',
      post3stars: '5 news/day',
      postsupervip: '5 news/day',
      image: images.vipspecial,
    },
  ];
  const data1 = [
    {
      id: 1,
      type: 'Package 1',
      price: ' Price: 1,000.000 \n(Not include VAT)',
      balance: '1,100.000 (VNĐ)',
      bonus: '100,000 (VNĐ)',
      time: '2 months',
    },
    {
      id: 2,
      type: 'Package 2',
      price: ' Price: 1,000.000 \n(Not include VAT)',
      balance: '2,300.000 (VNĐ)',
      bonus: '300,000 (VNĐ)',
      time: '3 months',
    },
    {
      id: 3,
      type: 'Package 3',
      price: ' Price: 1,000.000 \n(Not include VAT)',
      balance: '4,800.000 (VNĐ)',
      bonus: '800,000 (VNĐ)',
      time: '4 months',
    },
    {
      id: 4,
      type: 'Package 4',
      price: ' Price: 1,000.000 \n(Not include VAT)',
      balance: '10,400.000 (VNĐ)',
      bonus: '2,400.000 (VNĐ)',
      time: '5 months',
    },
    {
      id: 5,
      type: 'Package 5',
      price: ' Price: 1,000.000 \n(Not include VAT)',
      balance: '14,000.000 (VNĐ)',
      bonus: '4,000.000 (VNĐ)',
      time: '5 months',
    },
    {
      id: 6,
      type: 'Package 6',
      price: ' Price: 1,000.000 \n(Not include VAT)',
      balance: '14,000.000 (VNĐ)',
      bonus: '4,000.000 (VNĐ)',
      time: '5 months',
    },
    {
      id: 7,
      type: 'Package 7',
      price: ' Price: 1,000.000 \n(Not include VAT)',
      balance: '14,000.000 (VNĐ)',
      bonus: '4,000.000 (VNĐ)',
      time: '5 months',
    },
  ];
  const data2 = [
    {
      id: 1,
      type: 'Test news',
      desciption:
        'The news only has 02 unique images and represents the news that does not appear on the Tobe Real Real Estate home page, appears from page 3. is the news that appears last in the search.\nUnable to upload news (refresh news)',
      price: 'Free',
      inside: 'NO',
      time: '2 months',
    },
    {
      id: 2,
      type: 'Up news (refresh news)',
      desciption: '',
      price: '5,000Đ',
      inside: 'NO',
      time: '3 months',
    },
    {
      id: 3,
      type: 'Normal news',
      desciption:
        'Appearing a front page according to the new before.\nCan bring up to 10 pictures and 01 video\nFind the test in front of the test news',
      price: '20,000Đ',
      inside: 'NO',
      time: '4 months',
    },
    {
      id: 4,
      type: 'VIP news',
      desciption:
        'Appearing a front page according to the new before.\nNews do not pass over time in categories\nCan bring up to 10 pictures and 01 video\nFind the common news\nThere are 3 stars blinking easily click',
      price: '300,000Đ',
      inside: 'YES',
      time: '5 months',
    },
    {
      id: 5,
      type: 'News Super Vip',
      desciption:
        'Appearing prominently in the Tobe Rael homepage\nAppearing a front page according to the new previous mechanism after\nNews do not pass over time in categories\nCan give up to 16 pictures and 01 video\nFind signs before VIP news',
      price: '500,000Đ',
      inside: 'YES',
      time: '5 months',
    },
  ];
  const data3 = [
    {
      id: 1,
      type: 'Common trading floor',
      suitable: 'Group, small enterprise',
      price: 'Free',
      inside: 'NO',
      time: '2 months',
    },
    {
      id: 2,
      type: 'VIP trading floor',
      suitable: 'Enterprise',
      price: '5,000Đ',
      inside: 'NO',
      time: '3 months',
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
            contentContainerStyle={{columnGap: scale(10)}}
            data={data}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
            renderItem={({item}) =>
              item.id !== 4 ? (
                <LinearGradient
                  colors={['#F0B90B', '#FFFFFF']}
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 1}}
                  style={{...styles.item, height:scale(330)}}>
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
                      marginTop:scale(10)
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
                    <View
                      style={{
                        alignSelf: 'center',
                        justifyContent: 'center',
                        top: scale(-5),
                      }}>
                      <Image
                        source={item.image}
                        style={{width: scale(46), height: scale(47)}}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      backgroundColor: '#997006',
                      height: scale(32),
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: scale(-15),
                    }}>
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
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: scale(10),
                    }}>
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
                  <View
                    style={{
                      marginTop: scale(10),
                      backgroundColor: '#997006',
                      height: scale(32),
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <CustomText
                      textType="bold"
                      style={{...styles.text3, color: COLORS.white}}>
                       Post super vip news for free
                    </CustomText>
                    <CustomText
                      textType="semiBold"
                      style={{...styles.text3, color: COLORS.white}}>
                      {item.postsupervip}
                    </CustomText>
                  </View>
                  <ButtonBuy title={'Buy NOW'} />
                </LinearGradient>
              ) : (
                <LinearGradient
                  colors={['#000000', '#000000']}
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 1}}
                  style={[styles.item]}>
                  <CustomText
                    textType="bold"
                    style={{...styles.text, color: COLORS.white}}>
                    {item.type}
                  </CustomText>
                  <LinearGradient
                    colors={['#626262', '#626262']}
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
                        style={{...styles.text, color: COLORS.white}}>
                        Avatar
                      </CustomText>
                      <CustomText
                        textType="bold"
                        style={{...styles.text, color: COLORS.white}}>
                        Border
                      </CustomText>
                    </View>
                    <View
                      style={{
                        alignSelf: 'center',
                        justifyContent: 'center',
                        top: scale(-5),
                      }}>
                      <Image
                        source={item.image}
                        style={{width: scale(46), height: scale(47)}}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      backgroundColor: '#626262',
                      height: scale(32),
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: scale(-15),
                    }}>
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
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: scale(10),
                    }}>
                    <CustomText
                      textType="bold"
                      style={{...styles.text3, color: COLORS.white}}>
                      Post 3-star vip news for free
                    </CustomText>
                    <CustomText
                      textType="medium"
                      style={{...styles.text3, color: COLORS.white}}>
                      {item.post3stars}
                    </CustomText>
                  </View>
                  <View
                    style={{
                      marginTop: scale(10),
                      backgroundColor: '#626262',
                      height: scale(32),
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
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
                  <ButtonBuy title={'Buy NOW'} />
                </LinearGradient>
              )
            }
          />
        </View>
      )}
      {viewpackage && (
        <View style={styles.box}>
          <FlatList
            contentContainerStyle={{columnGap: scale(10)}}
            data={data1}
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
                    height: scale(50),
                    width: '100%',
                    borderTopLeftRadius: scale(10),
                    borderTopRightRadius: scale(10),
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: scale(20),
                  }}>
                  <CustomText
                    textType="bold"
                    style={{...styles.text2, color: COLORS.white}}>
                    {item.price}
                  </CustomText>
                </LinearGradient>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: scale(10),
                  }}>
                  <CustomText
                    textType="bold"
                    style={{...styles.text3, color: COLORS.white}}>
                    Posting bonus
                  </CustomText>
                  <CustomText
                    textType="medium"
                    style={{...styles.text3, color: COLORS.white}}>
                    {item.bonus}
                  </CustomText>
                </View>
                <View
                  style={{
                    backgroundColor: '#997006',
                    height: scale(41),
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: scale(10),
                  }}>
                  <CustomText
                    textType="bold"
                    style={{...styles.text3, color: COLORS.white}}>
                    Total balance
                  </CustomText>
                  <CustomText
                    textType="semiBold"
                    style={{...styles.text3, color: COLORS.white}}>
                    {item.balance}
                  </CustomText>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: scale(10),
                  }}>
                  <CustomText
                    textType="bold"
                    style={{...styles.text3, color: COLORS.white}}>
                    Time
                  </CustomText>
                  <CustomText
                    textType="bold"
                    style={{...styles.text3, color: COLORS.white}}>
                    {item.time}
                  </CustomText>
                </View>
                <ButtonBuy title={'Buy NOW'} />
              </LinearGradient>
            )}
          />
        </View>
      )}
      {viewcostnew && (
        <View style={{...styles.box, height: scale(464)}}>
          <FlatList
            contentContainerStyle={{columnGap: scale(10)}}
            data={data2}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
            renderItem={({item}) => (
              <LinearGradient
                colors={['#F0B90B', '#FFFFFF']}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                style={{...styles.item, height: scale(417)}}>
                <CustomText
                  textType="bold"
                  style={{...styles.text, color: COLORS.white}}>
                  {item.type}
                </CustomText>
                {item.id !== 1 && item.id !== 2 && item.id !== 3 && (
                  <View
                    style={{
                      height: scale(1),
                      backgroundColor: COLORS.black,
                      width: '80%',
                      marginTop: scale(10),
                    }}></View>
                )}
                <View style={{marginTop: scale(30)}}>
                  <CustomText
                    textType="bold"
                    style={{...styles.text3, color: COLORS.black}}>
                    Description of where it appears
                  </CustomText>
                </View>

                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: scale(10),
                    width: '85%',
                  }}>
                  <CustomText
                    textType="medium"
                    style={{...styles.text3, color: COLORS.black}}>
                    {item.desciption}
                  </CustomText>
                </View>
                <View
                  style={{
                    backgroundColor: '#997006',
                    height: scale(55),
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: scale(10),
                  }}>
                  <CustomText
                    textType="bold"
                    style={{...styles.text3, color: COLORS.white}}>
                    Price/Week
                  </CustomText>
                  <CustomText
                    textType="bold"
                    style={{...styles.text3, color: COLORS.white}}>
                    {item.price}
                  </CustomText>
                  <CustomText
                    textType="medium"
                    style={{...styles.text3, color: COLORS.white}}>
                    (Not include VAT)
                  </CustomText>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: scale(10),
                  }}>
                  <CustomText
                    textType="bold"
                    style={{...styles.text3, color: COLORS.black}}>
                    Inside page
                  </CustomText>
                  <CustomText
                    textType="medium"
                    style={{...styles.text3, color: COLORS.black}}>
                    {item.inside}
                  </CustomText>
                </View>
                <View
                  style={{
                    backgroundColor: '#997006',
                    height: scale(41),
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: scale(10),
                  }}>
                  <CustomText
                    textType="bold"
                    style={{...styles.text3, color: COLORS.white}}>
                    According to the project
                  </CustomText>
                  <CustomText
                    textType="bold"
                    style={{...styles.text3, color: COLORS.white}}>
                    {item.inside}
                  </CustomText>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: scale(10),
                  }}>
                  <CustomText
                    textType="bold"
                    style={{...styles.text3, color: COLORS.black}}>
                    SHARE FANPAGES
                  </CustomText>
                  <CustomText
                    textType="medium"
                    style={{...styles.text3, color: COLORS.black}}>
                    {item.inside}
                  </CustomText>
                </View>
              </LinearGradient>
            )}
          />
        </View>
      )}
      {viewtradingflatform && (
        <View style={{...styles.box, height: scale(335)}}>
          <FlatList
            contentContainerStyle={{columnGap: scale(10)}}
            data={data3}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
            renderItem={({item}) => (
              <LinearGradient
                colors={['#F0B90B', '#FFFFFF']}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                style={{...styles.item, height: scale(291)}}>
                <CustomText
                  textType="bold"
                  style={{...styles.text, color: COLORS.white}}>
                  {item.type}
                </CustomText>
                <View
                  style={{
                    height: scale(1),
                    backgroundColor: COLORS.white,
                    width: '80%',
                    marginTop: scale(10),
                  }}></View>
                <View style={{marginTop: scale(15), alignItems: 'center'}}>
                  <CustomText
                    textType="bold"
                    style={{...styles.text3, color: COLORS.black}}>
                    Suitable object
                  </CustomText>
                  <CustomText
                    textType="medium"
                    style={{...styles.text3, color: COLORS.black}}>
                    {item.suitable}
                  </CustomText>
                </View>
                <View
                  style={{
                    backgroundColor: '#997006',
                    height: scale(55),
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: scale(10),
                  }}>
                  <CustomText
                    textType="bold"
                    style={{...styles.text3, color: COLORS.white}}>
                    Introducing the trading floor
                  </CustomText>
                  <CustomText
                    textType="semiBold"
                    style={{...styles.text3, color: COLORS.white}}>
                    Yes
                  </CustomText>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: scale(10),
                  }}>
                  <CustomText
                    textType="bold"
                    style={{...styles.text3, color: COLORS.black}}>
                    Path map
                  </CustomText>
                  <CustomText
                    textType="medium"
                    style={{...styles.text3, color: COLORS.black}}>
                    Yes
                  </CustomText>
                </View>
                <View
                  style={{
                    backgroundColor: '#997006',
                    height: scale(41),
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: scale(10),
                  }}>
                  <CustomText
                    textType="bold"
                    style={{...styles.text3, color: COLORS.white}}>
                    List of trading floors
                  </CustomText>
                  <CustomText
                    textType="semiBold"
                    style={{...styles.text3, color: COLORS.white}}>
                    Yes
                  </CustomText>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: scale(10),
                  }}>
                  <CustomText
                    textType="bold"
                    style={{...styles.text3, color: COLORS.black}}>
                    Contact
                  </CustomText>
                  <CustomText
                    textType="medium"
                    style={{...styles.text3, color: COLORS.black}}>
                    Yes
                  </CustomText>
                </View>
              </LinearGradient>
            )}
          />
        </View>
      )}
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
    height: scale(319),
    backgroundColor: '#FFFFFF',
    // flexDirection: 'row',
    paddingTop: scale(10),
    borderColor: '#F0B90B80',
    borderWidth: scale(1),
    borderRadius: scale(16),
    width: scale(266),
    alignItems: 'center',
    //  justifyContent:'center'
  },
});

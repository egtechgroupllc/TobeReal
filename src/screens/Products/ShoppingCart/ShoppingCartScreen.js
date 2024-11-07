import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Button, CImage, CText, MainWrapper} from '~/components';
import {COLORS, images, SIZES} from '~/assets/constants';
import AppointmentHeader from '~/components/AppointmentHeader/AppointmentHeader';
import EmptyData from '~/components/EmptyData';
import {scale} from '~/utils/scale';
import {formatPrice} from '~/utils/format';
import Counter from '~/components/Counter';
import CheckBox from '~/components/CheckBox';
import {SwipeListView} from 'react-native-swipe-list-view';
import {useNavigation} from '@react-navigation/native';
import FooterCart from './components/FooterCart';
import CartItem from './components/CartItem';
import {IconHome} from '~/assets/icon/Icon';
const fake = [
  {
    id: 1,
    shop: 'Bwell Official Store1',
    items: [
      {
        id: 1,
        name: 'Qdevices automatic',
        price: 135000,
        images: [
          {
            url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
            id: 1,
            description: 'dsadsadas',
          },
        ],
      },
      {
        id: 2,

        name: 'Qdevices autoc1',
        price: 11111,
        images: [
          {
            url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
            id: 1,
            description: 'dsadsadas',
          },
        ],
      },
    ],

    images: [
      {
        url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
        id: 1,
        description: 'dsadsadas',
      },
    ],
  },
  {
    id: 2,

    shop: 'Bwell Official Store2',
    items: [
      {
        id: 1,

        name: 'Qdevices automatic',
        price: 135000,
        images: [
          {
            url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
            id: 1,
            description: 'dsadsadas',
          },
        ],
      },
      {
        id: 2,

        name: 'Qdevices autoc1',
        price: 11111,
        images: [
          {
            url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
            id: 1,
            description: 'dsadsadas',
          },
        ],
      },
    ],
    images: [
      {
        url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
        id: 1,
        description: 'dsadsadas',
      },
    ],
  },
  {
    id: 3,

    shop: 'Bwell Official Store3',
    items: [
      {
        id: 1,

        name: 'Qdevices automatic',
        price: 135000,
        images: [
          {
            url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
            id: 1,
            description: 'dsadsadas',
          },
        ],
      },
      {
        id: 2,

        name: 'Qdevices autoc1',
        price: 11111,
        images: [
          {
            url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
            id: 1,
            description: 'dsadsadas',
          },
        ],
      },
    ],
    images: [
      {
        url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
        id: 1,
        description: 'dsadsadas',
      },
    ],
  },
  {
    id: 4,

    shop: 'Bwell Official Store4',

    items: [
      {
        id: 1,

        name: 'Qdevices automatic',
        price: 135000,
        images: [
          {
            url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
            id: 1,
            description: 'dsadsadas',
          },
        ],
      },
      {
        id: 2,

        name: 'Qdevices autoc1',
        price: 11111,
        images: [
          {
            url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
            id: 1,
            description: 'dsadsadas',
          },
        ],
      },
    ],

    images: [
      {
        url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
        id: 1,
        description: 'dsadsadas',
      },
    ],
  },
  {
    id: 5,

    items: [
      {
        id: 1,

        name: 'Qdevices automatic',
        price: 135000,
        images: [
          {
            url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
            id: 1,
            description: 'dsadsadas',
          },
        ],
      },
      {
        id: 2,

        name: 'Qdevices autoc1',
        price: 11111,
        images: [
          {
            url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
            id: 1,
            description: 'dsadsadas',
          },
        ],
      },
    ],
    images: [
      {
        url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
        id: 1,
        description: 'dsadsadas',
      },
    ],
  },
];
export default function ShoppingCartScreen() {
  const [listData, setListData] = useState(fake);
  const {navigate} = useNavigation();
  const deleteItem = (shopId, itemId) => {
    // Xóa item khỏi danh sách items của shop cụ thể
    const updatedData = listData
      .map(shop => {
        if (shop.id === shopId) {
          const updatedItems = shop.items.filter(item => item.id !== itemId);

          // Nếu danh sách items của shop trống, không giữ lại shop này
          if (updatedItems.length === 0) {
            return null; // Trả về null để loại bỏ shop này
          }

          return {
            ...shop,
            items: updatedItems,
          };
        }
        return shop;
      })
      .filter(shop => shop !== null); // Loại bỏ tất cả các shop là null

    setListData(updatedData);
  };
  const calculateTotalPrice = () => {
    return listData.reduce((total, shop) => {
      return (
        total +
        shop.items.reduce((shopTotal, item) => shopTotal + item.price, 0)
      );
    }, 0);
  };
  return (
    <>
      <MainWrapper
        sourceImage={images.backgroundHome}
        headerTitle={'Shopping Cart'}
        optionsHeader={{
          headerTitleStyle: {
            textAlign: 'left',
          },
          headerStyle: {
            paddingBottom: 0,
          },
          headerRight: () => {
            return (
              <Button.Icon
                Icon={IconHome}
                color={COLORS.White}
                onPress={() => navigate('BottomTab')}
              />
            );
          },
        }}>
        <View style={{flex: 1, paddingBottom: scale(150)}}>
          <FlatList
            data={listData}
            contentContainerStyle={{rowGap: scale(20)}}
            keyExtractor={(_, index) => `key-list-doctor-appointment${index}`}
            renderItem={({item: shop}) => (
              <CartItem data={shop} deleteItem={deleteItem} />
            )}
          />
        </View>
      </MainWrapper>
      <FooterCart totalPrice={calculateTotalPrice()} />
    </>
  );
}

import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import EmptyData from '~/components/EmptyData';
import {scale} from '~/utils/scale';
import AppointItem from '~/screens/Appointment/User/components/AppointItem';
import {COLORS, images, SIZES} from '~/assets/constants';
import {useLanguage} from '~/hooks/useLanguage';
import {CText} from '~/components';
import {IconDown} from '~/assets/icon/Icon';
const fake = [
  {
    name: 'THS.BS. Tran Tuan Kiet',
    des: ['Nam khoa', 'Tiet nieu', 'Phu khoa', 'Phu khoa', 'Phu khoa'],
    q: '294 khuong viet',
    isLoading: true,
    avatar: images.iconProfile,

    images: [
      {
        url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
        id: 1,
        description: 'dsadsadas',
      },
      {
        url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
        id: 2,
        description: 'dsadsadas',
      },
      {
        url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
        id: 3,
        description: 'dsadsadas',
      },
    ],
  },
  {
    name: '312312',
    des: ['Nam khoa', 'Tiet nieu'],
    q: 'ewqeqw',
    avatar: images.iconProfile,
    isLoading: true,

    images: [
      {
        url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
        id: 1,
        description: 'dsadsadas',
      },
      {
        url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
        id: 2,
        description: 'dsadsadas',
      },
      {
        url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
        id: 3,
        description: 'dsadsadas',
      },
    ],
  },
  {
    name: '312312',
    des: ['Nam khoa', 'Tiet nieu'],
    q: 'ewqeqw',
    avatar: images.iconProfile,
    isLoading: true,

    images: [
      {
        url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
        id: 1,
        description: 'dsadsadas',
      },
      {
        url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
        id: 2,
        description: 'dsadsadas',
      },
      {
        url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
        id: 3,
        description: 'dsadsadas',
      },
    ],
  },
  {
    name: '312312',
    des: ['Nam khoa', 'Tiet nieu'],
    q: 'ewqeqw',
    avatar: images.iconProfile,
    isLoading: false,

    images: [
      {
        url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
        id: 1,
        description: 'dsadsadas',
      },
      {
        url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
        id: 2,
        description: 'dsadsadas',
      },
      {
        url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
        id: 3,
        description: 'dsadsadas',
      },
    ],
  },
  {
    name: '312312',
    des: ['Nam khoa', 'Tiet nieu'],
    q: 'ewqeqw',
    avatar: images.iconProfile,
    isLoading: false,

    images: [
      {
        url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
        id: 1,
        description: 'dsadsadas',
      },
      {
        url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
        id: 2,
        description: 'dsadsadas',
      },
      {
        url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
        id: 3,
        description: 'dsadsadas',
      },
    ],
  },
];
export default function Appoint({data, isLoading}) {
  const [viewMore, setViewMore] = useState(false);
  const {t} = useLanguage();

  return (
    <View>
      <FlatList
        data={data?.data_doctor?.slice(0, viewMore ? Infinity : 2)}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => `key-list-doctor-appointment${index}`}
        ListEmptyComponent={<EmptyData />}
        contentContainerStyle={{
          rowGap: scale(20),
        }}
        renderItem={({item, index}) => {
          return (
            <AppointItem
              key={index}
              data={item}
              isLoading={isLoading}
              style={{
                borderBottomLeftRadius:
                  index === data?.data_doctor?.length - 1 ||
                  (index === 1 && !viewMore)
                    ? 0
                    : 10,
                borderBottomRightRadius:
                  index === data?.data_doctor?.length - 1 ||
                  (index === 1 && !viewMore)
                    ? 0
                    : 10,
              }}
            />
          );
        }}
      />
      {data?.data_doctor?.length > 2 && (
        <TouchableOpacity
          onPress={() => setViewMore(prev => !prev)}
          activeOpacity={0.7}
          style={styles.buttonMore}>
          <CText
            textType="semiBold"
            style={{
              color: COLORS.White,
              fontSize: SIZES.medium,
            }}>
            {!viewMore
              ? `${t('show_more')} ${data?.data_doctor?.length - 2} ${t(
                  'items',
                )}`
              : t('show_less')}
          </CText>
          <IconDown
            fill={COLORS.White}
            style={
              viewMore && {
                transform: [
                  {
                    rotate: '180deg',
                  },
                ],
              }
            }
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonMore: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: scale(10),
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: COLORS.input,
    paddingVertical: scale(10),
    backgroundColor: COLORS.BlueBold,
    borderBottomLeftRadius: scale(10),
    borderBottomRightRadius: scale(10),
  },
});

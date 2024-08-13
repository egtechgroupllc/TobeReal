import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import EmptyData from '../../components/EmptyData';
import {COLORS, SHADOW, SIZES, scale} from '../../assets/constants';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {
  getListChatGroup,
  postCheckStatus,
  postCreateGroupChat,
} from '../../Model/api/common';
import {useAuthentication} from '../../hooks/useAuthentication';
import {CustomInput, CustomText, MainWrapper} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {showMess} from '../../assets/constants/Helper';
import {useLanguage} from '../../hooks/useLanguage';
import {formatDateTime, formatTimeAgo} from '../../utils/format';
import {IconHome, IconSearch} from '../../assets/icon/Icon';
import BoxChatItem from './components/BoxChatItem';

export default function ListChatGroupScreen() {
  const {token} = useAuthentication();
  const {t} = useLanguage();
  const {navigate, setOptions} = useNavigation();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const dataPro = queryClient.getQueryData(['user', 'profile'])?.data;
  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('my_list_group_chat'),
    });
  }, []);

  const {data, isLoading, error, isError} = useQuery({
    queryKey: ['chat', 'my-list-chat-group'],
    queryFn: () => getListChatGroup(),
    enabled: !!token,
    refetchInterval: 5000,
  });
  const handleSearch = query => {
    setSearchQuery(query);
  };

  const filteredData =
    data?.data?.rows.filter(chatGroup => {
      return chatGroup?.users?.some(user =>
        user?.username.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }) || [];

  return (
    <MainWrapper
      scrollEnabled={false}
      noImgColor
      styleContent={{paddingBottom: scale(50)}}>
      <CustomInput
        styleWrapper={{
          marginTop: scale(10),
          backgroundColor: COLORS.grey50,
          width: '95%',
          alignSelf: 'center',
          borderRadius: scale(10),
        }}
        placeholder={t('search')}
        iconLeft={IconSearch}
        onChangeText={handleSearch}
      />
      <FlatList
        data={
          filteredData.length > 0
            ? filteredData
            : isLoading
            ? [...Array(3)]
            : []
        }
        contentContainerStyle={{
          paddingVertical: scale(10),
          rowGap: scale(10),
          padding: scale(10),
        }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        ListEmptyComponent={() => (
          <EmptyData styleWrapper={{marginTop: '40%'}} />
        )}
        renderItem={({item, index}) => {
          const filterUser = item?.users?.filter(
            user => user?.username !== dataPro?.username,
          );
          return (
            <View key={index}>
              {filterUser?.map((user, userIndex) => {
                return (
                  <BoxChatItem
                    token={token}
                    dataItem={item}
                    dataUser={user}
                    key={`${index}-${userIndex}`}
                  />
                );
              })}
            </View>
          );
        }}
      />
    </MainWrapper>
    //   <FlatList
    //   data={dataFake}
    //   contentContainerStyle={{
    //     rowGap: scale(10),
    //     padding: scale(10),
    //   }}
    //   showsVerticalScrollIndicator={false}
    //   ListEmptyComponent={() => (
    //     <EmptyData styleWrapper={{marginTop: '40%'}} />
    //   )}
    //   renderItem={({item, index}) => {
    //     return (
    //       <View key={index}>
    //         <TouchableOpacity
    //           // onPress={() => navigateGroupChat(user)}
    //           style={{
    //             backgroundColor: COLORS.white,
    //             height: scale(60),
    //             width: '100%',
    //             borderRadius: scale(10),
    //             ...SHADOW,
    //             padding: scale(10),
    //             rowGap: scale(3),
    //             paddingHorizontal: scale(15),
    //             justifyContent: 'center',
    //           }}>
    //           <CustomText
    //             style={{fontSize: SIZES.medium}}
    //             textType="semiBold">
    //             {item?.name}
    //           </CustomText>
    //           <View
    //             style={{
    //               flexDirection: 'row',
    //               justifyContent: 'space-between',
    //             }}>
    //             <CustomText numberOfLines={1} style={{width: scale(200)}}>
    //               {item?.content}dasdsadasdsadsadasdasdsdasdsa
    //             </CustomText>
    //             <CustomText style={{color: COLORS.grey}}>
    //               {item?.createAt}
    //             </CustomText>
    //           </View>
    //         </TouchableOpacity>
    //       </View>
    //     );
    //   }}
    // />
  );
}

const styles = StyleSheet.create({});

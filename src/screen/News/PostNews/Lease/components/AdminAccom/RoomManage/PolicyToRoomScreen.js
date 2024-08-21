import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useMemo, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  COLORS,
  SHADOW,
  SIZES,
  WIDTH,
  scale,
} from '../../../../../../../assets/constants';
import {
  IconAcreage,
  IconHome,
  IconX,
} from '../../../../../../../assets/icon/Icon';
import Carousel from 'react-native-snap-carousel';
import CustomImage from '../../../../../../../components/CustomImage';
import CustomText from '../../../../../../../components/CustomText';
import {formatPrice} from '../../../../../../../utils/format';
import MainWrapper from '../../../../../../../components/MainWrapper';
import {useLanguage} from '../../../../../../../hooks/useLanguage';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {
  getDetailRoom,
  getListPolicy,
  getListTypeBed,
  getListTypeRoom,
  postPolicyToRoom,
} from '../../../../../../../Model/api/apiAccom';
import CheckBox from '../../../../../../../components/CheckBox';
import {CustomButton} from '../../../../../../../components';
import {useCountry} from '../../../../../../../hooks/useCountry';
import {showMess} from '../../../../../../../assets/constants/Helper';

export default function PolicyToRoomScreen() {
  const params = useRoute().params;
  const {t} = useLanguage();
  const {setOptions, navigate, goBack, addListener} = useNavigation();
  const queryClient = useQueryClient();
  const {currency} = useCountry();

  const dataTypeBed = useQuery({
    queryKey: ['room', 'list-type-bed'],
    queryFn: () => getListTypeBed(),
  });
  const roomTypeBed = useMemo(() => {
    const filterType = dataTypeBed?.data?.data?.filter(item => {
      return (
        item?.id === params?.room_bed_type_id ||
        item?.id === params?.dataRoom?.room_bed_type_id
      );
    });
    const result = filterType?.map(item => {
      return item?.name;
    });
    return result;
  }, [
    roomTypeBed?.data?.data,
    params?.dataRoom?.room_bed_type_id,
    params?.room_bed_type_id,
  ]);

  const dataTypeRoom = useQuery({
    queryKey: ['room', 'list-type'],
    queryFn: () => getListTypeRoom(),
  });

  const roomType = useMemo(() => {
    const filterType = dataTypeRoom?.data?.data?.filter(item => {
      return (
        item?.id === params?.room_type_id ||
        item?.id === params?.dataRoom?.room_type_id
      );
    });
    const result = filterType?.map(item => {
      return item?.name;
    });
    return result;
  }, [
    dataTypeRoom?.data?.data,
    params?.room_type_id,
    params?.dataRoom?.room_type_id,
  ]);
  const dataPolicy = useQuery({
    queryKey: [
      'accommodation',
      'list-policy',
      params?.accommodation_id,
      params?.id,
    ],
    queryFn: () =>
      getListPolicy({
        accommodation_id: params?.accommodation_id,
        room_id: params?.id || '',
      }),
  });
  const policyIdArray = dataPolicy?.data?.data?.rows?.map(item => item?.id);
  const dataDetailRoom = useQuery({
    queryKey: ['room', 'detail', params?.id],
    queryFn: () =>
      getDetailRoom({
        room_id: params?.id || params?.dataRoom?.id,
      }),
  });

  const dataRoomEx = dataDetailRoom?.data?.data;

  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('link_policy_to_room'),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigate('POST', {screen: 'PostNewsScreen'})}>
          <IconHome style={{width: scale(20)}} />
        </TouchableOpacity>
      ),
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  const createAddPolicyToRoom = useMutation({
    mutationFn: postPolicyToRoom,
  });
  const handleCancelLink = value =>
    Alert.alert(t('cancel_link_policy'), t('cancel_link_policy_confirm'), [
      {
        text: t('cancel'),
        // onPress: () => Alert.alert('Cancel Pressed'),
        style: 'cancel',
      },
      {text: t('ok'), onPress: () => cancelLinkPolicy(value)},
    ]);
  const cancelLinkPolicy = value => {
    createAddPolicyToRoom.mutate(
      {
        array_policy_id: [value?.id],
        room_id: params?.id || params?.dataRoom?.id,
        is_add: 0,
      },
      {
        onSuccess: dataInside => {
          if (dataInside?.status) {
            queryClient.invalidateQueries([
              'accommodation',
              'list-policy',
              params?.accommodation_id,
              params?.id,
            ]);
          }
        },
        onError: err => {
          console.log({err});
        },
      },
    );
  };
  const handleLinkPolicy = value => {
    createAddPolicyToRoom.mutate(
      {
        array_policy_id: policyIdArray,
        room_id: params?.id || params?.dataRoom?.id,
        is_add: 1,
      },
      {
        onSuccess: dataInside => {
          if (dataInside?.status) {
            if (params?.admin) {
              goBack(params);
            } else {
              navigate('NoBottomTab', {
                screen: 'AccommoManagementScreen',
                params,
              });
            }
            queryClient.invalidateQueries([
              'accommodation',
              'list-policy',
              params?.accommodation_id,
              params?.id,
            ]);
          }
        },
        onError: err => {
          console.log({err});
          showMess(t('an_error_occured'), 'error');
        },
      },
    );
  };
  useEffect(() => {
    addListener('beforeRemove', e => {
      // Prevent default behavior of leaving the screen
      !params?.admin && e.preventDefault();
      // Prompt the user before leaving the screen
    });
  }, [params?.admin]);
  return (
    <MainWrapper
      optionsHeader={{
        gestureEnabled: false,
        headerLeft: () => {},
        headerTitle: t('link_policy_to_room'),
      }}>
      <View style={styles.wrapper}>
        <CustomText
          textType="bold"
          style={{
            fontSize: SIZES.medium,
          }}>
          {dataRoomEx?.name}
        </CustomText>
        <Carousel
          loop
          autoplay
          autoplayInterval={3000}
          layout={'tinder'}
          layoutCardOffset={9}
          data={dataRoomEx?.images}
          sliderWidth={WIDTH.widthScreen - scale(30)}
          itemWidth={WIDTH.widthScreen - scale(30)}
          containerCustomStyle={{
            paddingBottom: scale(5),
            height: scale(155),
          }}
          renderItem={({item}) => {
            return <CustomImage source={item.url} style={styles.img} />;
          }}
        />
        <View
          style={{
            padding: scale(10),
            rowGap: scale(10),
            width: '100%',
          }}>
          <Box title={t('room_detail')}>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-start',
                columnGap: scale(10),
              }}>
              <CustomText
                textType="medium"
                style={{
                  fontSize: SIZES.xMedium,
                }}>
                {t('room_type')}:
              </CustomText>
              <CustomText
                textType="bold"
                style={{
                  fontSize: SIZES.xMedium,
                }}>
                {roomType}
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-start',
                alignItems: 'center',
                columnGap: scale(10),
              }}>
              <CustomText
                textType="medium"
                style={{
                  fontSize: SIZES.xMedium,
                }}>
                {t('acreage')}:
              </CustomText>
              <CustomText textType="bold">
                {formatPrice(dataRoomEx?.size_width * dataRoomEx?.size_length, {
                  unit: 'm²',
                })}
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-start',
                alignItems: 'center',
                columnGap: scale(10),
              }}>
              <CustomText
                textType="medium"
                style={{
                  fontSize: SIZES.xMedium,
                }}>
                {t('price')}:
              </CustomText>
              <CustomText textType="bold">
                {formatPrice(params?.price, {
                  currency: currency?.currency_code,
                })}
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-start',
                columnGap: scale(10),
              }}>
              <CustomText
                textType="medium"
                style={{
                  fontSize: SIZES.xMedium,
                }}>
                {t('bed_type')}:
              </CustomText>
              <CustomText
                textType="bold"
                style={{
                  fontSize: SIZES.xMedium,
                }}>
                {roomTypeBed}
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-start',
                columnGap: scale(10),
              }}>
              <CustomText
                textType="medium"
                style={{
                  fontSize: SIZES.xMedium,
                }}>
                {t('maximum_adult')}:
              </CustomText>
              <CustomText
                textType="bold"
                style={{
                  fontSize: SIZES.xMedium,
                }}>
                {dataRoomEx?.max_occupancy}
              </CustomText>
            </View>
          </Box>
          <Box title={t('room_amenities')}>
            <View
              style={{
                width: '100%',
                rowGap: scale(10),
              }}>
              <View style={styles.contentFeat}>
                {dataRoomEx?.features?.map((item, index) => (
                  <View style={styles.boxFeat} key={index}>
                    <View style={styles.dot} />
                    <CustomText
                      style={{
                        fontSize: SIZES.xMedium,
                      }}>
                      {item}
                    </CustomText>
                  </View>
                ))}
              </View>
            </View>
          </Box>
          <Box title={t('policy_linked')}>
            <View style={styles.contentFeat}>
              <FlatList
                scrollEnabled
                showsVerticalScrollIndicator={false}
                data={dataPolicy?.data?.data?.rows}
                keyExtractor={(item, index) =>
                  `$key_${item.id}-policy-${index}`
                }
                style={{maxHeight: scale(200)}}
                contentContainerStyle={{
                  rowGap: scale(5),
                }}
                ListEmptyComponent={
                  <CustomText style={{color: COLORS.error}}>
                    {t('room_not_link_policy')}
                  </CustomText>
                }
                renderItem={({item, index}) => {
                  return (
                    <View
                      //   onPress={() => navigate('AddPolicyScreen')}
                      key={`$key_${item.id}-policy-${index}`}
                      style={{
                        height: scale(30),
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        paddingHorizontal: scale(10),
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          columnGap: scale(10),
                        }}>
                        <View style={styles.dot} />
                        <CustomText>{item?.name}</CustomText>
                      </View>
                      {dataPolicy?.data?.data?.count > 1 && (
                        <TouchableOpacity
                          onPress={() => handleCancelLink(item)}
                          activeOpacity={0.7}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: scale(6),
                          }}>
                          <IconX
                            fill={COLORS.error}
                            width={scale(18)}
                            height={scale(18)}
                          />
                          {/* <CheckBox
                            key={index}
                            textBold
                            isRadio
                            style={{height: scale(20)}}
                            isChecked={item?.rooms
                              .map(itemss => {
                                return itemss?.id;
                              })
                              .includes(params.id)}
                            textStyle={{
                              fontSize: SIZES.xMedium,
                            }}
                          /> */}
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                }}
              />
            </View>

            {params?.admin && (
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  marginBottom: scale(10),
                  color: COLORS.primary,
                }}
                activeOpacity={0.7}
                onPress={() =>
                  navigate('NoBottomTab', {
                    screen: 'PolicyManageScreen',
                    params: {
                      accommodation_id: params?.accommodation_id,
                      PolicyToRoom: true,
                      roomId: params?.id,
                      price: params?.price,
                    },
                  })
                }>
                <CustomText style={{color: COLORS.primary}}>
                  {t('add_more_policy')}
                </CustomText>
              </TouchableOpacity>
            )}
          </Box>
        </View>
      </View>
      <CustomButton
        onPress={() => handleLinkPolicy()}
        text={t('confirm')}
        buttonType="medium"
        style={{maxWidth: '50%', alignSelf: 'center'}}
      />
    </MainWrapper>
  );
}

const Box = ({children, title, styleContent}) => {
  return (
    <View
      style={{
        width: '100%',
        rowGap: scale(10),
      }}>
      <CustomText
        textType="semiBold"
        style={{
          fontSize: SIZES.xMedium,
        }}>
        {title}:
      </CustomText>
      <View
        style={{
          ...styles.box,
          minHeight: scale(30),
          ...styleContent,
        }}>
        {children}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  img: {
    width: '90%',
    height: '90%',
    borderRadius: scale(10),
    alignSelf: 'center',
  },
  dot: {
    width: scale(4),
    aspectRatio: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 99,
  },
  wrapper: {
    margin: scale(10),
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: scale(6),
    padding: scale(10),
    rowGap: scale(8),
    ...SHADOW,
  },
  box: {
    minHeight: scale(200),
    borderRadius: scale(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#F0B90B80',
    borderWidth: scale(1),
    padding: scale(10),
    gap: scale(10),
  },
  boxFeat: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(4),
  },
  contentFeat: {
    rowGap: scale(6),
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: scale(20),
  },
});

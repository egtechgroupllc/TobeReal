import {useQuery} from '@tanstack/react-query';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import {getListPriceRoomDate} from '../../../../../Model/api/apiAccom';
import {
  COLORS,
  SHADOW,
  SIZES,
  WIDTH,
  scale,
} from '../../../../../assets/constants';
import {IconAcreage, IconDown, IconNext} from '../../../../../assets/icon/Icon';
import CustomImage from '../../../../../components/CustomImage';
import CustomText from '../../../../../components/CustomText';
import InViewport from '../../../../../components/InViewport';
import {formatPrice} from '../../../../../utils/format';
import ItemAccommdSearchLoading from '../../../../Search/components/ItemAccommdSearchLoading';
import RoomUntil from './components/RoomUntil';
import SelectRoom from './components/SelectRoom';
import {useCountry} from '../../../../../hooks/useCountry';
import Collapsible from 'react-native-collapsible';
import {CustomButton} from '../../../../../components';
import {useLanguage} from '../../../../../hooks/useLanguage';

export default function wwRoomItem({
  dataP,
  onBooking,
  date,
  onDetail,
  isFilterChildren,
}) {
  const {t} = useLanguage();

  const [isRender, setIsRender] = useState(false);
  const [numRoom, setNumRoom] = useState(1);
  const {data, isLoading} = useQuery({
    queryKey: ['accommodation', 'detail', 'list-room-date', dataP?.id],
    queryFn: () =>
      getListPriceRoomDate({
        id_room: dataP?.id,
        date_start: date?.selectedStartDate,
        date_end: date?.selectedEndDate,
      }),
  });
  const priceAverage = useMemo(() => {
    const result = data?.data?.data?.rows?.reduce((acc, item) => {
      return acc + item?.price;
    }, 0);
    return result / data?.data?.data?.count;
  }, [data?.data?.data]);
  const [viewMore, setViewMore] = useState(false);

  return (
    <InViewport
      onChange={render => render && setIsRender(render)}
      ComponentLoading={<ItemAccommdSearchLoading />}>
      {isRender && (
        <View style={styles.wrapper}>
          <Carousel
            loop
            autoplay
            autoplayInterval={3000}
            layout={'tinder'}
            layoutCardOffset={9}
            data={dataP.images}
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
              alignSelf: 'flex-start',
              rowGap: scale(4),
            }}>
            <CustomText
              textType="bold"
              style={{
                fontSize: SIZES.xMedium,
              }}>
              {dataP?.room_type?.name}
            </CustomText>
            <View
              style={{
                ...styles.row,
                columnGap: scale(5),
              }}>
              <IconAcreage
                style={{
                  width: scale(20),
                  height: scale(20),
                }}
              />
              <CustomText>
                {formatPrice(dataP.size_width * dataP.size_length, {
                  unit: 'm²',
                })}
              </CustomText>
            </View>
          </View>
          <View
            style={{
              width: '100%',
            }}>
            {dataP.accommodation_policies
              .slice(0, viewMore ? Infinity : 2)
              .map((item, index) => {
                return (
                  <TouchableNativeFeedback
                    key={index}
                    onPress={() => {
                      onDetail({
                        priceAverage,
                        percentDiscount: item?.price_percent,
                      });
                    }}>
                    <View style={styles.content}>
                      <View
                        style={{
                          ...styles.row,
                          ...styles.header,
                        }}>
                        <CustomText
                          textType="bold"
                          style={{color: COLORS.black, flex: 1}}
                          numberOfLines={1}>
                          {dataP?.name}
                        </CustomText>
                        <IconNext
                          style={{
                            width: scale(14),
                            height: scale(14),
                          }}
                          fill={COLORS.black}
                        />
                      </View>

                      <View
                        style={{
                          padding: scale(8),
                          rowGap: scale(7),
                        }}>
                        <RoomUntil
                          data={{...dataP, item}}
                          price={priceAverage * numRoom}
                          isFilterChildren={isFilterChildren}
                        />
                        <SelectRoom
                          onPress={value =>
                            onBooking({
                              numRoomSelect: value,
                              id: dataP?.id,
                              priceAverage,
                              percentDiscount: item?.price_percent,
                            })
                          }
                          data={dataP}
                          onSelect={setNumRoom}
                        />
                      </View>
                    </View>
                  </TouchableNativeFeedback>
                );
              })}
            {dataP?.accommodation_policies?.length > 2 && (
              <TouchableOpacity
                onPress={() => setViewMore(prev => !prev)}
                activeOpacity={0.7}
                style={{
                  marginTop: scale(10),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  columnGap: scale(10),
                }}>
                <CustomText
                  textType="semiBold"
                  style={{
                    color: COLORS.primary,
                    fontSize: SIZES.medium,
                  }}>
                  {!viewMore
                    ? `${t('show_more')} ${
                        dataP?.accommodation_policies?.length - 2
                      } ${t('room')}`
                    : t('show_less')}
                </CustomText>
                <IconDown
                  fill={COLORS.primary}
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
        </View>
      )}
    </InViewport>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: scale(6),
    padding: scale(10),
    rowGap: scale(8),
    ...SHADOW,
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: scale(10),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    ...SHADOW,
    backgroundColor: COLORS.white,
    width: '100%',
    borderRadius: scale(6),
    marginTop: scale(15),
  },
  header: {
    columnGap: scale(10),
    padding: scale(6),
    paddingVertical: scale(10),
    backgroundColor: COLORS.subPrimary,
    justifyContent: 'space-between',
    borderTopRightRadius: scale(6),
    borderTopLeftRadius: scale(6),
  },
});

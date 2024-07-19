import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, SIZES, scale} from '../../../../../../../assets/constants';
import {CustomText} from '../../../../../../../components';
import {useLanguage} from '../../../../../../../hooks/useLanguage';
import EmptyData from '../../../../../../../components/EmptyData';
import TicketItem from './TicketItem';

export default function BoxTypeTicket({
  data,
  onChangeQuantity,
  dataPriceTicket,
}) {
  const {t} = useLanguage();
  const [listAddTicket, setListAddTicket] = useState([
    {
      ...data?.tour_ticket_items[0],
      quantity: 1,
    },
  ]);

  const handleChangeTicker = ({item, quantity, index}) => {
    setListAddTicket(prevs => {
      const check = prevs.some(itemPrev => itemPrev.id === item?.id);

      if (check) {
        const dataUpdate = [...prevs];

        if (!quantity) {
          return prevs.filter(itemPrev => {
            return itemPrev.id !== item?.id;
          });
        }

        dataUpdate[index] = {
          ...dataUpdate[index],
          quantity: quantity,
        };

        return dataUpdate;
      }

      return !quantity
        ? prevs
        : [
            ...prevs,
            {
              ...item,
              quantity: quantity,
            },
          ];
    });
  };
  useEffect(() => {
    onChangeQuantity && onChangeQuantity(listAddTicket);
  }, [listAddTicket]);

  return (
    <View style={{width: '90%'}}>
      <CustomText
        textType="medium"
        style={{
          fontSize: SIZES.small,
          color: COLORS.black,
          marginTop: scale(10),
        }}>
        {t('add_number_guest')}:
      </CustomText>
      <View
        style={{
          ...styles.box,
          marginTop: scale(10),
          borderRadius: scale(5),
          minHeight: scale(30),
        }}>
        <FlatList
          scrollEnabled={false}
          // key={`accommodation/my-list-1-${page}_${data?.data?.count}_${numColumns}`}
          data={data?.tour_ticket_items}
          keyExtractor={(item, index) => `$key_${item.id}-${index}`}
          contentContainerStyle={{
            paddingTop: scale(10),
          }}
          showsVerticalScrollIndicator={false}
          // ListEmptyComponent={
          //   <EmptyData
          //     iconEmpty={<IconNoVoucher width={scale(150)} height={scale(150)} />}
          //     styleWrapper={{
          //       marginTop: '40%',
          //       justifyContent: 'center',
          //     }}
          //     desc={t('')}
          //   />
          // }
          renderItem={({item, index}) => {
            return (
              <TicketItem
                key={`key_${item?.id}-${index}`}
                data={item}
                index={index}
                dataPriceTicket={dataPriceTicket}
                onChange={quantity => {
                  handleChangeTicker({item, quantity, index});
                }}
                // onPressMore={() => {
                //   setDataItemAccom(item);
                //   bottomSheetRef.current.open();
                // }}
                // onEdit={() => {
                //   navigate('DetailRoomManageScreen', {
                //     ...item,
                //   });
                // }}
              />
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    minHeight: scale(100),
    backgroundColor: '#FFFFFF',
    paddingHorizontal: scale(20),
    borderColor: '#F0B90B80',
    borderWidth: scale(1),
    width: '100%',
    paddingBottom: scale(20),
  },
});

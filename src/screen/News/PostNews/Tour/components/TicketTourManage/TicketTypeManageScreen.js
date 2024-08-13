import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useLayoutEffect, useMemo, useRef, useState} from 'react';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import {useNavigation, useRoute} from '@react-navigation/native';
import {IconHome} from '../../../../../../assets/icon/Icon';
import {scale} from '../../../../../../assets/constants';
import {
  BottomSheet,
  CustomButton,
  MainWrapper,
} from '../../../../../../components';
import EmptyData from '../../../../../../components/EmptyData';
import DeleteTicket from './DeleteTicket';
import DeleteTypeTicket from './DeleteTypeTicket';
import TicketTypeItem from './TicketTypeItem';
import {ScrollView} from 'react-native-gesture-handler';
import {formatDate} from '../../../../../../utils/format';
import {useQuery} from '@tanstack/react-query';

export default function TicketTypeManageScreen() {
  const {setOptions, navigate} = useNavigation();
  const {t} = useLanguage();
  const params = useRoute().params;

  const bottomSheetRef = useRef();
  const [dataItemAccom, setDataItemAccom] = useState(null);
  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('tour_ticket_type_management'),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigate('POST', {screen: 'PostNewsScreen'})}>
          <IconHome style={{width: scale(20)}} />
        </TouchableOpacity>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const priceMin = useMemo(() => {
    const result = params?.item?.tour_ticket_dates.map(item => {
      return item?.price;
    });

    return Math.min(...result);
  }, [params?.item?.tour_ticket_items]);

  return (
    <MainWrapper
      refreshControl
      styleContent={{
        marginVertical: scale(20),
      }}>
      <>
        <CustomButton
          text={t('add_more_ticket_type')}
          style={{width: '50%', marginLeft: scale(20), marginBottom: scale(10)}}
          onPress={() =>
            navigate('AddTypeTicketScreen', {...params, admin: true})
          }
        />

        <>
          <ScrollView
            contentContainerStyle={{
              gap: scale(10),
            }}>
            <FlatList
              // key={`accommodation/my-list-1-${page}_${data?.data?.count}_${numColumns}`}
              data={params?.item?.tour_ticket_items}
              keyExtractor={(item, index) => `$key_${item.id}-${index}`}
              contentContainerStyle={{
                paddingHorizontal: scale(20),
                rowGap: scale(10),
                paddingVertical: scale(10),
              }}
              renderItem={({item, index}) => {
                return (
                  <TicketTypeItem
                    priceFinal={item?.price_percent * priceMin}
                    key={`key_${item?.id}-${index}`}
                    data={{...item}}
                    onPressMore={() => {
                      setDataItemAccom(item);
                      bottomSheetRef.current.open();
                    }}
                    // onEdit={() => {
                    //   navigate('TicketTypeManageScreen', {
                    //     ...item,
                    //     update: true,
                    //   });
                    // }}
                    // onManage={() => {
                    //   navigate('TicketTypeManageScreen', {
                    //     ...item,
                    //     update: true,
                    //   });
                    // }}
                  />
                );
              }}
            />
          </ScrollView>
        </>

        <BottomSheet
          ref={bottomSheetRef}
          titleIndicator={t('notification')}
          snapPoints={['30%']}
          disableScroll
          styleContent={styles.bottomSheet}>
          <DeleteTypeTicket
            data={dataItemAccom}
            onSuccess={() => {
              bottomSheetRef.current.close();
              setDataItemAccom(null);
            }}
            onCancel={() => {
              bottomSheetRef.current.close();
              setDataItemAccom(null);
            }}
          />
        </BottomSheet>
      </>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  bottomSheet: {
    rowGap: scale(10),
    padding: scale(20),
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: scale(10),
    rowGap: scale(10),
    paddingVertical: scale(20),
  },
});

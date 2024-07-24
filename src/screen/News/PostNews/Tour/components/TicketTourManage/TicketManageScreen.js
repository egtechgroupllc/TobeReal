import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useLayoutEffect, useRef, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {scale} from '../../../../../../assets/constants';
import {CustomButton} from '../../../../../../components';
import BottomSheet from '../../../../../../components/BottomSheet';
import EmptyData from '../../../../../../components/EmptyData';
import MainWrapper from '../../../../../../components/MainWrapper';
import DeleteRoom from './DeleteTicket';
import RoomItem from './TicketItem';
import {IconHome} from '../../../../../../assets/icon/Icon';
import TicketItem from './TicketItem';
import usePagination from '../../../../../../hooks/usePagination';
import {
  getListTicket,
  getMyListTicket,
} from '../../../../../../Model/api/apiTour';
import {useQuery} from '@tanstack/react-query';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import DeleteTicket from './DeleteTicket';
import {formatDate} from '../../../../../../utils/format';

export default function TicketManageScreen() {
  const {t} = useLanguage();

  const params = useRoute().params;
  const {setOptions, navigate} = useNavigation();
  const bottomSheetRef = useRef();
  const [dataItemAccom, setDataItemAccom] = useState(null);
  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('tour_ticket_management'),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigate('PostNewsScreen')}>
          <IconHome style={{width: scale(20)}} />
        </TouchableOpacity>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const {data, isLoading, isError} = useQuery({
    queryKey: ['list', 'ticket', params?.id],
    queryFn: () =>
      getListTicket({
        id_tour: params?.id,
        date_end: formatDate(new Date(), {addDays: 1}),
        date_start: formatDate(),
      }),
  });

  const numColumns = Math.ceil(data?.data?.rows?.length / 4);
  return (
    <MainWrapper
      refreshControl
      styleContent={{
        marginVertical: scale(20),
      }}>
      <>
        <CustomButton
          text={t('add_more_ticket')}
          style={{width: '50%', marginLeft: scale(20), marginBottom: scale(10)}}
          onPress={() => navigate('AddTicketScreen', {...params})}
        />
        {numColumns ? (
          <>
            <ScrollView
              contentContainerStyle={{
                gap: scale(10),
              }}>
              <FlatList
                // key={`accommodation/my-list-1-${page}_${data?.data?.count}_${numColumns}`}
                data={data?.data?.rows}
                keyExtractor={(item, index) => `$key_${item.id}-${index}`}
                contentContainerStyle={{
                  paddingHorizontal: scale(20),
                  rowGap: scale(10),
                  paddingVertical: scale(10),
                }}
                renderItem={(item, index) => {
                  return (
                    <TicketItem
                      key={`key_${item?.id}-${index}`}
                      data={item}
                      onPressMore={() => {
                        setDataItemAccom(item);
                        bottomSheetRef.current.open();
                      }}
                      onEdit={() => {
                        navigate('TicketTypeManageScreen', {
                          ...item,
                          update: true,
                        });
                      }}
                      onManage={() => {
                        navigate('TicketTypeManageScreen', {
                          ...item,
                          update: true,
                        });
                      }}
                    />
                  );
                }}
              />
            </ScrollView>
          </>
        ) : (
          <EmptyData
            styleWrapper={{
              marginTop: '40%',
              justifyContent: 'center',
            }}
          />
        )}
        <BottomSheet
          ref={bottomSheetRef}
          titleIndicator={t('notification')}
          snapPoints={['30%']}
          disableScroll
          styleContent={styles.bottomSheet}>
          <DeleteTicket
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

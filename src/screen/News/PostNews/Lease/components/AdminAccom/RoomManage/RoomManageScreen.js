import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useLayoutEffect, useRef, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {scale} from '../../../../../../../assets/constants';
import {CustomButton} from '../../../../../../../components';
import BottomSheet from '../../../../../../../components/BottomSheet';
import EmptyData from '../../../../../../../components/EmptyData';
import MainWrapper from '../../../../../../../components/MainWrapper';
import DeleteRoom from './DeleteRoom';
import RoomItem from './RoomItem';
import {IconHome} from '../../../../../../../assets/icon/Icon';

export default function RoomManageScreen() {
  const params = useRoute().params;
  const {setOptions, navigate} = useNavigation();
  const bottomSheetRef = useRef();
  const [dataItemAccom, setDataItemAccom] = useState(null);
  useLayoutEffect(() => {
    return setOptions({
      headerTitle: 'Quản lý phòng',
      headerRight: () => (
        <TouchableOpacity onPress={() => navigate('POST')}>
          <IconHome style={{width: scale(20)}} />
        </TouchableOpacity>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  const numColumns = Math.ceil(params?.rooms?.length / 4);

  return (
    <MainWrapper
      refreshControl
      styleContent={{
        marginVertical: scale(20),
      }}>
      <>
        <CustomButton
          text="Add more room"
          style={{width: '50%', marginLeft: scale(20), marginBottom: scale(10)}}
          onPress={() => navigate('AddRoomTypeScreen', {...params})}
        />
        {numColumns ? (
          <>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              alwaysBounceVertical={false}
              directionalLockEnabled={true}
              contentContainerStyle={{
                gap: scale(10),
              }}>
              <FlatList
                // key={`accommodation/my-list-1-${page}_${data?.data?.count}_${numColumns}`}
                data={params?.rooms}
                numColumns={numColumns}
                alwaysBounceVertical={false}
                directionalLockEnabled={true}
                keyExtractor={(item, index) => `$key_${item.id}-${index}`}
                columnWrapperStyle={
                  numColumns >= 2 && {
                    columnGap: scale(10),
                  }
                }
                contentContainerStyle={{
                  paddingHorizontal: scale(20),
                  rowGap: scale(10),
                }}
                renderItem={({item, index}) => (
                  <RoomItem
                    key={`key_${item?.id}-${index}`}
                    data={item}
                    onPressMore={() => {
                      setDataItemAccom(item);
                      bottomSheetRef.current.open();
                    }}
                    onEdit={() => {
                      navigate('AddRoomTypeScreen', {
                        ...item,
                        update: true,
                      });
                    }}
                  />
                )}
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
          titleIndicator={'Thao Tác'}
          snapPoints={['30%']}
          disableScroll
          styleContent={styles.bottomSheet}>
          <DeleteRoom
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
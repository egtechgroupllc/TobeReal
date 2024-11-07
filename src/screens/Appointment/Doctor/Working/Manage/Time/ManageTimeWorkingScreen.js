import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Button, CText, MainWrapper} from '~/components';
import {COLORS, images, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';
import CalendarWork from '../../components/CalendarWork';
import {useNavigation, useRoute} from '@react-navigation/native';
import {formatDate} from '~/utils/format';
import EmptyData from '~/components/EmptyData';
import {IconX} from '@tabler/icons-react-native';
import AppointmentHeader from '~/components/AppointmentHeader/AppointmentHeader';
import {IconHome, IconLock} from '~/assets/icon/Icon';
import {useLanguage} from '~/hooks/useLanguage';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {
  getDateWorking,
  getDateWorkingDoctor,
  postDeleteDateWorking,
} from '~/api/doctor';
import {showMess} from '~/assets/constants/Helper';
import TimeItem from './TimeItem';

const fake = [
  {
    time: '10:10 - 10:10',
    type: 'OFFLINE',
    status: 'CLOSED',
  },
  {
    time: '10:10 - 10:10',
    type: 'OFFLINE',
    status: 'AVAILABLE',
  },
  {
    time: '10:10 - 10:10',
    type: 'OFFLINE',
    status: 'FULL',
  },
  {
    time: '10:10 - 10:10',
    type: 'OFFLINE',
  },
  {
    time: '10:10 - 10:10',
    type: 'OFFLINE',
  },
  {
    time: '10:10 - 10:10',
    type: 'OFFLINE',
  },
  {
    time: '10:10 - 10:10',
    type: 'OFFLINE',
  },
  {
    time: '10:10 - 10:10',
    type: 'OFFLINE',
  },
  {
    time: '10:10 - 10:10',
    type: 'OFFLINE',
  },
  {
    time: '10:10 - 10:10',
    type: 'OFFLINE',
  },
  {
    time: '10:10 - 10:10',
    type: 'OFFLINE',
  },
  {
    time: '10:10 - 10:10',
    type: 'OFFLINE',
  },
  {
    time: '10:10 - 10:10',
    type: 'OFFLINE',
  },
  {
    time: '10:10 - 10:10',
    type: 'OFFLINE',
  },
  {
    time: '10:10 - 10:10',
    type: 'OFFLINE',
  },
  {
    time: '10:10 - 10:10',
    type: 'OFFLINE',
  },
  {
    time: '10:10 - 10:10',
    type: 'OFFLINE',
  },
  {
    time: '10:10 - 10:10',
    type: 'OFFLINE',
  },
  {
    time: '10:10 - 10:10',
    type: 'OFFLINE',
  },
];
export default function ManageTimeWorkingScreen() {
  const params = useRoute().params;
  const minDate = formatDate(new Date());
  const {navigate} = useNavigation();
  const [selectedStartDate, setSelectedStartDate] = useState(minDate);
  const {t} = useLanguage();
  const queryClient = useQueryClient();
  const onDateChange = date => {
    setSelectedStartDate(date?.date_start);
  };
  const {data, isLoading} = useQuery({
    queryKey: [
      ...getDateWorkingDoctor.queryKey,
      {
        date_start: selectedStartDate,
        date_end: selectedStartDate,
        type: '',
        status: '',
      },
    ],
    queryFn: () =>
      getDateWorkingDoctor({
        date_start: selectedStartDate,
        date_end: selectedStartDate,
        type: '',
        status: '',
      }),
  });

  return (
    <MainWrapper
      sourceImage={images.backgroundHome}
      scrollEnabled={false}
      headerTitle={t('manage_time_working')}
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
      <View
        style={{
          paddingHorizontal: scale(15),
          rowGap: scale(20),
        }}>
        <CalendarWork
          onDateChange={onDateChange}
          startDate={selectedStartDate}
          isOneDay
        />
        <CText
          style={{fontSize: SIZES.medium, color: COLORS.White}}
          textType="semiBold">
          {t('time_markers_created')}:
        </CText>
        <View
          style={{
            height: scale(200),
            borderWidth: scale(1),
            borderColor: COLORS.input,
            borderRadius: scale(10),
          }}>
          <FlatList
            data={data?.data?.rows || (isLoading && [1, 2, 3, 5])}
            numColumns={3}
            columnWrapperStyle={{
              columnGap: scale(10),
              paddingTop: scale(5),
              paddingHorizontal: scale(10),
            }}
            //   scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => `key-list-question${index}`}
            ListEmptyComponent={<EmptyData />}
            contentContainerStyle={{
              rowGap: scale(10),
              paddingTop: scale(10),
            }}
            renderItem={({item, index}) => {
              return (
                <TimeItem
                  data={item}
                  selectedStartDate={selectedStartDate}
                  isLoading={isLoading}
                />
              );
            }}
          />
        </View>
        <Button
          title={t('create_new_time_markers')}
          linearGradientProps={{
            colors: COLORS.linearButton,
          }}
          onPress={() =>
            navigate('ManageTimeMakerScreen', {date: selectedStartDate})
          }
        />
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  cancel: {
    alignSelf: 'flex-end',
    position: 'absolute',
    overflow: 'hidden',
    top: scale(-7),
    zIndex: 99,
    right: scale(-7),
    backgroundColor: COLORS.White,
    borderRadius: scale(99),
  },
});

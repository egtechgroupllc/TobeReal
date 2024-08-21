import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useLanguage} from '../../../../../../../hooks/useLanguage';
import {IconHome} from '../../../../../../../assets/icon/Icon';
import {scale} from '../../../../../../../assets/constants';
import {
  CalendarRange,
  CustomButton,
  MainWrapper,
} from '../../../../../../../components';
import {formatDate} from '../../../../../../../utils/format';
import {COLORS} from '~/assets/constants';
import {differenceInDays} from 'date-fns';
import {getListTicketDate} from '../../../../../../../Model/api/apiTour';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {
  getListPriceRoomDate,
  postPriceRoomDate,
} from '../../../../../../../Model/api/apiAccom';
import CalendarPriceManage from '../../../../../../../components/CalendarPriceManage';
import {useCountry} from '../../../../../../../hooks/useCountry';
import ContentInput from './ContentInput';
import {useForm} from 'react-hook-form';
import {ScrollView} from 'react-native-gesture-handler';
import {showMess} from '../../../../../../../assets/constants/Helper';
const formatDateStyle = (date, add = 0) => {
  const newDate = formatDate(
    date,
    add && {
      addDays: add,
    },
  );

  return newDate;
};
export default function RoomPriceManageScreen() {
  const {setOptions, goBack, navigate} = useNavigation();
  const params = useRoute().params;
  const {t} = useLanguage();
  const minDate = formatDateStyle(minDate);
  const dateEnd = formatDateStyle(minDate, 1);
  const [status, setStatus] = useState('ACTIVE');
  const queryClient = useQueryClient();

  const {currency} = useCountry();

  const [selectedStartDate, setSelectedStartDate] = useState(
    params?.dataFilter?.date?.date_start || minDate,
  );
  const [selectedEndDate, setSelectedEndDate] = useState(
    params?.dataFilter?.date?.date_end || dateEnd,
  );
  const listSelectTime = useMemo(() => {
    return [...Array(30)].map((_, index) => {
      return {text: `${index + 1} ${t('night')}`, value: index + 1};
    });
  }, []);
  const [selected, setSelected] = useState(listSelectTime[0]);
  const postPriceRoomDateMu = useMutation({
    mutationFn: postPriceRoomDate,
  });
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: {errors},
  } = useForm();
  useEffect(() => {
    if (selectedEndDate) {
      const difference = differenceInDays(selectedEndDate, selectedStartDate);

      if (difference) {
        const result = listSelectTime.find(time => time.value === difference);
        setSelected(result);
      }
    }
  }, [selectedEndDate]);
  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('room_price_manage'),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigate('POST', {screen: 'PostNewsScreen'})}>
          <IconHome style={{width: scale(20)}} />
        </TouchableOpacity>
      ),
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const onDateChange = date => {
    setSelectedEndDate(date?.date_end);
    setSelectedStartDate(date?.date_start);
  };
  const {data, isLoading} = useQuery({
    queryKey: [
      'accommodation',
      'detail',
      'list-room-date',
      {
        id_room: params?.id,
        date_start: selectedStartDate,
        date_end: selectedEndDate ? selectedEndDate : selectedStartDate,
      },
    ],
    queryFn: () =>
      getListPriceRoomDate({
        id_room: params?.id,
        date_start: selectedStartDate,
        date_end: selectedEndDate ? selectedEndDate : selectedStartDate,
      }),
  });
  const exData = useCallback(
    room => {
      return data?.data?.data?.rows?.map(item => {
        return {
          id: item?.id,
          number_room: room.number_room,
          price: room.price,
          currency_id: currency?.id,
          status: status,
        };
      });
    },
    [data?.data?.data?.rows, status],
  );

  const handleManagePrice = value => {
    const arrSelectCalendar = exData(value);
    postPriceRoomDateMu.mutate(
      {room_dates: arrSelectCalendar},
      {
        onSuccess: dataInside => {
          showMess(
            t(dataInside?.message),
            dataInside?.status ? 'success' : 'error',
          );
          if (dataInside?.status) {
            queryClient.invalidateQueries([
              'accommodation',
              'detail',
              'list-room-date',
            ]);
          }
        },
        onError: err => {
          console.log(err);
          showMess(t('an_error_occured'), 'error');
        },
      },
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{padding: scale(15), rowGap: scale(20)}}>
        <CalendarPriceManage
          id={params?.id}
          minDate={minDate}
          startDate={selectedStartDate}
          endDate={selectedEndDate}
          onDateChange={onDateChange}
        />
        <ContentInput
          control={control}
          setValue={setValue}
          watch={watch}
          errors={errors}
          onSort={value => setStatus(value)}
        />
        <CustomButton
          text={t('confirm')}
          onPress={handleSubmit(handleManagePrice)}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});

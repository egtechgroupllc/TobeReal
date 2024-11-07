import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, images} from '~/assets/constants';
import {Button, MainWrapper} from '~/components';
import {scale} from '~/utils/scale';
import {formatDate} from '~/utils/format';
import {useNavigation, useRoute} from '@react-navigation/native';
import {colors} from '@styles';
import AppointmentHeader from '~/components/AppointmentHeader/AppointmentHeader';
import CalendarWork from '../../components/CalendarWork';
import {IconHome} from '~/assets/icon/Icon';
import {useForm} from 'react-hook-form';
import {postCreateDateWorking} from '~/api/doctor';
import {useMutation} from '@tanstack/react-query';
import {showMess} from '~/assets/constants/Helper';
import {useLanguage} from '~/hooks/useLanguage';

export default function ManageDateWorkingScreen() {
  const {navigate, goBack} = useNavigation();
  const {setValue, watch} = useForm();
  const params = useRoute().params;
  const minDate = formatDate(new Date()); // Today
  let dateEnd = formatDate(minDate, {addDays: 1});
  const [selectedStartDate, setSelectedStartDate] = useState(minDate);
  const [selectedEndDate, setSelectedEndDate] = useState(dateEnd);
  const {t} = useLanguage();
  const onDateChange = date => {
    setSelectedEndDate(date?.date_end);
    setSelectedStartDate(date?.date_start);
  };
  const getDatesInRange = (startDate, endDate) => {
    const dateArray = [];
    let currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
      dateArray.push(formatDate(currentDate)); // Giả sử formatDate định dạng đúng theo yêu cầu "YYYY-MM-DD"
      currentDate.setDate(currentDate.getDate() + 1); // Tăng ngày hiện tại lên 1
    }

    return dateArray;
  };
  const dateList = getDatesInRange(selectedStartDate, selectedEndDate);
  const createDateWorkingMutation = useMutation({
    mutationFn: postCreateDateWorking,
  });

  const handleCreateDate = value => {
    createDateWorkingMutation.mutate(
      {dates: dateList},
      {
        onSuccess: dataInside => {
          showMess(
            t(dataInside?.message),
            dataInside?.error ? 'error' : 'success',
          );
          if (!dataInside?.error) {
            goBack();
          }
        },
        onError: err => {
          if (err.response) {
            showMess(err?.response?.data?.message, 'error');
          }
        },
      },
    );
  };

  return (
    <MainWrapper
      sourceImage={images.backgroundHome}
      headerTitle={'Manage Date Working'}
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
          paddingHorizontal: scale(20),
          rowGap: scale(50),
        }}>
        <CalendarWork
          onDateChange={onDateChange}
          startDate={selectedStartDate}
          endDate={selectedEndDate}
          bgSelect={params?.create ? COLORS.cyan : COLORS.DeepOrange}
          bgRangeSelect={params?.create ? COLORS.input : COLORS.OrangeSemi}
        />
        <Button
          title={
            params?.create ? 'Create new calendar' : 'Remove selected calendar'
          }
          linearGradientProps={{
            colors: params?.create ? COLORS.linearButton : ['orange', 'orange'],
          }}
          onPress={handleCreateDate}
        />
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});

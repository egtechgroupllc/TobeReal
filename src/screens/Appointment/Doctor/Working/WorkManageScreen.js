import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {images} from '~/assets/constants';
import {MainWrapper} from '~/components';
import ButtonTabValidate from '~/components/ChoosePhoto/ButtonTabValidate';
import {useLanguage} from '~/hooks/useLanguage';
import {scale} from '~/utils/scale';
import PriceExamination from './components/PriceExamination';
import TimeWorking from './components/TimeWorking';
import ModalQrCodeScanner from './Manage/components/ModalQRCodeScanner';
import {postVerifyQRCode} from '~/api/appointment';
import {useMutation} from '@tanstack/react-query';
import {showMess} from '~/assets/constants/Helper';

export default function WorkManageScreen() {
  const {t} = useLanguage();
  const [open, setOpen] = useState(false);
  const {navigate} = useNavigation();
  const scanQRMutation = useMutation({
    mutationFn: postVerifyQRCode,
  });
  const handleScanQR = value => {
    scanQRMutation.mutate(
      {id: value?.id, code: value?.code},
      {
        onSuccess: dataInside => {
          if (!dataInside?.error) {
            navigate('NoBottomTab', {
              screen: 'CheckinSuccessScreen',
              params: dataInside?.data,
            });
            setOpen(false);
            return;
          }
          showMess(t(dataInside?.message), 'error');
        },
        onError: err => {
          console.log(err);
          showMess(t('an_error_occured'), 'error');
        },
      },
    );
  };
  return (
    <MainWrapper
      sourceImage={images.backgroundHome}
      headerTitle={t('work_manage')}
      optionsHeader={{
        headerTitleStyle: {
          textAlign: 'left',
        },
      }}>
      <View
        style={{
          width: '90%',
          rowGap: scale(10),
          alignSelf: 'center',
        }}>
        {/* <DateWorking /> */}
        <TimeWorking />
        <PriceExamination />
        <ButtonTabValidate
          title={t('qr_scan')}
          onPress={() => {
            setOpen(true);
          }}
          // onPress={() => {
          //   navigate('CheckinSuccessScreen');
          // }}
        />
        <ModalQrCodeScanner
          open={!!open}
          onScanner={value => handleScanQR(value)}
          onClose={() => setOpen(false)}
        />
        <ButtonTabValidate
          title={t('voucher_manage')}
          onPress={() => {
            navigate('ManageVoucherDoctorScreen');
          }}
        />
        {/* <ExamScheduleInfo /> */}
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});

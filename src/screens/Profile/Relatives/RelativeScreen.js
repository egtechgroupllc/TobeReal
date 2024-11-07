import React, {useRef, useState} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, images, SIZES} from '~/assets/constants';
import {Button, CText, MainWrapper} from '~/components';
import BottomSheet from '~/components/BottomSheet';
import CheckBox from '~/components/CheckBox';
import EmptyData from '~/components/EmptyData';
import {useLanguage} from '~/hooks/useLanguage';
import {scale} from '~/utils/scale';
import ContentInfo from './components/ContentInfo';
import FamilyHeader from './components/FamilyHeader';
import RelativeItem from './components/RelativeItem';
import {useNavigation} from '@react-navigation/native';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {getListRelationship, postDeleteRelative} from '~/api/relative';
import {showMess} from '~/assets/constants/Helper';

const fake = [
  {name: 'me', date_create: '20/08/2024'},
  {name: 'father', date_create: '20/06/2024'},
];
export default function RelativeScreen() {
  const bottomSheetRef = useRef();
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  const queryClient = useQueryClient();
  const [dataRelative, setDataRelative] = useState();
  const dataPro = queryClient.getQueryData(['user', 'get-list-profile'])?.data;
  const {data, isLoading, error} = useQuery({
    queryKey: [...getListRelationship.queryKey],
    queryFn: () => getListRelationship(),
  });
  const deleteRelativeMutation = useMutation({
    mutationFn: postDeleteRelative,
  });

  const handleDeleteRelative = value => {
    deleteRelativeMutation.mutate(
      {id: dataRelative?.id},
      {
        onSuccess: dataInside => {
          showMess(
            t(dataInside?.message),
            dataInside?.error ? 'error' : 'success',
          );
          if (!dataInside?.error) {
            queryClient.invalidateQueries([...getListRelationship.queryKey]);
            navigate('AccountAndSecurityScreen');
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
  const handleAlert = item => {
    Alert.alert(
      t('are_you_sure_want_to_delete_relative'),
      t('relative_cant_be_restored'),
      [
        {
          text: t('cancel'),
          // onPress: () => Alert.alert('Cancel Pressed'),
          style: 'cancel',
        },
        {text: t('ok'), onPress: () => handleDeleteRelative()},
      ],
    );
  };
  return (
    <MainWrapper
      scrollEnabled={false}
      sourceImage={images.backgroundHome}
      optionsHeader={{
        headerStyle: {
          paddingHorizontal: 0,
        },
        headerComponent: () => {
          return (
            <FamilyHeader onPressFamily={() => bottomSheetRef.current.open()} />
          );
        },
      }}>
      <View
        style={{flex: 1, paddingTop: scale(20), paddingHorizontal: scale(5)}}>
        <ContentInfo
          data={dataPro}
          dataRelative={dataRelative}
          onPressDelete={() => handleAlert()}
        />
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={['40%', '60%']}
        titleIndicator={t('relatives')}
        styleContent={{
          paddingHorizontal: scale(16),
          rowGap: scale(16),
        }}>
        <RelativeItem
          data={data?.data?.booking_orders}
          onPress={() => {
            bottomSheetRef.current.close();
            navigate('AddRelativeProfileScreen');
          }}
          onPressSelect={value => {
            setDataRelative(value);
            bottomSheetRef.current.close();
          }}
        />
      </BottomSheet>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});

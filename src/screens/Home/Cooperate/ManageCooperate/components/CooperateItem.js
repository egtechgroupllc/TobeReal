import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {CText} from '~/components';
import {COLORS, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';
import EmptyData from '~/components/EmptyData';
import {useNavigation} from '@react-navigation/native';
import {IconEmail, IconLocation, IconPhone} from '~/assets/icon/Icon';
import {showMess} from '~/assets/constants/Helper';
import {useLanguage} from '~/hooks/useLanguage';

export default function CooperateItem({data}) {
  const {navigate} = useNavigation();
  const {t} = useLanguage();
  const TextRow = ({title, icon}) => {
    return (
      <View style={{flexDirection: 'row', columnGap: scale(10)}}>
        {icon}
        <CText style={{color: COLORS.White}}>{title}</CText>
      </View>
    );
  };
  const handleNavigate = item => {
    if (item?.status === 'APPROVED') {
      navigate('ManageFacilityScreen');
    } else if (item?.status === 'WAITING') {
      showMess(t('this_facility_is_not_approved_yet'), 'error');
    } else {
      showMess(
        t(
          'this_facility_have_been_rejected_please_contact_admin_or_register_again',
        ),
        'error',
      );
    }
  };
  return (
    <View style={{rowGap: scale(20), flex: 1}}>
      <View style={{rowGap: scale(10)}}>
        <CText
          style={{
            color: COLORS.White,
            fontSize: SIZES.medium,
          }}>
          {t('list_cooperate_registed')}
        </CText>
        <View
          style={{
            backgroundColor: COLORS.White,
            width: '100%',
            height: scale(1),
          }}
        />
      </View>
      <FlatList
        data={data}
        keyExtractor={(_, index) => `key-list-history${index}`}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyData />}
        contentContainerStyle={{rowGap: scale(10)}}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => handleNavigate(item)}
              style={{
                backgroundColor: COLORS.input,
                borderRadius: scale(10),
                padding: scale(10),
                rowGap: scale(10),
                minHeight: scale(100),
              }}>
              <View
                style={{
                  backgroundColor:
                    item?.status === 'APPROVED'
                      ? COLORS.green
                      : item?.status === 'WAITING'
                      ? COLORS.yellow
                      : COLORS.error,
                  padding: scale(5),
                  borderRadius: scale(5),
                  alignItems: 'center',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                }}>
                <CText style={{color: COLORS.White}}>{item?.status}</CText>
              </View>
              <CText
                style={{
                  color: COLORS.White,
                  fontSize: SIZES.xMedium,
                  width: '80%',
                }}
                textType="bold">
                {item?.medical_facility_name}
              </CText>
              <TextRow
                title={item?.phone}
                icon={<IconPhone fill={COLORS.White} width={15} height={15} />}
              />
              <TextRow
                title={item?.email}
                icon={<IconEmail fill={COLORS.White} width={15} height={15} />}
              />
              <TextRow
                title={item?.address}
                icon={
                  <IconLocation fill={COLORS.White} width={15} height={15} />
                }
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

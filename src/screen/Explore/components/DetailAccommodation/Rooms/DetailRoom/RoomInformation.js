import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  IconAcreage,
  IconPeople,
  IconRoom,
} from '../../../../../../assets/icon/Icon';
import ItemUtil from '../components/ItemUtil';
import {formatPrice} from '../../../../../../utils/format';
import {scale} from '../../../../../../assets/constants';
import {useLanguage} from '../../../../../../hooks/useLanguage';

export default function RoomInformation({data, isFilterChildren}) {
  const {t} = useLanguage();

  return (
    <>
      <ItemUtil
        Icon={IconRoom}
        value={data?.room_bed_type?.name}
        title={t('bed_type')}
        styleWrapper={{
          width: '45%',
        }}
      />
      <ItemUtil
        title={t('room_size')}
        Icon={IconAcreage}
        value={formatPrice(data.size_width * data.size_length, {
          unit: 'm²',
        })}
        styleIcon={{
          width: scale(20),
          height: scale(20),
          color: '#000',
        }}
        styleWrapper={{
          width: '45%',
        }}
      />
      <ItemUtil
        Icon={IconPeople}
        value={
          !isFilterChildren
            ? `${t('max')} ${data?.max_occupancy} ${t('adult').toLowerCase()}`
            : `${t('max')} ${data?.max_occupancy} ${t(
                'children',
              ).toLowerCase()}, ${data?.max_child_occupancy} children`
        }
        title={t('guest')}
        styleWrapper={{
          width: '60%',
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({});

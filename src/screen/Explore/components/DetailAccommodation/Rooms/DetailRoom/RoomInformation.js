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

export default function RoomInformation({data}) {
  return (
    <>
      <ItemUtil
        Icon={IconPeople}
        value={`${2} khách`}
        title={'Khách'}
        styleWrapper={{
          width: '45%',
        }}
      />
      <ItemUtil
        Icon={IconRoom}
        value={data?.room_bed_type?.name}
        title={'Loại giường'}
        styleWrapper={{
          width: '45%',
        }}
      />
      <ItemUtil
        title={'Kích thước phòng'}
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
    </>
  );
}

const styles = StyleSheet.create({});

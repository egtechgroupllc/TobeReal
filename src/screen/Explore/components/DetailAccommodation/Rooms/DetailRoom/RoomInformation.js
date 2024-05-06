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

export default function RoomInformation({data, isFilterChildren}) {
  return (
    <>
      <ItemUtil
        Icon={IconRoom}
        value={data?.room_bed_type?.name}
        title={'Bed type'}
        styleWrapper={{
          width: '45%',
        }}
      />
      <ItemUtil
        title={'Room size'}
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
            ? `Max ${data?.max_occupancy} adult(s)`
            : `Max ${data?.max_occupancy} adult(s), ${data?.max_child_occupancy} children`
        }
        title={'Guest'}
        styleWrapper={{
          width: '60%',
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({});

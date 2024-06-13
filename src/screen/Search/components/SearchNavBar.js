/* eslint-disable react-hooks/exhaustive-deps */
import {differenceInDays} from 'date-fns';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {COLORS, SIZES, images, scale} from '../../../assets/constants';
import {IconLocation, IconPeople} from '../../../assets/icon/Icon';
import {CustomButton} from '../../../components';
import BottomSheet from '../../../components/BottomSheet';
import BottomSheetListSelect from '../../../components/BottomSheetListSelect';
import CustomImage from '../../../components/CustomImage';
import CustomText from '../../../components/CustomText';
import {useLanguage} from '../../../hooks/useLanguage';
import {formatDate} from '../../../utils/format';
import CounterOccupancy from '../../components/CounterOccupancy';
import BoxItem from './SearchNavBar/BoxItem';
import HeaderSearchNavBar from './SearchNavBar/HeaderSearchNavBar';
import ItemNumNight from './SearchNavBar/ItemNumNight';
import SelectDateCheckIn from './SearchNavBar/SelectDateCheckIn';
import {useNavigation} from '@react-navigation/native';

export default function SearchNavBar({data, onEmpale}) {
  const {t} = useLanguage();
  const {navigate} = useNavigation();

  const bottomSheetRef = useRef();
  const bottomSheetChildRef = useRef();

  const [isOpenOccupancy, setIsOpenOccupancy] = useState(false);
  const [occupancy, setOccupancy] = useState({
    numRoom: data?.numRoom,
    numAdult: data?.numAdult,
  });
  const [dateCheckIn, setDateCheckIn] = useState(data?.date?.date_start);
  const [destination, setDestination] = useState(data?.province);

  const [numNight, setNumNight] = useState(() => {
    const num =
      differenceInDays(data?.date?.date_end, data?.date?.date_start) || 1;

    return {
      text: `${num} ${t('night')}`,
      value: num,
    };
  });
  useEffect(() => {
    data?.province && setDestination(data?.province);
  }, [data?.province?.name]);
  useEffect(() => {
    isOpenOccupancy && bottomSheetChildRef.current.openChild();
  }, [isOpenOccupancy]);

  const listDays = useMemo(() => {
    return [...Array(30)].map((_, index) => {
      return {
        text: `${index + 1} ${t('night')}`,
        value: index + 1,
      };
    });
  }, []);

  const handleChangeOpen = useCallback(() => {
    bottomSheetRef.current.open();
  }, []);

  const handleSearch = useCallback(() => {
    onEmpale &&
      onEmpale({
        occupancy,
        destination,
        date_start: dateCheckIn,
        date_end: formatDate(dateCheckIn, {addDays: numNight?.value}),
      });
    bottomSheetRef.current.close();
  }, [onEmpale, JSON.stringify(occupancy), numNight, dateCheckIn, destination]);

  return (
    <View
      style={{
        width: '100%',
      }}>
      <HeaderSearchNavBar data={data} onPress={handleChangeOpen} />

      <BottomSheet
        ref={bottomSheetRef}
        refChild={bottomSheetChildRef}
        index={1}
        snapPoints={['50%']}
        snapPointsChild={['70%']}
        titleIndicator={t('Điều chỉnh')}
        disableScroll
        styleContent={{
          paddingHorizontal: scale(16),
          rowGap: scale(16),
        }}
        onDismissChild={evt => {
          setIsOpenOccupancy(false);
        }}
        handleChildBottom={() =>
          isOpenOccupancy ? (
            <Occupancy
              data={{...data, ...occupancy}}
              onApply={value => {
                setOccupancy(value);
                bottomSheetChildRef.current.closeChild();
              }}
            />
          ) : (
            <BottomSheetListSelect
              value={numNight}
              data={listDays}
              ComponentItem={({item, index, isActive}) => {
                return (
                  <ItemNumNight
                    data={{...data, dateCheckIn}}
                    key={index}
                    index={index}
                    isActive={isActive}
                    item={item}
                  />
                );
              }}
              onChange={date => {
                setNumNight(date);
                bottomSheetChildRef.current.closeChild();
              }}
            />
          )
        }>
        <BoxItem
          onPress={() => {
            bottomSheetRef.current.close();
            setTimeout(() => {
              navigate('HomeSearchAccommodScreen', {
                onGoBack: dataBack => {
                  setDestination(dataBack);
                  bottomSheetRef.current.open();
                },
              });
            }, 0);
          }}
          icon={<IconLocation />}
          label={'Điểm đến'}
          name={destination?.name || t('near_me')}
        />

        <SelectDateCheckIn data={data?.date} onConfirm={setDateCheckIn} />

        <View>
          <BoxItem
            onPress={() => bottomSheetChildRef.current.openChild()}
            icon={<CustomImage source={images.lease} style={styles.icon} />}
            label={'Số đêm nghỉ'}
            name={`Trả phòng: ${formatDate(
              dateCheckIn || data?.date?.date_start,
              {
                addDays: numNight?.value,
                dateStyle: 'EEEE, yyyy-MM-dd',
              },
            )}`}
            style={{
              flex: 0.5,
            }}
          />
          <CustomText textType="medium" style={styles.numNight}>
            {`${numNight.value} ${t('night')}`}
          </CustomText>
        </View>

        <BoxItem
          onPress={() => {
            setIsOpenOccupancy(true);
          }}
          icon={<IconPeople width={scale(20)} height={scale(20)} />}
          label={'Số lượng khách & phòng'}
          name={`${occupancy?.numAdult} ${t('guest')}, ${
            occupancy?.numRoom
          } ${t('room')}`}
        />

        <CustomButton
          onPress={handleSearch}
          text={t('search')}
          styleWrapper={{
            marginTop: 'auto',
          }}
        />
      </BottomSheet>
    </View>
  );
}

const Occupancy = ({data, onApply}) => {
  const {t} = useLanguage();

  const [occupancy, setOccupancy] = useState({
    numRoom: data?.numRoom,
    numAdult: data?.numAdult,
  });

  return (
    <View style={{flex: 1, paddingHorizontal: scale(20)}}>
      <CounterOccupancy value={occupancy} onChange={setOccupancy} />

      <CustomButton
        onPress={() => onApply(occupancy)}
        text={t('apply')}
        styleWrapper={{
          marginTop: 'auto',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  numNight: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
    position: 'absolute',
    right: scale(10),
    top: '10%',
    zIndex: -1,
  },
  icon: {
    width: scale(20),
    height: scale(20),
  },
});

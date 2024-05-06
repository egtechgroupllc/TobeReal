import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {StyleSheet} from 'react-native';
import {COLORS, SHADOW, WIDTH, scale} from '../../../../assets/constants';
import MainWrapper from '../../../../components/MainWrapper';
import {useLanguage} from '../../../../hooks/useLanguage';
import EmptyData from '../../../../components/EmptyData';

const dataWaiting = [
  {
    id: 1,
    title: 'Hotel Marine',
    code: '15532131',
    price: 500,
    location: 'Indonesia',
  },
  {
    id: 2,
    title: 'Hotel Marine',
    code: '15532131',
    price: 500,
    location: 'Indonesia',
  },
  {
    id: 3,
    title: 'Hotel Marine',
    code: '15532131',
    price: 500,
    location: 'Indonesia',
  },
  {
    id: 4,
    title: 'Hotel Marine',
    code: '15532131',
    price: 500,
    location: 'Indonesia',
  },
  {
    id: 5,
    title: 'Hotel Marine',
    code: '15532131',
    price: 500,
    location: 'Indonesia',
  },
];

export default function NotifyScreen() {
  const {navigate} = useNavigation();
  const {t} = useLanguage();
  const {setOptions} = useNavigation();
  useLayoutEffect(() => {
    return setOptions({
      headerTitle: 'Notification',
      headerTitleStyle: {
        textAlign: 'center',
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <MainWrapper scrollEnabled={false}>
      <EmptyData />
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
    width: WIDTH.widthContain,
    // marginVertical: scale(20),
    marginTop: scale(10),
    alignItems: 'center',
  },
  containTab: {
    height: scale(56),
    alignItems: 'center',
    borderRadius: scale(12),
    backgroundColor: '#e6e7e8',
    padding: scale(4),
  },
  tabActive: {
    color: COLORS.primary,
    borderRadius: scale(12),
    borderTopLeftRadius: scale(12),
    borderTopRightRadius: scale(12),
  },
  img: {
    width: scale(240),
    height: scale(240),
  },
  btnAdd: {
    position: 'absolute',
    bottom: scale(-70),
    right: 0,
    zIndex: 999,
    width: scale(150),
  },
  box: {
    backgroundColor: '#FDFDFD',
    minHeight: scale(100),
    borderRadius: scale(10),
    borderWidth: scale(1),
    borderColor: '#DADADA4D',
    paddingHorizontal: scale(10),
    paddingVertical: scale(10),
    rowGap: scale(5),
    ...SHADOW,
  },
  code: {
    borderWidth: scale(1),
    height: scale(30),
    borderRadius: scale(6),
    borderColor: '#0000001A',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
    alignItems: 'center',
    marginTop: scale(5),
  },
  line: {
    backgroundColor: COLORS.grey,
    height: scale(1),
    width: '100%',
  },
});

import {StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import MainWrapper from '../../../components/MainWrapper';
import CustomText from '../../../components/CustomText';
import {COLORS, SHADOW, SIZES, scale} from '../../../assets/constants';
import CustomImage from '../../../components/CustomImage';
import {formatDateTime, formatPrice} from '../../../utils/format';
import {IconCopy, IconSupporter} from '../../../assets/icon/Icon';
import Clipboard from '@react-native-clipboard/clipboard';
import {showMess} from '../../../assets/constants/Helper';
import {CustomButton} from '../../../components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function DetailHistoryDeposit({route}) {
  const {setOptions, navigate} = useNavigation();
  const {bottom} = useSafeAreaInsets();
  const data = route.params;

  useLayoutEffect(() => {
    setOptions({
      headerTitle: 'Transaction detail',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MainWrapper
        styleContent={{
          paddingHorizontal: scale(10),
          marginTop: '2%',
          rowGap: scale(12),
        }}>
        <View style={styles.boxTop}>
          <View
            style={{
              rowGap: scale(16),
              padding: scale(10),
            }}>
            <View style={styles.header}>
              <CustomImage
                source={data?.method_deposit_item?.method_deposit?.logo_url}
                resizeMode="contain"
                style={{
                  width: scale(30),
                  height: scale(30),
                }}
              />
              <View
                style={{
                  rowGap: scale(4),
                  flex: 1,
                }}>
                <CustomText
                  size={SIZES.xMedium}
                  color={COLORS.textSub}
                  style={{
                    textTransform: 'uppercase',
                  }}>
                  {data?.nameBank} - {data?.method_deposit_item?.owner}
                </CustomText>
                <CustomText
                  textType="bold"
                  size={SIZES.large}
                  color={COLORS.text}>
                  +{formatPrice(data?.amount, {currency: data?.currency_code})}
                </CustomText>
              </View>
            </View>

            <Item
              name={'Status'}
              value={data?.status}
              backgroundColor={
                data.status === 'SUCCESS'
                  ? '#42b00b'
                  : data.status === 'PENDING'
                  ? COLORS.primary
                  : '#e03c31'
              }
              color={COLORS.white}
            />

            <Item
              name={'Time'}
              value={formatDateTime(data?.createdAt, {
                dateStyle: 'HH:mm - dd/MM/yyyy',
              })}
            />
            <View style={{overflow: 'hidden', width: '100%'}}>
              <View style={styles.line} />
            </View>

            <Item name={'Transfer id'} value={data?.code} isCopy />
            <Item
              name={'Card account'}
              value={data?.method_deposit_item?.method_deposit?.name}
            />
            <Item name={'Overheads'} value="Free" />
          </View>

          <View style={styles.boxSupport}>
            <IconSupporter width={scale(20)} height={scale(20)} />
            <CustomText
              size={SIZES.xMedium}
              color={'#0194f3'}
              textType="medium">
              Contact support
            </CustomText>
          </View>
        </View>

        <View style={styles.boxTop}>
          <View
            style={{
              rowGap: scale(16),
              padding: scale(10),
            }}>
            <Item
              name={'Card number/account'}
              value={data?.method_deposit_item?.code}
              isCopy
            />

            <Item
              name={'Bank'}
              value={
                data?.method_deposit_item?.bank_name?.split('-')?.[1] ||
                data?.method_deposit_item?.method_deposit?.name
              }
            />
            <Item name={'Receiver'} value={data?.method_deposit_item?.owner} />
            <Item
              name={'Amount of money'}
              value={`+${formatPrice(data?.amount, {
                currency: data?.currency_code,
              })}`}
            />
          </View>
        </View>
      </MainWrapper>

      <View
        style={{
          paddingBottom: bottom + scale(10),
          ...styles.footer,
        }}>
        <CustomButton
          onPress={() => navigate('ListMethodBankScreen')}
          text="Top up"
          style={{
            width: '70%',
          }}
        />
      </View>
    </>
  );
}
const Item = ({name, value, color, backgroundColor, isCopy}) => {
  const handleCopy = () => {
    Clipboard.setString(value);
    showMess('Copy successfully');
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        columnGap: scale(10),
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <CustomText size={SIZES.xMedium} color={COLORS.textSub}>
        {name}:
      </CustomText>
      {backgroundColor ? (
        <View
          style={{
            backgroundColor: backgroundColor,
            borderRadius: scale(9),
            paddingHorizontal: scale(10),
            paddingVertical: scale(2),
          }}>
          <CustomText textType="semiBold" color={color}>
            {value}
          </CustomText>
        </View>
      ) : (
        <CustomText
          onPress={isCopy && handleCopy}
          textType="semiBold"
          size={SIZES.xMedium}
          color={color}
          style={{flex: 1, textAlign: 'right'}}>
          {value}{' '}
          {isCopy && (
            <IconCopy
              width={scale(14)}
              height={scale(14)}
              fill={COLORS.primary}
            />
          )}
        </CustomText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  boxTop: {
    backgroundColor: COLORS.white,
    borderRadius: scale(10),
    rowGap: scale(10),
    // overflow: 'hidden',
    ...SHADOW,
  },
  header: {
    borderRadius: scale(10),
    padding: scale(10),
    flexDirection: 'row',
    columnGap: scale(10),
    paddingHorizontal: scale(15),
    borderWidth: 1,
    flex: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  line: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#ccc',
    margin: -1,
    marginBottom: 0,
    overflow: 'hidden',
  },

  boxSupport: {
    backgroundColor: '#0194f330',
    alignItems: 'center',
    paddingVertical: scale(8),
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: scale(10),
    borderBottomRightRadius: scale(10),
    borderBottomLeftRadius: scale(10),
  },
  footer: {
    paddingTop: scale(10),
    alignItems: 'center',
    backgroundColor: COLORS.white,
    ...SHADOW,
    shadowOffset: {
      width: 0,
      height: -1,
    },
  },
});

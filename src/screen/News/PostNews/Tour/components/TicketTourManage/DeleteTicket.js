import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {deleteRoom} from '../../../../../../../Model/api/apiAccom';
import {showMess} from '../../../../../../assets/constants/Helper';
import {IconError, IconTrash} from '../../../../../../assets/icon/Icon';
import {CustomButton} from '../../../../../../components';
import CustomText from '../../../../../../components/CustomText';
import {deleteTicket} from '../../../../../../Model/api/apiTour';
import {COLORS, SIZES, scale} from '../../../../../../assets/constants';
export default function DeleteTicket({data, onSuccess, onCancel}) {
  const [confirm, setConfirm] = useState(true);
  const {navigate} = useNavigation();
  const queryClient = useQueryClient();
  const deleteTicketMu = useMutation({
    mutationFn: deleteTicket,
  });

  const handDelete = value => {
    deleteTicketMu.mutate(
      {
        id_room: data?.id,
      },
      {
        onSuccess: dataInside => {
          showMess(
            dataInside.message,
            dataInside?.status ? 'success' : 'error',
          );

          if (dataInside?.status) {
            onSuccess();
            navigate('LeaseScreen');
            // queryClient.invalidateQueries(['accommodation', 'my-list']);
          }
        },

        onError: err => {
          console.log({err});
        },
      },
    );
  };

  return (
    <View
      style={{
        flex: 1,
        columnGap: scale(10),
        width: '100%',
      }}>
      {!confirm ? (
        <CustomButton
          text="Xoá tin"
          onPress={() => {
            setConfirm(true);
          }}
          iconLeft={IconTrash}
          activeOpacity={0.7}
          styleWrapper={{
            marginTop: 'auto',
          }}
          style={{
            borderColor: COLORS.error,
          }}
          styleIcon={{
            width: scale(24),
            height: scale(24),
          }}
          styleText={{
            color: COLORS.error,
          }}
          outline
        />
      ) : (
        <View
          style={{
            rowGap: scale(8),
          }}>
          <View style={styles.boxConfirm}>
            <View style={styles.row}>
              <CustomText
                textType="medium"
                style={{
                  fontSize: SIZES.xMedium,
                }}>
                Tour id{' '}
              </CustomText>
              <CustomText textType="medium" style={styles.textRight}>
                {data?.id}
              </CustomText>
            </View>
            {/* <View
              style={{
                ...styles.row,
                borderTopWidth: 1.5,
                borderTopColor: '#fff',
              }}>
              <CustomText
                textType="medium"
                style={{
                  fontSize: SIZES.xMedium,
                }}>
                Hoàn tiền{' '}
              </CustomText>
              <CustomText textType="medium" style={styles.textRight}>
                {formatPrice(1221332)}
                <CustomText
                  textType="medium"
                  style={{...styles.textRight, color: COLORS.textSub}}>
                  {' '}
                  VND
                </CustomText>
              </CustomText>
            </View> */}
          </View>

          <View style={styles.warning}>
            <IconError />
            <CustomText
              textType="semiBold"
              style={{fontSize: SIZES.xMedium, color: '#dfab04'}}>
              Note:{' '}
              <CustomText style={{fontSize: SIZES.xMedium}}>
                Deleted ticket cannot be restored
              </CustomText>
            </CustomText>
          </View>

          <View style={styles.footer}>
            <CustomButton
              text="Cancel"
              buttonType="normal"
              onPress={onCancel}
              style={{
                borderColor: COLORS.grey,
                minWidth: scale(80),
              }}
              styleText={{
                color: COLORS.black,
              }}
              outline
            />
            <CustomButton
              buttonType="normal"
              text="Delete"
              onPress={handDelete}
              style={{
                backgroundColor: COLORS.error,
                minWidth: scale(80),
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  boxConfirm: {
    backgroundColor: '#f5f5f5',
    borderRadius: scale(6),
    paddingHorizontal: scale(14),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: scale(20),
    alignItems: 'center',
    paddingVertical: scale(14),
  },
  textRight: {
    fontSize: SIZES.xMedium,
    flex: 1,
    textAlign: 'right',
  },
  warning: {
    backgroundColor: '#f0b90b50',
    padding: scale(10),
    borderRadius: scale(6),
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(8),
  },
  footer: {
    flexDirection: 'row',
    columnGap: scale(10),
    justifyContent: 'flex-end',
    marginTop: scale(16),
  },
});
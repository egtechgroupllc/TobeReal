import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import {COLORS, FONTS, SIZES, WIDTH, scale} from '../../../../assets/constants';
import {
  IconFurniture,
  IconMarker,
  IconRoom,
  IconTag,
} from '../../../../assets/icon/Icon';
import {CustomButton, CustomInput} from '../../../../components';
import ChooseCalendar from './ChooseCalendar';
import ChooseOccupancy from './ChooseOccupancy';
import OptionAccommodation from './OptionAccommodation';
import {useForm} from 'react-hook-form';
import {requireField} from '../../../../utils/validate';
import CheckBox from '../../../../components/CheckBox';
import {useLanguage} from '../../../../hooks/useLanguage';
import EncryptedStorage from 'react-native-encrypted-storage';
import {showMess} from '../../../../assets/constants/Helper';

export default function FindContentTour({rental, dataFind}) {
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  const params = useRoute().params;
  const {control, setValue, unregister, handleSubmit, watch} = useForm({
    defaultValues: {
      near_me: true,
    },
  });
  useEffect(() => {
    if (params === 'near_me' || !params) {
      setValue('near_me', true);
    } else {
      unregister(['near_me']);
    }
  }, [params]);
  const handleSearch = value => {
    navigate('NoBottomTab', {
      screen: 'ListTourSearchScreen',
      params: {
        ...dataFind,
        ...value,
      },
    });
  };

  return (
    <View style={styles.findContent}>
      <View style={{rowGap: scale(10)}}>
        <CustomInput
          // control={control}
          // name="location"
          editable={false}
          value={t('around_me')}
          iconLeft={IconMarker}
          styleIcon={styles.icon}
          style={{width: '90%'}}
          //   onPress={() =>
          //     navigate('NoBottomTab', {
          //       screen: 'HomeSearchAccommodScreen',
          //     })
          //   }
        />

        <ChooseCalendar
          isOneDay
          rental={rental}
          onDate={value => {
            setValue('date', value);
          }}
        />

        <CustomButton
          onPress={handleSubmit(handleSearch)}
          // onPress={() => showMess(t('comming_soon'), 'error')}
          buttonType="medium"
          text={t('find_recommend_tour')}
          styleText={{
            color: COLORS.white,
            textType: 'bold',
            textTransform: 'uppercase',
          }}
          styleWrapper={{alignSelf: 'center'}}
          style={{
            width: '92%',
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  findContent: {
    alignItems: 'center',
    rowGap: scale(10),
  },
  optionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginLeft: '4%',
  },
  boxIcon: {
    paddingHorizontal: scale(10),
    minWidth: scale(48),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    minHeight: scale(36),
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: scale(20),
    height: scale(20),
  },

  question: {
    backgroundColor: COLORS.primary,
    width: scale(16),
    height: scale(16),
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 0,
  },
});

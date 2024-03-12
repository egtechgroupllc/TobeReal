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

export default function FindContent({isBuy, rental}) {
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  const params = useRoute().params;

  const {control, setValue, handleSubmit} = useForm();

  useEffect(() => {
    params && setValue('location', params);
  }, [params]);

  const handleSearch = () => {
    navigate('NoBottomTab', {
      screen: 'ListAccommodationSearchScreen',
    });
  };

  return (
    <View style={styles.findContent}>
      <View
        style={{
          paddingHorizontal: scale(16),
          rowGap: scale(10),
        }}>
        <CustomInput
          control={control}
          rules={requireField('Vui long them')}
          name="location"
          defaultValue={t('around_me')}
          iconLeft={IconMarker}
          styleIcon={styles.icon}
          onPress={() =>
            navigate('NoBottomTab', {
              screen: 'HomeSearchAccommodScreen',
            })
          }
        />
        {!isBuy && (
          <>
            <ChooseCalendar rental={rental} />

            {rental === t('daily') && <ChooseOccupancy />}
          </>
        )}
      </View>
      <View style={styles.optionBox}>
        <View style={styles.boxIcon}>
          <IconRoom />
        </View>
        <OptionAccommodation
          outline
          multiSelect
          isSelectAll
          styleContent={{
            flex: 1,
            columnGap: scale(8),
            paddingHorizontal: scale(12),
          }}
          data={[
            {
              text: 'All',
            },
            {
              text: t('studio'),
            },
            {
              text: '1BR',
            },
            {
              text: '2BR',
            },
            {
              text: '3BR+',
            },
          ]}
        />
      </View>

      <View style={styles.optionBox}>
        <View style={styles.boxIcon}>
          <IconFurniture />
        </View>
        <OptionAccommodation
          outline
          scrollEnabled
          styleContent={{
            flex: 1,
            columnGap: scale(8),
          }}
          data={[
            {
              text: t('all'),
            },
            {
              text: t('full_furnished'),
            },
            {
              text: t('unfurnished'),
            },
          ]}
        />
      </View>

      {isBuy && (
        <View style={styles.optionBox}>
          <View style={styles.boxIcon}>
            <IconTag />
          </View>
          <OptionAccommodation
            outline
            multiSelect
            isSelectAll
            styleContent={{
              flex: 1,
              columnGap: scale(8),
            }}
            data={[
              {
                text: t('all'),
              },
              {
                text: t('fixed_price'),
              },
              {
                text: t('negotiable'),
              },
            ]}
          />
        </View>
      )}

      <View
        style={{
          flexDirection: 'row',
          columnGap: scale(6),
          marginVertical: scale(6),
        }}>
        <CheckBox text={t('im_flexible')} />
        <CustomButton
          style={styles.question}
          text="?"
          styleText={{
            color: COLORS.white,
            textType: 'bold',
          }}
        />
      </View>

      <CustomButton
        onPress={handleSubmit(handleSearch)}
        buttonType="medium"
        text={t('Find_Accommodation')}
        styleText={{
          color: COLORS.white,
          textType: 'bold',
          textTransform: 'uppercase',
        }}
        style={{
          width: '92%',
        }}
      />
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
    marginLeft: '4%',
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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, FONTS, SIZES, scale} from '../../../../assets/constants';
import {
  IconCalendar,
  IconFurniture,
  IconMarker,
  IconRoom,
} from '../../../../assets/icon/Icon';
import {CustomButton, CustomInput} from '../../../../components';
import OptionAccommodation from './OptionAccommodation';
import CustomText from '../../../../components/CustomText';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export default function FindContent() {
  return (
    <View style={styles.findContent}>
      <CustomInput
        placeholder="City, building, area of landmark"
        styleWrapper={{width: '92%'}}
        iconLeft={IconMarker}
        styleIcon={{
          width: scale(20),
          height: scale(20),
        }}
      />

      <CustomInput
        defaultValue="05 Jan 2024 - 04 Feb 2024"
        styleWrapper={{width: '92%'}}
        iconLeft={IconCalendar}
        styleIcon={{
          width: scale(20),
          height: scale(20),
        }}
      />

      <View style={styles.optionBox}>
        <View style={styles.boxIcon}>
          <IconRoom />
        </View>
        <OptionAccommodation
          outline
          styleWrapper={{
            flex: 1,
            columnGap: scale(8),
            paddingHorizontal: scale(12),
          }}
          data={[
            {
              text: 'All',
            },
            {
              text: 'Studio',
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
          styleWrapper={{
            flex: 1,
            columnGap: scale(8),
          }}
          data={[
            {
              text: 'All',
            },
            {
              text: 'Full Furnished',
            },
            {
              text: 'Unfurnished',
            },
          ]}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          columnGap: scale(6),
          marginVertical: scale(6),
        }}>
        <BouncyCheckbox
          size={scale(16)}
          fillColor={COLORS.primary}
          text="I am flexible with dates"
          textStyle={styles.textCheckbox}
          innerIconStyle={{borderWidth: 2, borderRadius: 4}}
          iconStyle={{borderRadius: 4}}
        />
        <CustomButton
          styleWrapper={styles.question}
          text="?"
          styleText={{
            color: COLORS.white,
            textType: 'bold',
          }}
        />
      </View>

      <CustomButton
        buttonType="medium"
        text="Find Accommodation"
        styleText={{
          color: COLORS.white,
          textType: 'bold',
          textTransform: 'uppercase',
        }}
        styleWrapper={{
          width: '92%',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  findContent: {
    alignItems: 'center',
    rowGap: scale(8),
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
  textCheckbox: {
    textDecorationLine: 'none',
    fontFamily: FONTS.medium,
    color: COLORS.text,
    fontSize: SIZES.small,
    marginLeft: scale(-6),
  },
  question: {
    backgroundColor: COLORS.primary,
    width: scale(16),
    aspectRatio: 1,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/* eslint-disable react-native/no-inline-styles */
import {useNavigation, useRoute} from '@react-navigation/native';
import * as React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import StepIndicator from 'react-native-step-indicator';

import {useLanguage} from '~/hooks/useLanguage';
import {CText} from '~/components';
import {scale} from '~/utils/scale';
import {IconHome} from '~/assets/icon/Icon';
import {COLORS, SIZES} from '~/assets/constants';
import ContentStep1 from './components/ContentStep1';
import ContentStep2 from './components/ContentStep2';

const stepCount = 2;
const firstIndicatorStyles = {
  stepIndicatorSize: scale(20),
  currentStepIndicatorSize: scale(30),
  separatorStrokeWidth: 1,
  currentStepStrokeWidth: 3,
  stepIndicatorLabelFontSize: SIZES.small,
  currentStepIndicatorLabelFontSize: SIZES.small,
  stepStrokeCurrentColor: COLORS.cyan,
};

export default function PaymentProductScreen() {
  const data = useRoute().params;
  const [quantity, setQuantity] = React.useState();
  const {setOptions, navigate} = useNavigation();
  const {t} = useLanguage();
  const [currentPage, setCurrentPage] = React.useState(0);

  const renderLabel = ({position, label, currentPosition}) => {
    return (
      <CText
        textType="medium"
        style={
          position === currentPosition
            ? styles.stepLabelSelected
            : styles.stepLabel
        }>
        {label}
      </CText>
    );
  };

  const StepComponent = pageNum => {
    switch (pageNum) {
      case 0: {
        return (
          <ContentStep1
            onPress={() => setCurrentPage(pageNum + 1)}
            data={data}
            onChangeQuantity={value => setQuantity(value)}
            dataContact
          />
        );
      }
      case 1: {
        return (
          <ContentStep2
            quantitySelect={quantity}
            // onPress={() => setCurrentPage(pageNum + 1)}
            data={data}
          />
        );
      }

      default: {
        break;
      }
    }
  };
  React.useLayoutEffect(() => {
    return setOptions({
      headerTitleComponent: () => (
        <View style={{width: scale(250)}}>
          <StepIndicator
            customStyles={firstIndicatorStyles}
            currentPosition={currentPage}
            labels={[t('reservation'), t('pay')]}
            stepCount={stepCount}
            renderLabel={renderLabel}
            onPress={position =>
              currentPage > 0 &&
              position < stepCount - 1 &&
              setCurrentPage(position)
            }
          />
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigate('BottomTab')}>
          <IconHome style={{width: scale(20)}} />
        </TouchableOpacity>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);
  return <View style={styles.stepIndicator}>{StepComponent(currentPage)}</View>;
}

const styles = StyleSheet.create({
  stepIndicator: {
    // marginVertical: scale(15),
    flex: 1,
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepLabel: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: COLORS.White,
  },
  stepLabelSelected: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: COLORS.cyan,
  },
});

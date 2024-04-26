/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import {SIZES, scale} from '../../../../assets/constants';
import CustomText from '../../../../components/CustomText';
import Confirm from './Confirm';
import ContentStep1 from './ContentStep1';
import ContentStep2 from './ContentStep2';

const stepCount = 2;
const firstIndicatorStyles = {
  stepIndicatorSize: scale(20),
  currentStepIndicatorSize: scale(30),
  separatorStrokeWidth: 1,
  currentStepStrokeWidth: 3,
  stepIndicatorLabelFontSize: SIZES.small,
  currentStepIndicatorLabelFontSize: SIZES.small,
};

export default function HorizontalStepIndicator({data}) {
  const {setOptions} = useNavigation();
  const [currentPage, setCurrentPage] = React.useState(0);

  const renderLabel = ({position, label, currentPosition}) => {
    return (
      <CustomText
        textType="medium"
        style={
          position === currentPosition
            ? styles.stepLabelSelected
            : styles.stepLabel
        }>
        {label}
      </CustomText>
    );
  };

  const StepComponent = pageNum => {
    switch (pageNum) {
      case 0: {
        return (
          <ContentStep1
            onPress={() => setCurrentPage(pageNum + 1)}
            data={data}
          />
        );
      }
      case 1: {
        return (
          <ContentStep2
            onPress={() => setCurrentPage(pageNum + 1)}
            data={data}
          />
        );
      }
      case 2: {
        return <Confirm onPress={() => {}} />;
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
            labels={['Reservations', 'Pay']}
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
    color: '#999',
  },
  stepLabelSelected: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: '#4aae4f',
  },
});

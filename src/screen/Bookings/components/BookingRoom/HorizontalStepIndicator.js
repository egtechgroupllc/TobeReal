/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import Content from './Content';
import MainWrapper from '../../../../components/MainWrapper';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SIZES, scale} from '../../../../assets/constants';
import Confirm from './Confirm';

const PAGES = ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5'];
const stepCount = 3;
const firstIndicatorStyles = {
  stepIndicatorSize: scale(20),
  currentStepIndicatorSize: scale(30),
  separatorStrokeWidth: 1,
  currentStepStrokeWidth: 3,
  separatorFinishedColor: '#4aae4f',
  separatorUnFinishedColor: '#a4d4a5',
  stepIndicatorFinishedColor: '#4aae4f',
  stepIndicatorUnFinishedColor: '#a4d4a5',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: SIZES.small,
  currentStepIndicatorLabelFontSize: SIZES.small,
  stepIndicatorLabelCurrentColor: '#000000',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  labelColor: '#666666',
  labelSize: SIZES.small,
  currentStepLabelColor: '#4aae4f',
};

export default function HorizontalStepIndicator({data}) {
  const {setOptions} = useNavigation();
  const [currentPage, setCurrentPage] = React.useState(0);
  const renderLabel = ({position, label, currentPosition}) => {
    return (
      <Text
        style={
          position === currentPosition
            ? styles.stepLabelSelected
            : styles.stepLabel
        }>
        {label}
      </Text>
    );
  };

  const SteptComponent = currentPage => {
    switch (currentPage) {
      case 0: {
        return (
          <Content
            onPress={() => setCurrentPage(currentPage + 1)}
            data={data}
          />
        );
      }
      case 1: {
        return <Content onPress={() => setCurrentPage(currentPage + 1)} />;
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
        <View style={{width: 200}}>
          <StepIndicator
            customStyles={firstIndicatorStyles}
            currentPosition={currentPage}
            labels={['Đặt chỗ', 'Thanh toán', 'Xác nhận']}
            stepCount={stepCount}
            renderLabel={renderLabel}
            onPress={value =>
              currentPage > 0 && value < stepCount - 1 && setCurrentPage(value)
            }
          />
        </View>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);
  return (
    <View style={styles.container}>
      <View style={styles.stepIndicator}>{SteptComponent(currentPage)}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#ffffff',
  },
  stepIndicator: {
    marginVertical: scale(15),
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
    color: '#999999',
  },
  stepLabelSelected: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: '#4aae4f',
  },
});

/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import StepIndicator from 'react-native-step-indicator';

const PAGES = ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5'];

const firstIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 5,
  separatorFinishedColor: '#4aae4f',
  separatorUnFinishedColor: '#a4d4a5',
  stepIndicatorFinishedColor: '#4aae4f',
  stepIndicatorUnFinishedColor: '#a4d4a5',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#000000',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  labelColor: '#666666',
  labelSize: 12,
  currentStepLabelColor: '#4aae4f',
};

const getStepIndicatorIconConfig = ({position, stepStatus}) => {
  const iconConfig = {
    name: 'feed',
    color: stepStatus === 'finished' ? '#ffffff' : '#fe7013',
    size: 15,
  };
  switch (position) {
    case 0: {
      iconConfig.name = 'shopping-cart';
      break;
    }
    case 1: {
      iconConfig.name = 'location-on';
      break;
    }
    case 2: {
      iconConfig.name = 'assessment';
      break;
    }
    case 3: {
      iconConfig.name = 'payment';
      break;
    }
    case 4: {
      iconConfig.name = 'track-changes';
      break;
    }
    default: {
      break;
    }
  }
  return iconConfig;
};

export default function HorizontalStepIndicator() {
  const [currentPage, setCurrentPage] = React.useState(0);

  const onStepPress = position => {
    setCurrentPage(position);
  };

  const renderViewPagerPage = data => {
    return (
      <View key={data} style={styles.page}>
        <Text>{data}</Text>
      </View>
    );
  };

  const renderStepIndicator = params => (
    // <MaterialIcons {...getStepIndicatorIconConfig(params)} />
    <></>
  );

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

  return (
    <View style={styles.container}>
      <View style={styles.stepIndicator}>
        <StepIndicator
          customStyles={firstIndicatorStyles}
          currentPosition={currentPage}
          labels={['Đặt chỗ', 'Xem lại', 'Band', 'Membership', 'Dashboard']}
          renderLabel={renderLabel}
          onPress={onStepPress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  stepIndicator: {
    marginVertical: 50,
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

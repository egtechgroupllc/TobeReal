import {
  ImageBackground,
  LogBox,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {images, WIDTH} from '../../assets/constants';
import {IconLogoTobeCare} from '../../assets/icon/Icon';
import FirstContent from './components/FirstContent';
import {MainWrapper} from '../../components';
import {SecondContent} from './components/SecondContent';
import {scale} from '~/utils/scale';
import {ThirdContent} from './components/ThirdContent';
import Header from './components/Header';
import RenderHtml from 'react-native-render-html';
import {useHeaderHeight} from '@react-navigation/elements';

export default function HomeScreen() {
  const headerHeight = useHeaderHeight();
  LogBox.ignoreLogs([
    'VirtualizedLists should never be nested',
    'Could not find image',
  ]);
  return (
    <MainWrapper
      sourceImage={images.backgroundHome}
      styleWrapper={{paddingTop: headerHeight}}
      refreshControl
      optionsHeader={{
        headerComponent: () => {
          return <Header />;
        },
      }}>
      <View style={styles.container}>
        {/* <View style={{position: 'absolute'}}>
          <IconLogoTobeCare />
        </View> */}
        <FirstContent />
        {/* <BorderTopHeader /> */}
        {/* <SecondContent /> */}
        <ThirdContent />
      </View>
    </MainWrapper>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: scale(15),

    // backgroundColor: colors.BLUESEMI,
  },
  imageBG: {
    flex: 1,
    justifyContent: 'center',
  },
});

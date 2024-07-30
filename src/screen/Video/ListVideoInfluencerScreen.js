/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback} from 'react';
import {Animated, StyleSheet, View, useWindowDimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TabBar, TabView} from 'react-native-tab-view';
import {COLORS, SIZES, scale} from '../../assets/constants';
import ListVideoRENT from './components/ListVideoRENT';
import ListVideoBUY from './components/ListVideoBUY';
import ListVideoTOUR from './components/ListVideoTOUR';
const listVideo = [
  {
    id: 4,
    src: 'http://192.168.0.197:3000/videos/users/video_short/be92d9a9-1eb9-4ce0-979f-cb4004b62ee4.MP4',
    username: 'Jimmy',
    quantityHeart: 276,
    quantityComment: 11,
    description:
      'A nice boutique hotel conveniently located near the busy Piccadilly Circus and the trendy Carnaby street (practically just next door). ',
    price: 500,
    location: 'United Kingdom',
    rental: 'night',
  },
];

// const Tab = createBottomTabNavigator();
// export default function ListVideoInfluencerScreen() {
//   const params = useRoute().params;

//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: {
//           backgroundColor: '#000',
//           borderTopWidth: 0,
//         },
//       }}>
//       <Tab.Screen
//         name="ListVideoInfluencer"
//         component={ListVideoInfluencer}
//         initialParams={params}
//       />
//     </Tab.Navigator>
//   );
// }
const renderScene = ({route, jumpTo, isFocused}) => {
  switch (route.key) {
    case 'first':
      return <ListVideoRENT isFocused={isFocused} />;
    case 'second':
      return <ListVideoBUY isFocused={isFocused} />;
    case 'third':
      return <ListVideoTOUR isFocused={isFocused} />;
    default:
      return null;
  }
};

export default function ListVideoInfluencerScreen() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'RENT'},
    {key: 'second', title: 'BUY'},
    {key: 'third', title: 'TOUR'},
  ]);
  const {top} = useSafeAreaInsets();
  const av = new Animated.Value(0);
  av.addListener(() => {
    return;
  });
  const renderSceneWrapper = useCallback(
    ({route}) => {
      return renderScene({
        route,
        jumpTo: setIndex,
        isFocused: route.key === routes[index].key,
      });
    },
    [index],
  );
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      {/* <TouchableOpacity
        activeOpacity={0.7}
        onPress={goBack}
        style={{...styles.goBack, top: insets.top}}>
        <IconGoBack fill={'#fff'} />
      </TouchableOpacity> */}
      <TabView
        navigationState={{index, routes}}
        renderScene={renderSceneWrapper}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        style={styles.tabView}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={styles.underline}
            style={[styles.tabBar, {top: top}]}
            activeColor={COLORS.primary}
            inactiveColor={COLORS.greyLight}
            labelStyle={styles.textSelect}
            pressColor={COLORS.grey + 40}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  goBack: {
    position: 'absolute',
    zIndex: 9,
    padding: scale(6),
    backgroundColor: '#00000050',
    borderRadius: scale(10),
    left: scale(10),
  },
  favouriteHeart: {
    width: scale(100),
    minHeight: scale(100),
    transform: [
      {
        scale: 2.5,
      },
    ],
  },
  underline: {
    backgroundColor: COLORS.primary,
  },
  tabBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  textSelect: {
    fontSize: SIZES.medium,
    fontWeight: '500',
    color: COLORS.white,
  },
  tabView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10, // Higher zIndex to ensure it is above other elements
  },
});

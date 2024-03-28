import {StyleSheet} from 'react-native';
import {COLORS, scale} from '../../assets/constants';

const transparent = 'transparent';
const styles = StyleSheet.create({
  activityIndicator: {},
  background: {
    // flex: 1,
    backgroundColor: '#00000090',
    minHeight: scale(100),
    minWidth: scale(100),
    maxWidth: scale(140),
    borderRadius: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(10),
    rowGap: scale(10),
  },
  container: {
    backgroundColor: transparent,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {},
  textContent: {
    textAlign: 'center',
    color: COLORS.white,
  },
});

export default styles;

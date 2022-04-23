import { StyleSheet } from 'react-native';
import { getColor } from '@tailwind';

export const globalStyles = StyleSheet.create({
  shadow: {
    shadowColor: getColor('black'),
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  lwDarkThemeMainColor: {
    backgroundColor: '#151515',
  },
  lwDarkThemeSecondaryColor: {
    backgroundColor: '#343434',
  },
  lwDarkThemeAccentColor: {
    backgroundColor: '#DE2948',
  },
});

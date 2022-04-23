import { Dimensions } from 'react-native';

export const vw = (percentageWidth: number) =>
  Dimensions.get('window').width * (percentageWidth / 100);

export const screenWidth = Dimensions.get('screen').width;
export const screenHeight = Dimensions.get('screen').height;

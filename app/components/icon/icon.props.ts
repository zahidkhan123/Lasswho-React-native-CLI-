import { StyleProp, ViewStyle } from 'react-native';
import { IconTypes } from './icons';

export interface IconProps {
  /**
   * The fill color of the icon
   */

  fill?: string;

  /**
   * Width of the icon
   */

  width?: number;

  /**
   * Height of the icon
   */

  height?: number;

  /**
   * Style overrides for the icon image
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Style overrides for the icon container
   */

  containerStyle?: StyleProp<ViewStyle>;

  /**
   * The name of the icon
   */

  icon: IconTypes | string;
}

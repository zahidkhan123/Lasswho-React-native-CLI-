import { ReactNode } from 'react';
import { TextStyle, TextProps as TextProperties } from 'react-native';
import { TextPresets } from './text.presets';

export interface TextProps extends TextProperties {
  children?: ReactNode;
  text?: string;
  style?: TextStyle | TextStyle[];
  preset?: TextPresets;
}

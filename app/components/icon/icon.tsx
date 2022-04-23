import { getColor } from '@tailwind';
import * as React from 'react';
import { View, ViewStyle } from 'react-native';
import { IconProps } from './icon.props';
import { icons } from './icons';

const ROOT: ViewStyle = {};

export const Icon = (props: IconProps) => {
  const {
    style: styleOverride,
    width = 20,
    height = 20,
    icon,
    containerStyle,
    fill = getColor('gray-300'),
  } = props;

  if (!icons[icon]) {
    throw new Error(
      `${icons[icon]} does not exist in the icons map. Please check /icons/icons.ts file`,
    );
  }

  const Component = icons[icon];

  return (
    <View style={containerStyle}>
      <Component
        width={width}
        height={height}
        style={[ROOT, styleOverride]}
        fill={fill}
      />
    </View>
  );
};

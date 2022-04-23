import React from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';
import { Text } from '@components';
import { tailwind } from '@tailwind';

interface Props {
  text?: string;
  textSize?: 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large'
  uppercase?: boolean;
  onPressHandle: () => void;
  color?: string;
  filled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const textClasses = [
  { 'size': 'extra-small', 'class': 'text-xs' },
  { 'size': 'small', 'class': 'text-sm' },
  { 'size': 'medium', 'class': 'text-md' },
  { 'size': 'large', 'class': 'text-lg' },
  { 'size': 'extra-large', 'class': 'text-xl' },
];

export const PillButton = ({
  text,
  textSize,
  uppercase = false,
  onPressHandle,
  color = 'lasswho-accent',
  filled = false,
  style,

}: Props) => {
  const bg = filled ? `bg-${color}` : '';

  const textClass = textClasses.find(text => {
    return text.size === textSize;
  })

  return (
    <Pressable
      onPress={onPressHandle}
      style={[
        tailwind(
          `flex self-center px-4 py-2 rounded-full m-2 justify-center border-2 border-${color} ${bg}`,
        ),
        style,
      ]}
    >
      <Text
        style={tailwind(
          `flex justify-center ${textClass?.class || 'text-xs'} tracking-widest text-white text-center ${uppercase ? 'uppercase' : ''}`,
        )}
      >
        {text}
      </Text>
    </Pressable>
  );
};

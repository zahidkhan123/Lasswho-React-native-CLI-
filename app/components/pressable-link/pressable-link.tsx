import React from 'react';
import { tailwind } from '@tailwind';
import { Text } from '@components';
import { GestureResponderEvent, Pressable } from 'react-native';

interface Props {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
}

export const PressableLink = ({ title, onPress }: Props) => {
  return (
    <Pressable onPress={onPress}>
      <Text style={tailwind('text-left text-xl text-white underline p-2 mb-4')}>
        {title}
      </Text>
    </Pressable>
  );
};

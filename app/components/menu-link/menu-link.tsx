import React, { ReactChild } from 'react';
import { getColor, tailwind } from '@tailwind';
import { Text } from '@components';
import { GestureResponderEvent, Pressable, View } from 'react-native';

interface Props {
  text: string;
  badgeCount: number
  onPress: (event: GestureResponderEvent) => void;
}

export const MenuLink = ({ text, badgeCount, onPress }: Props) => (
  <Pressable
    style={tailwind(
      'flex p-4 w-full items-center border-b border-lasswho-secondary ',
    )}
    onPress={onPress}
    android_ripple={{
      color: getColor('lasswho-accent'),
      borderless: true,
      radius: 5,
    }}
  >
    <View style={tailwind('flex-row')}>
      <Text style={tailwind('text-lg text-white text-center tracking-widest')}>
        {text}
      </Text>
      {
        badgeCount > 0 && (
          <View style={tailwind('bg-lasswho-green rounded-full mx-2 h-7 w-7')}>
            <Text style={tailwind('text-sm text-white text-center self-center mt-1')}>
              {badgeCount}
            </Text>
          </View>
        )
      }
    </View >
  </Pressable >
);

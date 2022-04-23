import React from 'react';
import { ViewImage } from 'react-native';
import { tailwind } from '@tailwind';
import { Text } from '@components';

interface Props {
  player: object;
}

export const PlayerHeader = ({ player, photo, name }: Props) => {
  return (
    <View style={tailwind('flex flex-row self-start mb-4')}>
      <Image
        source={photo}
        //player image
        style={tailwind('w-20 h-20 rounded-xl')}
      />
      <Text style={tailwind('mb-2 ml-2 text-lg text-gray-300 self-end')}>
        {name}
      </Text>
    </View>
  );
};

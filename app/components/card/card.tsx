import React from 'react';
import { View, Image } from 'react-native';
import { Text } from '@components';
import { tailwind } from '@tailwind';

interface Props {
  name: string;
  currencySymbol?: string;
  picture?: string;
  price?: number;
}

export const Card = ({ name, currencySymbol, picture, price }: Props) => {
  return (
    <View style={[tailwind('rounded-lg items-center p-2')]}>
      <View style={[tailwind('h-24 w-24')]}>
        <Image
          source={{ uri: picture }}
          style={[tailwind('h-full w-full'), { borderRadius: 20 }]}
        />
      </View>
      <Text
        ellipsizeMode={'tail'}
        numberOfLines={2}
        style={tailwind(
          'text-white text-sm font-semibold text-center h-10 w-20 mt-2',
        )}
      >
        {name}
      </Text>
      <Text style={tailwind('text-gray-500 text-sm font-semibold text-center')}>
        {currencySymbol}
        {price} / min
      </Text>
    </View>
  );
};

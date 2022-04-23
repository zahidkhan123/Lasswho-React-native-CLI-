import React from 'react';
import { View, Image } from 'react-native';
import { tailwind } from '@tailwind';
import { PillButton, Text } from '@components';

interface Props {
  player?: any;
  onBookHandler: () => void;
  onRemoveHandler: () => void;
}

export const FavouriteCard = ({
  player,
  onBookHandler,
  onRemoveHandler,
}: Props) => {
  return (
    <View
      style={[
        tailwind('flex flex-row items-start justify-evenly w-full mt-6 mx-1'),
      ]}
    >
      <View style={tailwind('flex flex-row self-start')}>
        <View style={tailwind('h-20 w-20')}>
          <Image
            source={{ uri: player.listing_image }}
            style={[tailwind('h-full w-full'), { borderRadius: 20 }]}
          />
        </View>
        <View style={tailwind('flex w-28 mx-4')}>
          <Text style={tailwind('text-white text-lg font-semibold text-left')}>
            {player.name}
          </Text>
          <Text style={tailwind('text-gray-300 font-semibold text-left')}>
            {player.currency_symbol}{player.price_min} / min
          </Text>
          <Text style={tailwind('text-gray-300 font-semibold text-left')}>
            {player.country_name}
          </Text>
        </View>
      </View>
      <View style={tailwind('flex')}>
        <PillButton
          key={player.id}
          text="BOOK CALL"
          filled          
          onPressHandle={onBookHandler}
        />
        <PillButton
          key={player.name}
          text="REMOVE"
          onPressHandle={onRemoveHandler}
        />
      </View>
    </View>
  );
};

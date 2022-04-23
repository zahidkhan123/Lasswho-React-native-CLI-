import React from 'react';
import { View, Image } from 'react-native';
import { tailwind, getColor } from '@tailwind';
import { Text, RatingStar } from '@components';
import { Speaker } from '@generated/graphql';

interface Props {
  speaker: any;
}


export const RatingsCard = ({ speaker, rating }: Props) => {
  return (
    <View
      style={[
        tailwind(
          'flex rounded-lg p-2 items-center justify-center mt-2',
        ),
      ]}>
      <View style={tailwind('flex flex-row self-start')}>
        <View style={[tailwind('h-20 w-20')]}>
          <Image
            source={{ uri: speaker.listing_image }}
            style={[tailwind('h-full w-full'), { borderRadius: 16 }]}
          />
        </View>
        <View style={tailwind('flex flex-col')}>
          <View style={tailwind('flex flex-row mt-2')}>
            <RatingStar rating={speaker.rating} size={16} />
          </View>
          <Text
            style={tailwind(
              'text-gray-200 text-left text-sm px-2 py-1',
            )}>
            From {speaker.speaker_name}
          </Text>
          <View style={tailwind('flex flex-row')}>
            <Text
              style={tailwind('flex-wrap w-4/5 text-gray-400 text-left text-xs px-2 mb-2')}>
              {speaker.text}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
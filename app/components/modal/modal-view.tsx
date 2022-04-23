import React, { useState } from 'react';
import { View, Pressable, GestureResponderEvent, Image } from 'react-native';
import { tailwind } from '@tailwind';
import { useQuery } from '@apollo/client';
import {
  PlayerCard,
  EngagementCard,
  ConfirmationCard,
  Calendar,
  Stepper,
  Text,
} from '@components';
import BackIcon from '../../assets/icons/arrow-left.svg';
import CrossIcon from '../../assets/icons/cross.svg';
import { GetSpeakerDocument, Speaker } from '@generated/graphql';
import { hasNotch } from '@utils/helpers';
import { BookingContextProvider } from '@context/booking-context';

interface Props {
  player: Speaker;
  onClose: (event: GestureResponderEvent) => void;
}

export const ModalView = ({ onClose, player }: Props) => {
  const [active, setActive] = useState(0);
  const { data, error, loading } = useQuery(GetSpeakerDocument, {
    variables: { id: player.id },
    fetchPolicy: 'cache-and-network',
  });

  if (!data) {
    return (
      <View>
        <Text style={tailwind('text-white m-20')}>No data found</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>{JSON.stringify(error)}</Text>
      </View>
    );
  }

  const inModalNavigation = (n: string) => {
    n === 'next' ? setActive(active + 1) : setActive((n) => n - 1);
  };

  const modalViews = [
    <View key={1} style={tailwind('h-full')}>
      <PlayerCard
        data={data.speaker}
        speaker={player}
        loading={loading}
        onSubmit={() => inModalNavigation('next')}
      />
    </View>,
    <View key={2} style={tailwind('h-full')}>
      <EngagementCard
        data={data.speaker}
        onSubmit={() => inModalNavigation('next')}
      />
    </View>,
    <View key={3} style={tailwind('h-full')}>
      <Calendar speaker={player} onSubmit={() => inModalNavigation('next')} />
    </View>,
    <View key={4} style={tailwind('h-full mb-20')}>
      <ConfirmationCard speaker={player} onFinishBooking={onClose} />
    </View>,
  ];

  return (
    <View style={tailwind('bg-lasswho-main h-full')}>
      {player.profile_image && (
        <View style={[tailwind('absolute w-full'), { height: 340 }]}>
          <Image
            source={{ uri: player.profile_image }}
            style={tailwind('w-full h-full')}
            resizeMode="cover"
          />

          <View
            style={tailwind(
              'rounded-full bg-black bg-opacity-60 mb-4 px-6 py-2 absolute bottom-8 self-center',
            )}
          >
            <Text style={tailwind('text-white text-2xl')}>
              {data.speaker?.name}
            </Text>
          </View>
        </View>
      )}

      {!!active && (
        <Pressable
          style={tailwind(
            `flex self-start absolute left-4 z-20 bg-black bg-opacity-60 rounded-full w-8 h-8 justify-center items-center ${hasNotch ? 'top-12' : 'top-6'
            }`,
          )}
          onPress={() => setActive((n) => n - 1)}
        >
          <BackIcon fill="white" height={24} width={24} />
        </Pressable>
      )}

      <Pressable
        style={tailwind(
          `flex self-end absolute right-4 z-20 bg-black bg-opacity-60 rounded-full w-8 h-8 justify-center items-center ${hasNotch ? 'top-12' : 'top-6'
          }`,
        )}
        onPress={onClose}
      >
        <CrossIcon fill="white" height={24} width={24} />
      </Pressable>

      <View style={tailwind(`flex-1 ${hasNotch ? 'pt-4' : '-mt-2'}`)}>
        <BookingContextProvider>
          <Stepper active={active} views={modalViews} />
        </BookingContextProvider>
      </View>
    </View>
  );
};

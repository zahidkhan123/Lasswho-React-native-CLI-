import React, { useContext, useState } from 'react';
import {
  View,
  Pressable,
  GestureResponderEvent,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { getColor, tailwind } from '@tailwind';
import { CallToActionButton, Icon, Text, IconButton } from '@components';
import {
  Speaker,
  Attribute,
  GetSpeakerDocument,
  AddSpeakerToFavouriteDocument,
  RemoveSpeakerFromFavouritesDocument,
} from '@generated/graphql';
import BookingContext from '@context/booking-context';
import { calculatePrice, formatPrice } from '@utils/price';
import { useMutation } from '@apollo/client';
import Toast from 'react-native-simple-toast';

interface Props {
  data: Speaker;
  speaker: Speaker;
  loading: boolean;
  onSubmit: (event: GestureResponderEvent) => void;
}

const callDurations = [15, 30, 45, 60, 120];

export const PlayerCard = ({ data, speaker, loading, onSubmit }: Props) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const { duration, setDuration } = useContext(BookingContext);
  const [addSpeakerToFavourite] = useMutation(AddSpeakerToFavouriteDocument, {
    update(cache, { data }) {
      const favouriteSpeaker = data?.addSpeakerToFavourites!;

      cache.writeQuery({
        query: GetSpeakerDocument,
        data: {
          speaker: {
            ...favouriteSpeaker,
            favourite: true,
          },
        },
      });
    },
    onCompleted() {
      toggleFavouriteToast(true);
    },
    onError({ message }) {
      toggleFavouriteToast(false, message);
    }
  });

  const [removeSpeakerFromFavourite] = useMutation(
    RemoveSpeakerFromFavouritesDocument,
    {
      update(cache, { data }) {
        const favouriteSpeaker = data?.removeSpeakerFromFavourites!;

        cache.writeQuery({
          query: GetSpeakerDocument,
          data: {
            speaker: {
              ...favouriteSpeaker,
              favourite: false,
            },
          },
        });
      },
      onCompleted() {
        toggleFavouriteToast(false);
      },
      onError({ message }) {
        toggleFavouriteToast(false, message);
      }
    },
  );

  const selectionHandler = (time: number) => {
    setIsDisabled(false);
    setDuration(time);
  };

  if (loading) {
    <ActivityIndicator size="large" color={getColor('lasswho-accent')} />;
  }

  const toggleFavouriteToast = (favourite: boolean, message?: string) => {
    let text = !favourite ? 'Speaker removed from favourites' : 'Speaker saved as favourite';

    if (message) {
      return Toast.show(message);
    }

    Toast.show(text);
  }

  const favouriteSpeakerToggle = () => {
    if (data.favourite) {
      removeSpeakerFromFavourite({
        variables: {
          speaker_id: Number(speaker.id),
        },
      });
    } else {
      addSpeakerToFavourite({
        variables: {
          speaker_id: Number(speaker.id),
        },
      });
    }
  };

  return (
    <>
      <View style={tailwind('absolute -top-11 self-center')}>
        <View style={tailwind('bg-lasswho-accent rounded-full px-8 py-2')}>
          <Text style={tailwind('font-bold text-lg text-white text-center')}>
            {data.currency_symbol} {speaker.price_min} / min
          </Text>
        </View>
      </View>
      <ScrollView style={tailwind('mt-8')}>
        <View>
          <View style={tailwind('flex mx-4')}>
            <View style={tailwind('mb-2 flex-row justify-between')}>
              <Text style={tailwind('text-xl font-bold text-white')}>
                {speaker.country_name}
              </Text>
              <View style={tailwind('flex-row')}>
                <IconButton
                  style={tailwind('top-1 relative mr-0 ml-0')}
                  icon={'starEmpty'}
                  onHandlePress={favouriteSpeakerToggle}
                  isSelected={!!data.favourite}
                />
              </View>
            </View>

            {data.bio ? (
              <View style={tailwind('mb-6')}>
                <Text style={tailwind('mb-2 text-xl text-white font-bold')}>Bio</Text>
                <Text style={tailwind('text-white')}>{data.bio}</Text>
              </View>
            ) : null}

            {data.skills ? (
              <View style={tailwind('mb-6')}>
                <Text style={tailwind('mb-2 text-xl text-white font-bold')}>Skills</Text>
                <View style={tailwind('flex-row')}>
                  <Text style={tailwind('mr-4 text-sm text-white')}>
                    {data.skills}
                  </Text>
                </View>
              </View>
            ) : null}

            {data.achievements ? (
              <View style={tailwind('mb-6')}>
                <Text style={tailwind('mb-2 text-xl text-white font-bold')}>Achievements</Text>
                <View style={tailwind('flex-row')}>
                  <Text style={tailwind('text-sm text-white')}>
                    {data.achievements}
                  </Text>
                </View>
              </View>
            ) : null}

            {data.attributes?.map((attribute: Attribute, index) => {
              return (
                <View key={index} style={tailwind('mb-6')}>
                  <Text style={tailwind('mb-2 text-xl text-white font-bold')}>
                    {attribute.name}
                  </Text>
                  {attribute.values?.length ? (
                    <Text style={tailwind('leading-6 text-white')}>
                      {attribute.values?.join(', ')}
                    </Text>
                  ) : null}
                </View>
              );
            })}

            <View style={tailwind('mt-8')}>
              <Text style={tailwind('text-xl text-gray-200 mb-2')}>
                Select your video call:
              </Text>

              <View style={tailwind('flex-row justify-around')}>
                {callDurations.map((time, index) => (
                  <VideoCallCard
                    isLast={callDurations.length === index + 1}
                    key={time}
                    price={formatPrice(
                      speaker.country_code!,
                      speaker.currency,
                      calculatePrice(time, data.price_min),
                      0,
                    )}
                    time={time}
                    onHandlePress={() => selectionHandler(time)}
                    selectedTime={duration}
                  />
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={tailwind('my-6 mx-4')}>
        <CallToActionButton
          text={'REQUEST VIDEO CHAT'}
          isDisabled={isDisabled}
          onPressHandler={onSubmit}
        />
      </View>
    </>
  );
};

const VideoCallCard = ({
  price,
  time,
  selectedTime,
  isLast,
  onHandlePress,
}: {
  price: string;
  time: number;
  selectedTime: number;
  isLast: boolean;
  onHandlePress: () => void;
}) => {
  const selectedButton = selectedTime === time;
  return (
    <View style={tailwind('flex-1')}>
      <Pressable
        style={tailwind(
          `${!isLast ? 'border-gray-200 border-r' : ''}  py-4 items-center`,
        )}
        onPress={onHandlePress}
      >
        <Icon
          icon={`clock${time}`}
          fill={selectedButton ? getColor('lasswho-green') : 'white'}
          containerStyle={tailwind('mb-4')}
        />
        <Text
          style={[
            tailwind(
              `text-xs ${selectedButton ? 'text-lasswho-green' : 'text-white'}`,
            ),
          ]}
        >
          {time} min
        </Text>
      </Pressable>
      <Text style={tailwind('text-white text-center text-xs mt-2')}>
        {price}
      </Text>
    </View>
  );
};

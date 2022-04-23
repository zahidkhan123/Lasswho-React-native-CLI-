import React, { useCallback, useState } from 'react';
import { View, ActivityIndicator, Alert, Modal } from 'react-native';
import { tailwind, getColor } from '@tailwind';
import { Screen, ModalView, Text, FavouriteCard } from '@components';
import { useQuery, useMutation } from '@apollo/client';
import {
  GetFavouriteSpeakersDocument,
  GetFavouriteSpeakersQuery,
  RemoveSpeakerFromFavouritesDocument,
  Speaker,
} from '@generated/graphql';
import { FlatList } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';

export const FavouritesScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [player, setPlayer] = useState<Speaker>();
  const { data, loading, refetch } = useQuery(GetFavouriteSpeakersDocument);
  const [removeSpeakerFromFavourite] = useMutation(
    RemoveSpeakerFromFavouritesDocument,
    {
      update(cache, { data }) {
        const removedSpeakerId = data?.removeSpeakerFromFavourites?.id;
        const allFavouriteSpeakers = cache.readQuery<GetFavouriteSpeakersQuery>(
          {
            query: GetFavouriteSpeakersDocument,
          },
        );

        cache.writeQuery({
          query: GetFavouriteSpeakersDocument,
          data: {
            favouriteSpeakers: allFavouriteSpeakers?.favouriteSpeakers?.filter(
              (speaker) => speaker?.id !== removedSpeakerId,
            ),
          },
        });
      },
    },
  );

  // TODO Investigate if / how we can remove this
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const removeFavouriteSpeaker = (id: number) => {
    removeSpeakerFromFavourite({
      variables: {
        speaker_id: Number(id),
      },
    });
  };

  const openModal = (player: Speaker) => {
    setModalVisible(true);
    setPlayer(player);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const showAlert = (id: number) => {
    Alert.alert(
      'Confirm remove',
      'Are you sure you want to remove this speaker?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => removeFavouriteSpeaker(id),
        },
      ],
    );
  };

  if (loading) {
    return (
      <View style={tailwind('flex-1 justify-center')}>
        <ActivityIndicator size="large" color={getColor('lasswho-accent')} />
      </View>
    );
  }

  return (
    <Screen
      style={tailwind('py-6 px-2')}
      preset="scroll"
      backgroundColor={getColor('lasswho-main')}
    >
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <ModalView onClose={closeModal} player={player} />
      </Modal>
      <View style={tailwind('flex items-center w-full')}>
        <Text
          style={tailwind(
            'text-center text-3xl text-gray-300 border-b border-gray-200 w-11/12 mb-10',
          )}
        >
          Favourite Speakers
        </Text>
      </View>

      <FlatList
        style={tailwind('w-full')}
        data={data?.favouriteSpeakers}
        renderItem={({ item }) => {
          return (
            <FavouriteCard
              player={item}
              onRemoveHandler={() => showAlert(item.id)}
              onBookHandler={() => {
                setPlayer(item);
                openModal(item);
              }}
            />
          );
        }}
      />
    </Screen>
  );
};

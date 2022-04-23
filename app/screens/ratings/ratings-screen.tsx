import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { tailwind, getColor } from '@tailwind';
import { Screen, Text, RatingsCard, RatingStar } from '@components';
import { FetchRatingsDocument } from '@generated/graphql';
import { useQuery } from '@apollo/client';

interface Props {}

const styles = StyleSheet.create({
  radialView: {
    width: '95%',
    height: '95%',
  },
});

export const RatingsScreen = (props: Props) => {
  const { data: ratingsData, loading } = useQuery(FetchRatingsDocument);

  return (
    <Screen
      style={tailwind('p-2')}
      preset="scroll"
      backgroundColor={getColor('lasswho-main')}
    >
      <View
        style={tailwind(
          'flex justify-evenly items-center border-b border-white',
        )}
      >
        <Text style={tailwind('text-center text-3xl text-gray-300 mb-2')}>
          Your Rating
        </Text>
        <RatingStar rating={ratingsData?.userRating?.rating} />
        <Text style={tailwind('text-center text-lg text-white p-2')}>
          {ratingsData?.userRating?.rating}
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={getColor('lasswho-accent')}
          style={tailwind('mt-12')}
        />
      ) : (
        <View>
          {ratingsData?.userRating?.list.map((speaker) => (
            <RatingsCard key={speaker.id} speaker={speaker} />
          ))}
        </View>
      )}
    </Screen>
  );
};

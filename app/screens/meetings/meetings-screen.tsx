import React, { useEffect } from 'react';
import { View, SectionList, ActivityIndicator } from 'react-native';
import { tailwind, getColor } from '@tailwind';
import { FlatList } from 'react-native-gesture-handler';
import { FetchMeetingsDocument } from '@generated/graphql';
import { useLazyQuery } from '@apollo/client';
import { Screen, Text, MeetingsCard } from '@components';
import * as storage from '@utils/storage';

export const MeetingsScreen = () => {
  const [getMeetings, { loading, data }] = useLazyQuery(FetchMeetingsDocument, {
    fetchPolicy: 'cache-and-network',
    onCompleted: () => {
      getUpcomingMeetingsAmount();
    },
    onError: ({ graphQLErrors }) => {
      if (graphQLErrors) {
        graphQLErrors.map((error) => {
          console.log(error);
        })
      }
    }
  });
  const getUpcomingMeetingsAmount = async () => {
    const meetingsCount = data?.meetings?.filter(
      (meeting) => !meeting.completed,
    ).length;
    console.log(`meetingsCount ${meetingsCount}`);
    if (meetingsCount) {
      await storage.saveString('upcomingMeetingsCount', meetingsCount.toString());
    }
  };

  useEffect(() => {
    getMeetings();
  }, [getMeetings]);

  const groupedDataByCompletionStatus =
    data?.meetings?.reduce((entries, entry) => {
      const completionState = !entry.completed ? 'Upcoming' : 'Completed';
      if (!entries[completionState]) {
        entries[completionState] = [entry];
      } else {
        entries[completionState].push(entry);
      }
      return entries;
    }, {}) || {};

  const sectionFormattedGroups = Object.entries(
    groupedDataByCompletionStatus,
  ).map((entry) => {
    const [completionState, entries] = entry;
    return { title: completionState, data: entries };
  });

  return (
    <Screen
      style={tailwind('p-6')}
      preset="scroll"
      backgroundColor={getColor('lasswho-main')}
    >
      <Text style={tailwind(' text-center text-3xl text-gray-300 mb-8')}>
        My Meetings
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color={getColor('lasswho-accent')} />
      ) : (
        <SectionList
          sections={sectionFormattedGroups.reverse()}
          renderSectionHeader={({ section }) => (
            <View style={tailwind('mb-16')}>
              <Text style={tailwind('text-gray-200 text-lg mb-8')}>
                {section.title}
              </Text>
              <FlatList
                data={section.data}
                columnWrapperStyle={tailwind('flex justify-between')}
                numColumns={2}
                renderItem={({ item }) => (
                  <View>
                    <MeetingsCard meeting={item} />
                  </View>
                )}
              />
            </View>
          )}
          renderItem={({ }) => <View />}
        />
      )}
    </Screen>
  );
};

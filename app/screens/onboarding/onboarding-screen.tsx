import React, { useState, useRef } from 'react';
import {
  Pressable,
  FlatList,
  View,
  ScrollView,
  StyleSheet,
  Animated,
  Image,
} from 'react-native';
import { Text } from '@components';
import { tailwind } from '@tailwind';
import { useNavigation } from '@react-navigation/native';
import { screenWidth, screenHeight } from '@utils/dimensions';
import { useQuery } from '@apollo/client';
import { IsUserLoggedInDocument } from '@generated/graphql';

interface Props {
  title: string;
  stepNumber: number;
}

const data = [
  {
    id: '1',
    title: 'SEARCH & IDENTIFY',
    description:
      `Search for your hero's name, country, team 
      and check out their profile.`,
    image:
      'https://lasswho.s3.eu-west-2.amazonaws.com/assets/mobile/onboarding_search.png',
  },
  {
    id: '2',
    title: 'BOOK THE SPEAKER',
    description:
      'Choose the date and time that you\n would like to book the speaker and\nrequest to book them.',
    image:
      'https://lasswho.s3.eu-west-2.amazonaws.com/assets/mobile/onboarding_book.png',
  },
  {
    id: '3',
    title: 'SET THE AGENDA',
    description:
      'Set the agenda, letting them know what you would like them to talk about. They’ll have the opportunity to make their own suggestions.',
    image:
      'https://lasswho.s3.eu-west-2.amazonaws.com/assets/mobile/onboarding_agenda.png',
  },
  {
    id: '4',
    title: 'HOST THE EVENT',
    description:
      'Now it’s time to host the meeting. The speaker will follow the agreed agenda but you’ll have plenty of opportunities to ask questions.',
    image:
      'https://lasswho.s3.eu-west-2.amazonaws.com/assets/mobile/onboarding_event.png',
  },
  {
    id: '5',
    title: 'RATE THE SPEAKER',
    description: 'Now rate the speaker\ngiving them up to five stars.',
    image:
      'https://lasswho.s3.eu-west-2.amazonaws.com/assets/mobile/onboarding_rate.png',
  },
];

const StepItem = ({ item, onPressHandle }) => {

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[tailwind('items-center mt-2 px-4'), styles.slide]}>
      <Text
        style={[
          tailwind('text-2xl text-white text-center tracking-widest mx-4 mt-4 mb-6'),
        ]}>
        {item.title}
      </Text>
      <View style={tailwind('flex h-1/2 w-full')}>
        <Image
          style={[tailwind('h-full'), { resizeMode: 'contain' }]}
          source={{ uri: item.image }}
        />
      </View>
      <Text style={tailwind('text-base text-center text-white mt-6 mx-6 h-24')}>
        {item.description}
      </Text>
      <View style={tailwind('w-full items-center')}>
        <Pressable style={tailwind('mt-4')} onPress={onPressHandle}>
          <Text style={tailwind('text-lg text-lasswho-accent')}>Skip tutorial ></Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const Paginator = ({ data, scrollX }) => {
  return (
    <View style={tailwind('mt-12 flex-row items-center justify-center h-12')}>
      {data.map((_, i) => {
        const inputRange = [
          (i - 1) * screenWidth,
          i * screenWidth,
          (i + 1) * screenWidth,
        ];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.2, 1, 0.2],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            style={[
              styles.dot,
              { width: dotWidth, opacity },
              tailwind('bg-lasswho-accent'),
            ]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

export const OnboardingScreen = ({ }: Props) => {
  const { data: userData } = useQuery(IsUserLoggedInDocument);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const navigation = useNavigation();
  const skipTutorialHandler = () => navigation.navigate(!userData?.isLoggedIn ? 'checkEmailMagicLogin' : 'home');
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <View
      style={tailwind('bg-lasswho-main items-center justify-center')}>
      <Paginator data={data} scrollX={scrollX} />
      <View>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <StepItem item={item} onPressHandle={(skipTutorialHandler)} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            },
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    flexGrow: 1,
    height: screenHeight,
    width: screenWidth,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
  },
});

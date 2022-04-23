import React, { useState, useRef } from 'react';
import {
  Pressable,
  Text,
  FlatList,
  View,
  StyleSheet,
  Animated,
  Image,
} from 'react-native';
import { tailwind } from '@tailwind';
import { useNavigation } from '@react-navigation/native';
import { screenWidth, screenHeight } from '@utils/dimensions';
import Search from '../../assets/images/search.svg';
import Book from '../../assets/images/book.svg';
import Agenda from '../../assets/images/agenda.svg';
import Event from '../../assets/images/event.svg';
import Rate from '../../assets/images/rate.svg';

interface Props {
  title: string;
  stepNumber: number;
}

const data = [
  {
    id: '1',
    title: 'Search and Identify',
    description:
      'Find your field. Search for your star. Search for your favourite team or league. Identify and get ready to book.',
    image: <Search width={250} height={250}/>,
  },
  {
    id: '2',
    title: 'Book',
    description:
      'Select call duration. Accept Rules of Engagement. Select available date and time. Enter payment details. Confirm booking.',
    image: <Book width={250} height={250}/>,
  },
  {
    id: '3',
    title: 'Set Agenda',
    description:
      'Specify meeting agenda. Engage your Speaker. Get set - you are ready!',
    image: <Agenda width={250} height={250}/>,
  },
  {
    id: '4',
    title: 'The Event',
    description:
      'Meet your hero, star, leader. Engage in direct discussion. Interact and find out the A game recipe. Listen to stories first hand!',
    image: <Event width={250} height={250}/>,
  },
  {
    id: '5',
    title: 'Rate',
    description:
      'Rate your speaker. Confirm call completed. Speaker rates you with dedicated message.',
    image: <Rate width={250} height={250}/>,
  },
];

const StepItem = ({ item }) => {
  return (
    <View style={[tailwind('items-center mt-16'), styles.slide]}>
      <View style={[tailwind('flex'), { flex: 0.4, resizeMode: 'contain' }]}>
        {item.image}
      </View>

      <View>
        <Text
          style={[
            tailwind('text-4xl text-lasswho-accent font-bold text-center mt-2'),
          ]}>
          {item.title}
        </Text>
        <Text style={tailwind('text-base text-center px-6 text-gray-400 mt-4')}>
          {item.description}
        </Text>
      </View>
    </View>
  );
};

const Paginator = ({ data, scrollX }) => {
  return (
    <View style={tailwind('flex-row h-12')}>
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
            style={[styles.dot, { width: dotWidth, opacity }, tailwind('bg-lasswho-accent')]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

export const HowItWorksScreen = ({}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const navigation = useNavigation();
  const goToLoginScreen = () => navigation.navigate('login');

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <View style={tailwind('bg-lasswho-main items-center justify-center flex-grow')}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={data}
          renderItem={({ item }) => <StepItem item={item} />}
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
      <Paginator data={data} scrollX={scrollX} />
      <Pressable
        onPress={goToLoginScreen}
        style={[
          tailwind('bg-lasswho-accent rounded px-28 py-2 mb-4'),
        ]}>
        <Text style={tailwind('text-white text-2xl text-center')}>
          Continue
        </Text>
      </Pressable>
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

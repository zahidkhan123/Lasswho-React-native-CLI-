import React, { useContext, useState, useRef } from 'react';
import {
  View,
  Pressable,
  GestureResponderEvent,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { tailwind, getColor } from '@tailwind';
import CalendarPicker from 'react-native-calendar-picker';
import moment, { Moment } from 'moment';
import { useQuery } from '@apollo/client';

import { CallToActionButton, Text } from '@components';
import ArrowLeft from '../../assets/icons/arrow-left.svg';
import ArrowRight from '../../assets/icons/arrow-right.svg';
import { GetSpeakerCalendarDocument, Speaker } from '@generated/graphql';
import BookingContext from '@context/booking-context';

const today = new Date();

interface Props {
  speaker: Speaker;
  onSubmit: (event: GestureResponderEvent) => void;
}

export const Calendar = ({ speaker, onSubmit }: Props) => {
  const {
    duration,
    slot: selectedSlot,
    date: selectedDate,
    setSlot,
    setDate,
  } = useContext(BookingContext);
  const [isDisabled, setIsDisabled] = useState(true);

  const { data, loading } = useQuery(GetSpeakerCalendarDocument, {
    variables: {
      speaker: Number(speaker.id),
      duration: Number(duration),
    },
    fetchPolicy: 'network-only',
  });

  const scrollViewRef = useRef<ScrollView>(null);

  const selectDate = (date: Date) => {
    scrollViewRef.current?.scrollToEnd();
    setDate(date);
  };

  const selectTime = (time: string) => {
    setIsDisabled(false);
    setSlot(time);
  };

  if (loading) {
    return (
      <ActivityIndicator size="large" color={getColor('lasswho-accent')} />
    );
  }

  const availableDates =
    data?.calendar?.map((calendar) => {
      return moment(calendar?.date).toDate();
    }) || [];

  const startAvailabilityDate = moment(availableDates[0]);
  const endAvailabilityDate = moment(availableDates[availableDates.length - 1]);

  const getDisabledDates = (date: Moment) => {
    return !moment(date).isBetween(
      startAvailabilityDate,
      endAvailabilityDate,
      'day',
      '[]',
    );
  };

  const availableSlots =
    data?.calendar?.find((calendar) => {
      return moment(selectedDate).isSame(calendar?.date, 'day');
    })?.slots || [];

  return (
    <>
      <View style={tailwind('absolute -top-11 self-center')}>
        <View style={tailwind('bg-lasswho-accent rounded-full px-8 py-4')}>
          <Text style={tailwind('font-bold text-xl text-white text-center')}>
            Calendar
          </Text>
        </View>
      </View>
      <ScrollView style={tailwind('mt-8')} ref={scrollViewRef}>
        <View style={tailwind('flex mt-4')}>
          <CalendarPicker
            textStyle={tailwind('text-white')}
            disabledDatesTextStyle={tailwind('text-gray-800')}
            monthTitleStyle={tailwind('text-xl')}
            onDateChange={selectDate}
            todayBackgroundColor={getColor('lasswho-secondary')}
            selectedDayStyle={tailwind('border-2 border-red-400')}
            selectedDayTextColor={'#FFFFFF'}
            minDate={today}
            disabledDates={(date) => getDisabledDates(date)}
            scaleFactor={390}
            previousComponent={
              <ArrowLeft fill="grey" style={tailwind('h-10 w-10 ml-4')} />
            }
            nextComponent={
              <ArrowRight fill="grey" style={tailwind('h-10 w-10 mr-4')} />
            }
          />

          <ScrollView horizontal>
            {availableSlots.map((slot) => (
              <TimeButton
                key={slot}
                slot={slot || ''}
                selectedSlot={selectedSlot === slot}
                onSelect={() => selectTime(slot!)}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
      <View style={tailwind('my-6 mx-4')}>
        <CallToActionButton
          isDisabled={isDisabled}
          onPressHandler={onSubmit}
          text={'SELECT DATE'}
        />
      </View>
    </>
  );
};

const TimeButton = ({
  slot,
  selectedSlot,
  onSelect,
}: {
  slot: string;
  selectedSlot: boolean;
  onSelect: () => void;
}) => {
  return (
    <Pressable
      onPress={onSelect}
      style={[
        tailwind(
          `px-3 py-2 w-20 border rounded-full m-4 ${selectedSlot
            ? 'bg-lasswho-accent border-lasswho-accent'
            : 'border-red-400'
          }`,
        ),
      ]}
    >
      <Text
        style={tailwind(
          `text-center text-sm  ${selectedSlot ? 'text-white' : 'text-lasswho-accent'
          }`,
        )}
      >
        {slot}
      </Text>
    </Pressable>
  );
};

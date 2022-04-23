import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
} from 'react-native';
import { tailwind, getColor } from '@tailwind';
import { Screen, CallToActionButton } from '@components';
import CheckIcon from '../../assets/icons/checkmark.svg';
interface Props {}

export const AgendaScreen = (text, onClose) => {
  return (
    <Screen
      style={tailwind('p-4')}
      preset="scroll"
      backgroundColor={getColor('lasswho-main')}>
      <View style={tailwind('flex items-center justify-center w-full')}>
        <AgendaCard />
        <CallToActionButton text="SEND" onPressHandler={onClose}/>
      </View>
    </Screen>
  );
};

const AgendaCard = ({ player, rating }: Props) => {
  return (
    <View style={tailwind('items-center justify-center m-2')}>
      <CheckIcon style={tailwind('p-16')} fill={getColor('lasswho-green')} />
      <Text style={tailwind('text-lasswho-green text-3xl tracking-wider mt-8')}>
        CALL REQUESTED!
      </Text>
      <Text style={tailwind('text-white text-sm text-center mt-6')}>
        Your video call request has been sent to your Hero. As soon as it's
        confirmed you will receive and email confirmation.
      </Text>

      <Text style={tailwind('text-white text-3xl tracking-wider text-center mt-10')}>
        NOW SET THE AGENDA
      </Text>

      <Text style={tailwind('text-white text-sm text-center mt-6 mb-8')}>
        Now it's time to set the agenda. Engage with your hero by letting them
        know what you'd like to talk about.
      </Text>

      <TextInput
        multiline
        numberOfLines={10}
        placeholder={`What was it like to win the world cup?\n\n\n What are you up to these days?\n\n\n Who inspired you to start playing?`}
        placeholderTextColor="grey"
        textAlign="center"
        editable
        style={tailwind('text-white w-60 mb-6 border-l-2 border-r-2 border-b-4 border-lasswho-green')}
      />
    </View>
  );
};

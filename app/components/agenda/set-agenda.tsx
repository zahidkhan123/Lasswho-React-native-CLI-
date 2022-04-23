import React, { useState } from 'react';
import { View, TextInput, Pressable } from 'react-native';
import { useMutation } from '@apollo/client';
import { tailwind, getColor } from '@tailwind';
import { Screen, Text, CallToActionButton, Icon } from '@components';
import { hasNotch } from '@utils/helpers';
import { SetMeetingAgendaDocument } from '@generated/graphql';

interface Props {
  bookingId: string;
  onClose: () => void;
}

const defaultAgenda =
  'What can you teach me about winning\nWhat can you teach me about leadership?\nWhat can you teach me about motivation?\nHow did you get your break?\nWhat was the most defining part of your career?\nWho inspired you?\nWhat is the best piece of advice you have?\nWhat funny stories can you share?\nWhat are you up to these days?\n';

export const SetAgenda = ({ bookingId, onClose }: Props) => {
  const [agendaText, setAgendaText] = useState<string>(defaultAgenda);
  const [setAgenda, { loading }] = useMutation(SetMeetingAgendaDocument, {
    onCompleted() {
      onClose();
    },
  });

  // TODO Use react-form-hook
  const onSubmit = () => {
    setAgenda({
      variables: {
        meeting: Number(bookingId),
        agenda: agendaText,
      },
    });
  };

  return (
    <View style={tailwind('bg-lasswho-main flex-1')}>
      <Screen preset="scroll">
        <Pressable
          style={tailwind(
            `flex self-end absolute right-4 z-20 bg-black bg-opacity-60 rounded-full w-8 h-8 justify-center items-center ${hasNotch ? 'top-12' : 'top-6'
            }`,
          )}
          onPress={onClose}
        >
          <Icon icon='crossDefault' fill="white" height={24} width={24} />
        </Pressable>

        <View>
          <View style={tailwind('items-center mx-6')}>
            <Icon
              icon='checkmark'
              fill={getColor('lasswho-green')}
              style={tailwind('p-16')}
            />
            <Text
              style={tailwind(
                'text-lasswho-green text-3xl tracking-wider mt-8',
              )}
            >
              CALL REQUESTED!
            </Text>
            <Text style={tailwind('text-white text-sm text-center mt-6')}>
              Your video call request has been sent to your Hero. As soon as
              it's confirmed you will receive an email confirmation.
            </Text>

            <Text
              style={tailwind(
                'text-white text-3xl tracking-wider text-center mt-10',
              )}
            >
              SET THE AGENDA
            </Text>

            <Text style={tailwind('text-white text-sm text-center mt-6 mb-8')}>
              Now it's time to set the agenda. Engage with your Hero by letting
              them know what you'd like to talk about.
            </Text>

            <TextInput
              multiline
              onChangeText={setAgendaText}
              defaultValue={defaultAgenda}
              style={[tailwind('bg-white w-full h-64 p-4'), { textAlignVertical: 'top' }]}
            />
          </View>
        </View>
        <View style={tailwind('my-6 mx-4')}>
          <CallToActionButton
            text="SEND"
            loading={loading}
            isDisabled={!agendaText || agendaText.length < 10}
            onPressHandler={onSubmit}
          />
        </View>
      </Screen>
    </View>
  );
};

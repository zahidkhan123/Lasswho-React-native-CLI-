import React, { useState } from 'react';
import { View, Image, TextInput } from 'react-native';
import { tailwind } from '@tailwind';
import { Text, Screen, CallToActionButton, SpeakerRating, RatingStar } from '@components';
import { RateMeetingDocument, FetchMeetingsDocument } from '@generated/graphql';
import { Meeting } from '../../operations/generated/graphql';
import { useMutation } from '@apollo/client';

interface Props {
  meeting: Meeting;
  onClose: () => void;
}

export const RateSpeakerScreen = ({ meeting, onClose }: Props) => {
  const [starCount, setStarCount] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [rateMeeting, { loading }] = useMutation(RateMeetingDocument, {
    onCompleted() {
      onClose();
    }
  });

  const onSubmit = () => {
    rateMeeting({
      variables: {
        meeting: parseInt(meeting.id, 10),
        rate: starCount,
        text: feedback
      },
      refetchQueries: [{ query: FetchMeetingsDocument }]
    })
  };

  return (
    <View style={tailwind('bg-lasswho-main flex-1')}>
      <Screen preset="scroll">
        <View>
          <View style={tailwind('items-center mx-12')}>
            <Text
              style={tailwind(
                'text-white text-xl tracking-wider text-center mt-6 mb-4 ',
              )}
            >
              RATE YOUR HERO
            </Text>
            <Image
              source={{ uri: meeting?.speaker?.listing_image }}
              style={[tailwind('w-24 h-24 rounded-xl')]}
            />
            <Text style={tailwind('text-white text-sm text-center mt-6 mb-8')}>
              {`How was the call with \n${meeting?.speaker?.name}?`}
            </Text>

            <RatingStar rating={starCount} interactive onPressHandler={setStarCount} />

            <Text style={tailwind('text-gray-300 text-sm text-center mt-6 mb-4')}>
              Please leave comments and feedback
            </Text>
            <TextInput
              multiline
              onChangeText={setFeedback}
              style={[tailwind('bg-white w-full h-40 p-4 mb-10'), { textAlignVertical: 'top' }]}
            />
          </View>
        </View>
        <View style={tailwind('my-6 mx-6')}>
          <CallToActionButton
            text="SUBMIT"
            loading={loading}
            isDisabled={!feedback || feedback.length < 1}
            onPressHandler={onSubmit}
          />
        </View>
      </Screen>
    </View>
  )
}
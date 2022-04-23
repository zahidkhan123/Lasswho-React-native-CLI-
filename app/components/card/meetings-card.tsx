import React, { useState } from 'react';
import { View, Image, Modal, Linking } from 'react-native';
import { tailwind } from '@tailwind';
import { Text, PillButton, MeetingLabel, SpeakerRating, SetAgenda } from '@components';
import { Meeting } from '../../operations/generated/graphql';
import moment from 'moment';
import { generatePageLink } from '@utils/in-app-browser-view';
import { config } from '@config';

interface Props {
  meeting: Meeting;
}

export const MeetingsCard = ({ meeting }: Props) => {
  const completedStyle = !meeting.past ? 'text-gray-300' : 'text-gray-500';
  const formattedDate = moment(meeting.meeting_date).format('Do MMMM YYYY');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalViewName, setModalViewName] = useState('');

  const openModal = () => {
    setModalVisible(true);
  }

  const closeModal = () => {
    setModalVisible(false);
  }

  const dynamicModalViews = {
    agenda: (
      <SetAgenda
        bookingId={meeting.id}
        onClose={closeModal}
      />
    ),
    rate: (
      <SpeakerRating meeting={meeting} onClose={closeModal} />
    )
  };

  const DynamicModalView = ({ viewName }) => {
    return (
      dynamicModalViews[viewName]
    )
  };

  const rateMeeting = () => {
    setModalViewName('rate');
    openModal();
  }

  const setAgenda = () => {
    setModalViewName('agenda');
    openModal();
  }

  const payForMeeting = () => {
    let uuid = meeting?.uuid;
    generatePageLink(`${config.SPEAKER_URL}/pay/${uuid}`);
  }

  const joinMeeting = () => {
    console.log(meeting?.meeting_link)
    if (meeting?.meeting_link) {
      Linking.openURL(meeting?.meeting_link);
    }
    //TODO: Add setup meeting link
  }

  const buttonActions = [
    // {'status': 'confirmed', 'action': rebookMeeting },
    {
      'status': 'pay', 'title': '', 'action': payForMeeting
    },
    {
      'status': 'rate', 'title': '', 'action': rateMeeting
    },
    {
      'status': 'agenda', 'title': 'set agenda', 'action': setAgenda
    },
    { 'status': 'join', 'title': '', 'action': joinMeeting }
  ];

  const ctaObject = buttonActions.find(button => {
    console.log(meeting.cta)
    if (button === undefined) {
      return null;
    }
    return button.status === meeting.cta;
  });

  return (
    <View key={meeting.id} style={tailwind('flex items-center mb-12')}>
      <Modal
        animationType="fade"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <DynamicModalView viewName={modalViewName} />
      </Modal>
      <Image
        source={{ uri: meeting?.speaker?.listing_image }}
        style={[tailwind('w-36 h-36 rounded-xl')]}
      />
      {
        meeting.cta !== undefined &&
        <MeetingLabel status={meeting.status} />
      }
      <View style={tailwind('flex mt-2 ')}>
        <Text style={tailwind('mb-1 text-sm text-center text-gray-200')}>
          {meeting?.speaker?.name}
        </Text>
        <Text style={tailwind(`mb-1 text-sm text-center ${completedStyle}`)}>
          {meeting?.meeting_time}
        </Text>
      </View>

      <Text style={[tailwind(`text-sm text-center ${completedStyle} `)]}>
        {formattedDate}
      </Text>

      {meeting.cta ? (
        <PillButton
          text={!ctaObject?.title ? meeting.cta : ctaObject?.title}
          textSize={'small'}
          uppercase
          color={'lasswho-green'}
          filled
          style={tailwind('w-full')}
          onPressHandle={ctaObject?.action}
        />
      ) : null}
    </View>
  );
};

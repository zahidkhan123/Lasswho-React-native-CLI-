import React, { useContext, useState } from 'react';
import { View, Modal, ScrollView, GestureResponderEvent } from 'react-native';
import { tailwind } from '@tailwind';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import { CallToActionButton, Text, SetAgenda } from '@components';
import { BookMeetingDocument, FetchMeetingsDocument, Speaker } from '@generated/graphql';
import BookingContext from '@context/booking-context';
import { calculatePrice, formatPrice } from '@utils/price';
import { useMutation } from '@apollo/client';
import { generatePageLink } from '@utils/in-app-browser-view';
import { config } from '@config';
import * as storage from '@utils/storage';

interface Props {
  speaker: Speaker;
  onFinishBooking: (event: GestureResponderEvent) => void;
}

export const ConfirmationCard = ({ speaker, onFinishBooking }: Props) => {
  const { date, slot, duration } = useContext(BookingContext);
  const [modalVisible, setModalVisible] = useState(false);

  const [bookMeeting, { data, loading }] = useMutation(BookMeetingDocument, {
    onCompleted(data) {
      let uuid = data?.bookMeeting?.uuid;
      storage.loadString('upcomingMeetingsCount').then((meetingCount) => {
        storage.saveString('upcomingMeetingsCount', (Number(meetingCount) + 1).toString())
      })
      generatePageLink(`${config.SPEAKER_URL}/pay/${uuid}`, openModal);
    },
    onError({ graphQLErrors }) {
      if (graphQLErrors) {
        graphQLErrors.map((error) => {
          Toast.show(error?.extensions?.reason);
        })
      }
    }
  });

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const onSubmit = () => {
    bookMeeting({
      variables: {
        speaker: Number(speaker.id),
        date: moment(date).format('YYYY-MM-DD'),
        duration,
        slot,
      },
      refetchQueries: [{ query: FetchMeetingsDocument }]
    });
  };

  const formatDate = moment(date).format('DD').toString().split('');
  const hour = Number(slot.split(':')[0]);
  const minutes = Number(slot.split(':')[1]);
  const endTime = moment
    .utc(date)
    .set('hour', hour)
    .set('minute', minutes)
    .clone()
    .add(duration, 'minutes')
    .format('HH:mm');

  const totalPrice = calculatePrice(duration, speaker.price_min);

  return (
    <>
      <ScrollView>
        <View style={[tailwind('flex items-center rounded-lg mt-4')]}>
          <Modal
            animationType="fade"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
              closeModal();
            }}
          >
            <SetAgenda
              bookingId={data?.bookMeeting.id!}
              onClose={onFinishBooking}
            />
          </Modal>
          <View style={tailwind('flex-row')}>
            {formatDate.map((digit: string, index: number) => {
              return (
                <View
                  key={`${digit}_${index}`}
                  style={tailwind(
                    'items-center bg-black w-20 h-28 mx-1 border border-gray-400 rounded-lg',
                  )}
                >
                  <Text
                    style={[
                      tailwind('text-gray-200 text-confirmation-date -top-1'),
                    ]}
                  >
                    {digit}
                  </Text>
                </View>
              );
            })}
          </View>

          <View style={tailwind('flex flex-col m-2 mb-2')}>
            <Text
              style={tailwind(
                'mb-2 text-2xl text-center tracking-widest text-gray-200 uppercase',
              )}
            >
              {moment(date).format('MMMM YYYY')}
            </Text>
            <Text
              style={tailwind(
                'mb-2 text-xl text-center tracking-widest text-gray-200',
              )}
            >
              {slot}-{endTime}
            </Text>
            <Text
              style={tailwind('text-gray-200 text-center mt-6 mb-6 text-sm')}
            >
              Your speaker will receive your request and respond ASAP.
            </Text>
            <Text style={tailwind('text-gray-200 text-center mb-2 text-sm ')}>
              If the booking is successful you will receive an email
              confirmation with the video call details.
            </Text>
            <Text
              style={tailwind('text-gray-200 mt-6 ml-2 text-xs text-center')}
            >
              We will authorise your card and not take payment until the meeting has been accepted and confirmed by the speaker.
              If your booking is not successful then no charge will be made.
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={tailwind('p-6 mb-20')}>
        <CallToActionButton
          loading={loading}
          isDisabled={loading}
          onPressHandler={onSubmit}
          text={`CONFIRM ${formatPrice(
            speaker.country_code!,
            speaker.currency,
            totalPrice,
          )}`}
        />
      </View>
    </>
  );
};

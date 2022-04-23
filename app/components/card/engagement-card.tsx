import React from 'react';
import {
  View,
  GestureResponderEvent,
  ScrollView,
  Pressable,
  Linking,
} from 'react-native';
import { tailwind } from '@tailwind';
import { EngagementList, CallToActionButton, Text } from '@components';
import InfoIcon from '../../assets/icons/info.svg';
import { Speaker } from 'operations/generated/graphql';
import { config } from '@config';

interface Props {
  data?: Speaker;
  onClose: () => void;
  onSubmit: (event: GestureResponderEvent) => void;
}

export const EngagementCard = ({ data, onSubmit }: Props) => {
  const goToRules = () => {
    Linking.openURL(config.RULES_URL);
  };

  const goToCodeOfConduct = () => {
    Linking.openURL(config.COC_URL);
  };

  return (
    <>
      <View style={tailwind('absolute -top-11 self-center')}>
        <View style={tailwind('bg-lasswho-accent rounded-full px-8 py-4')}>
          <Text style={tailwind('font-bold text-xl text-white text-center')}>
            Rules of Engagement
          </Text>
        </View>
      </View>
      <ScrollView style={tailwind('mt-8')}>
        <View style={tailwind('px-6')}>
          <View style={tailwind('mb-6 mt-4')}>
            <Text style={tailwind('text-xl text-white')}>
              What can be discussed?
            </Text>
          </View>

          <EngagementList rules={data?.engagement_rules} />

          <View style={tailwind('flex-row items-center p-2 mb-8')}>
            <InfoIcon
              height={20}
              width={20}
              fill="grey"
              style={tailwind('mb-3 mr-2')}
            />
            <View style={tailwind('flex-row flex-wrap')}>
              <Text style={tailwind('text-gray-300')}>
                I accept the{' '}
              </Text>
              <Pressable style={tailwind('items-start')} onPress={goToRules}>
                <Text style={tailwind('underline text-lasswho-accent')}>
                  Rules of Engagement
                </Text>
              </Pressable>
              <Text style={tailwind('text-gray-300')}>
                {' '}and the
              </Text>
              <Pressable onPress={goToCodeOfConduct}>
                <Text style={tailwind('underline text-lasswho-accent')}>
                  Code of Conduct
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={tailwind('my-6 mx-4')}>
        <CallToActionButton
          text={'I UNDERSTAND & ACCEPT'}
          onPressHandler={onSubmit}
        />
      </View>
    </>
  );
};

import React from 'react';
import { GestureResponderEvent, View, Pressable } from 'react-native';
import { tailwind, getColor } from '@tailwind';
import { Text } from '@components';
import Spinner from 'react-native-spinkit';

interface Props {
  text: string;
  isDisabled?: boolean;
  loading?: boolean;
  onPressHandler: (event: GestureResponderEvent) => void;
  facebook?:boolean
}
export const CallToActionButton = ({
  text,
  isDisabled,
  onPressHandler,
  loading,
  facebook
}: Props) => {
  return (
    <Pressable
      style={tailwind(
        `${
          isDisabled ? 'bg-gray-400' : facebook ? 'bg-blue-600': 'bg-lasswho-green'
        }
        rounded-full py-3 px-6 w-full`,
      )}
      disabled={isDisabled}
      onPress={onPressHandler}>
      {loading ? (
        <View style={tailwind('absolute')}>
          <Spinner
            isVisible={true}
            size={52}
            type={'Pulse'}
            color={getColor('white')}
          />
        </View>
      ) : null}
      <Text
        style={tailwind(
          'text-white text-lg tracking-widest font-semibold text-center',
        )}>
        {text}
      </Text>
    </Pressable>
  );
};

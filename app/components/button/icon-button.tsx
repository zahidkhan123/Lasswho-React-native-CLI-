import React, { useRef } from 'react';
import { tailwind, getColor } from '@tailwind';
import { Pressable, StyleProp, ViewStyle } from 'react-native';
import { Icon } from '@components';
// import starIconPath from '../../assets/icons/star-empty.svg';
// import crossIconPath from '../../assets/icons/cross.svg';
import * as Animatable from 'react-native-animatable';

interface Props {
  isSelected: boolean;
  icon: string;
  onHandlePress: any;
  style?: StyleProp<ViewStyle>;
}

export const IconButton = ({
  onHandlePress,
  isSelected,
  icon,
  style,
}: Props) => {  
  const animationRef = useRef(null);

  return (
    <Pressable
      style={[tailwind('flex items-center absolute h-16 w-16 z-30'), style]}
      onPress={() => {
        onHandlePress();
        if (animationRef) {
          animationRef.current?.tada();
        }
      }}
    >
      <Animatable.View ref={animationRef}>
        <Icon
          icon={icon}
          height={20}
          width={20}
          fill={getColor(`${isSelected ? 'lasswho-accent' : 'white'}`)}
        />
      </Animatable.View>
    </Pressable>
  );
};

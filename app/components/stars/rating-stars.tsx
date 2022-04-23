import React, { ReactChild } from "react";
import { View, Pressable } from 'react-native';
import { Icon } from '@components';
import { tailwind, getColor } from '@tailwind';

interface Props {
  rating: number;
  size?: 16 | 20 | 32;
  interactive?: boolean;
  onPressHandler?: (index: number) => void;
}

export const RatingStar = ({ rating, size = 20, interactive = false, onPressHandler }: Props) => {
  const maxRating = rating > 5 ? 5 : rating;
  let starsArray = [];

  const generateStar = (starType: string, starIndex?: number) => (
    <Pressable onPress={interactive ? () => onPressHandler(starIndex) : null}>
      <Icon
        icon={starType}
        height={size}
        width={size}
        fill={getColor('lasswho-gold')}
        style={tailwind('ml-2 mr-2')}
      />
    </Pressable >
  )

  for (let i = 0; i < 5; i++) {
    starsArray.push(
      generateStar('starEmpty', (i + 1))
    );
  }

  for (let j = 0; j < maxRating; j++) {
    if (j <= maxRating) {
      starsArray.splice(j, 1,
        generateStar('starFilled', (j + 1))
      );
    }
  }

  if (maxRating % 1 != 0) {
    starsArray.splice(maxRating, 1, generateStar('starHalf')
    );
  }

  return (<View style={tailwind('flex-row mb-2')}>{starsArray}</View>)
};


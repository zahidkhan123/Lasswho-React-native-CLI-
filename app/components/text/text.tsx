import * as React from 'react';
import { Text as ReactNativeText } from 'react-native';
import { TextProps } from './text.props';

/**
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Text(props: TextProps) {
  // grab the props
  const { text, children, style, ...rest } = props;

  // figure out which content to use
  const content = text || children;

  return (
    <ReactNativeText
      {...rest}
      style={[style, { fontFamily: 'Nunito-Regular' }]}
    >
      {content}
    </ReactNativeText>
  );
}

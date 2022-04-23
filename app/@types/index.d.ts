// declare module '*.svg' {
//   import React from 'react';
//   import { SvgProps } from 'react-native-svg';
//   const content: React.FC<SvgProps>;
//   export default content;
// }

declare module '*.png' {
  const value: any;
  export default value;
}

declare module '*.mp4' {
  const value: any;
  export default value;
}


declare module '*svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module '@env' {
  export const API_BASE: string;
}

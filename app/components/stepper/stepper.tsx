import React, { ReactChild } from 'react';
import { View } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { getColor, tailwind } from '@tailwind';
import { hasNotch } from '@utils/helpers';

interface Props {
  active: number;
  views: any;
}

export const Stepper = ({ active, views }: Props) => (
  <View style={{ flex: 1, marginHorizontal: 40 }}>
    <ProgressSteps
      activeStep={active}
      borderWidth={3}
      progressBarColor={getColor('transparent')}
      completedProgressBarColor={getColor('transparent')}
      activeStepIconBorderColor={getColor('transparent')}
      activeStepIconColor={getColor('transparent')}
      disabledStepIconColor={getColor('transparent')}
      activeStepNumColor={getColor('transparent')}
      disabledStepNumColor={getColor('transparent')}
      completedStepIconColor={getColor('transparent')}
      completedCheckColor={getColor('transparent')}
    >
      {views.map((view: ReactChild, index: number) => (
        <View
          key={index}
          style={[
            tailwind('flex-1'),
            { marginTop: hasNotch ? 230 : 250, marginHorizontal: -40 },
          ]}
        >
          <ProgressStep scrollable={false} removeBtnRow>
            {view}
          </ProgressStep>
        </View>
      ))}
    </ProgressSteps>
  </View>
);

import { Dispatch } from 'react';
import { Marker, TimelineAction } from '../types/timestone';

export const setupMarkers = (
  markers: Marker[],
  dispatch: Dispatch<TimelineAction>
) => {
  return (
    markers?.map(marker => {
      return {
        ...marker,
        triggerPause: () => {
          dispatch({ type: 'PAUSED' });
        },
      };
    }) || []
  );
};

import { ITimelineState, TimelineAction, PlayDirection } from '../types';

export const reducer = (
  state: ITimelineState,
  action: TimelineAction
): ITimelineState => {
  const getNextPlayDirection = (current: PlayDirection) =>
    current === 'FORWARD' ? 'BACKWARD' : 'FORWARD';

  switch (state.playerState) {
    case 'INIT':
      if (action.type === 'LOADING') {
        return {
          ...state,
          markers: action.payload,
          playerState: action.type,
        };
      }
      return state;
    case 'LOADING':
      if (action.type === 'LOADING_PROGRESS') {
        return {
          ...state,
          playerState: action.type,
        };
      }
      if (action.type === 'READY') {
        return {
          ...state,
          playerState: action.type,
        };
      }
      return state;
    case 'LOADING_PROGRESS':
      if (action.type === 'READY') {
        return {
          ...state,
          playerState: action.type,
          loadedVideoUrls: action.payload,
        };
      }
      if (action.type === 'LOADING_PROGRESS') {
        return {
          ...state,
          loadingProgress: action.payload,
        };
      }
      return {
        ...state,
      };
    case 'READY':
      if (action.type === 'PLAYING') {
        return {
          ...state,
          playerState: action.type,
        };
      }
      return state;
    case 'PLAYING':
      if (action.type === 'PAUSED') {
        return {
          ...state,
          playerState: action.type,
        };
      }
      if (action.type === 'ENDED') {
        return {
          ...state,
          playerState: action.type,
        };
      }
      if (action.type === 'TIMELINE_ENDED') {
        return {
          ...state,
          playerState: action.type,
        };
      }
      if (action.type === 'REVERSE') {
        return {
          ...state,
          playDirection: getNextPlayDirection(state.playDirection),
        };
      }
      return state;
    case 'PAUSED':
      if (action.type === 'PLAYING') {
        return {
          ...state,
          playerState: action.type,
        };
      }
      if (action.type === 'REVERSE') {
        return {
          ...state,
          playDirection: getNextPlayDirection(state.playDirection),
        };
      }
      return state;
    case 'ENDED':
      if (action.type === 'PLAYING') {
        return {
          ...state,
          playIndex:
            state.playDirection === 'FORWARD'
              ? state.playIndex < state.loadedVideoUrls.length - 1
                ? state.playIndex + 1
                : 0
              : state.playIndex > 0
                ? state.playIndex - 1
                : 0,
          playerState: action.type,
        };
      }
      if (action.type === 'REVERSE') {
        return {
          ...state,
          playDirection: getNextPlayDirection(state.playDirection),
        };
      }
      return state;
    case 'TIMELINE_ENDED':
      if (action.type === 'PLAYING') {
        return {
          ...state,
          playerState: action.type,
        };
      }

      if (action.type === 'REVERSE') {
        return {
          ...state,
          playDirection: getNextPlayDirection(state.playDirection),
        };
      }
      return state;
    default:
      return state;
  }
};

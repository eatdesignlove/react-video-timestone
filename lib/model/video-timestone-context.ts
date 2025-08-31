import { createContext } from 'react';
import { ITimelineState } from '../types';

export const VideoTimelineContext = createContext<ITimelineState | null>(null);

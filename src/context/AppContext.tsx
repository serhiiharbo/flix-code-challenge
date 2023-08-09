import React, { createContext } from 'react';
import { TRootStore } from '../store';

export const AppContext: React.Context<TRootStore> = createContext<TRootStore>(null);

import type { ReactNode } from 'react';

export type CompositionalComponent = { children: ReactNode };
export type BasicError = { error: boolean; message?: string };

export type * from './components';
export type * from './pages';
export type * from './services';

import type { ReactNode } from 'react';

export type CompositionalComponent = { children: ReactNode };
export type BasicError = { error: boolean; message?: string };
export type SearchParamsType = Record<string, string | string[]>;
export type SearchParams = {
    searchParams: Promise<SearchParamsType>;
};

export type * from './components';
export type * from './pages';
export type * from './services';

import type {BaseProvider} from './baseProvider';
import {SnaptikProvider} from './snaptikProvider';
import {TikmateProvider} from './tikmateProvider';

export const Providers: BaseProvider[] = [
  new SnaptikProvider(),
  new TikmateProvider(),
];

export const getRandomProvider = () => Providers[
    Math.floor(Math.random() * Providers.length)
];

export const getProvider = (name: string) => name.toLowerCase() !== 'random' ?
Providers.find(
    (p) => p.resourceName() === name.toLowerCase(),
) : getRandomProvider();
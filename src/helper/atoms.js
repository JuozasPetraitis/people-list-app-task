import { atom } from 'recoil';

export const people = atom({
  key: 'people',
  default: [],
});

export const comments = atom({
  key: 'comments',
  default: [],
});

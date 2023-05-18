import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export const email = atom({
  key: 'email',
  default: '',
});

export const rate = atom({
  key: 'rate',
  default: [],
  effects_UNSTABLE: [persistAtom], //새로고침 시에도 유지되도록
});

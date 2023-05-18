import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

// login user email
export const email = atom({
  key: 'email',
  default: '',
});

// login user token
export const token = atom({
  key: 'token',
  default: '',
  effects_UNSTABLE: [persistAtom], //새로고침 시에도 유지되도록 localStorage에 저장
});

// open api - exchange rate info
export const rate = atom({
  key: 'rate',
  default: [],
  effects_UNSTABLE: [persistAtom], //새로고침 시에도 유지되도록 localStorage에 저장
});

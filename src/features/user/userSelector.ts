import type { RootState } from '../../app/store';
// Other code such as selectors can use the imported `RootState` type
export const selectUserAuth = (state: RootState) => state.user.auth;
export const selectUserInfo = (state: RootState) => state.user.info;
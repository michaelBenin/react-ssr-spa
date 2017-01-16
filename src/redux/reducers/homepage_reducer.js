// https://github.com/reactjs/redux/issues/99
// import { canUseDOM } from 'exenv';

export default function (state = {}, action) {
  const typeMap = {
    HOMEPAGE_LOADED() {
      return {
        isLoading: false
      };
    }
  };

  if (typeMap[action.type]) {
    return typeMap[action.type]();
  }

  return state;
}

export default function (state = {}, action) {
  if (action.type === 'INITIAL_PAGE_LOAD') {
    return Object.assign({}, state, {
      initialPageLoad: false
    });
  }
  return state;
}

export default function(
  state = {
    code: 200
  },
  action
) {
  if (action.type === 'NOT_FOUND_STATUS') {
    return {
      code: 404
    };
  }

  if (action.type === 'ERROR_STATUS') {
    return {
      code: 500
    };
  }
  return state;
}

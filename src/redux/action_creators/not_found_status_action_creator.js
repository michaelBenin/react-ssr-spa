export default function(status, action) {
  return {
    type: action,
    status
  };
}

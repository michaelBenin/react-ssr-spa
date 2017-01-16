import P from 'bluebird';
import homepageLoaded from './../action_creators/homepage_action_creators';

export default function fetchHomepageAction(params) {
  return function firstDispatch(dispatch) {
    dispatch(homepageLoaded(params));
    return P.resolve();
  };
}

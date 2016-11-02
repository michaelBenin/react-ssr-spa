// https://api.github.com/searchs/michaelbenin
// import { canUseDOM } from 'exenv';
import { extend } from 'lodash';
import * as searchActions from './../action_creators/search_action_creators';
import notFoundActionCreator from '../../redux/action_creators/not_found_status_action_creator';
import SearchModel from '../../models/search';

export default function fetchSearchAction(query) {
  return function firstDispatch(dispatch) {
    dispatch(searchActions.searchLoading());
    return SearchModel.fetch(query).then(function handleSearchModelData(searchData) {
      dispatch(searchActions.searchLoaded(searchData.data));
    }).catch(function handleSearchError(err) {
      if (err && err.code === 'ENOTFOUND') {
        extend(err, {
          message: 'No Internet Connectivity'
        });
        dispatch(notFoundActionCreator(500, 'ERROR_STATUS'));
      }
      dispatch(searchActions.searchError(err.data));
    });
  };
}

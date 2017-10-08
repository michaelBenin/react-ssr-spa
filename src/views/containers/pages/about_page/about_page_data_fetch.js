import { canUseDOM } from 'exenv';
import asyncAboutPageAction from '../../../../redux/actions/about/async_about_page_actions';
import log from '../../../../services/logger_service';

export default function fetchAboutData(match, dispatch, state) {
  if (canUseDOM) {
    if (state.config.initialPageLoad === true) {
      return false;
    }
  }
  return asyncAboutPageAction(
    match.params,
    dispatch,
    state
  ).catch(function handleError(err) {
    log.error(err);
  });
}

// import log from '../services/logger_service';
import P from 'bluebird';
import FontLoaderUtil from '../utils/font_loader_util';

export default function initialize() {
  return P.all([
    FontLoaderUtil.loadFonts()
  ]);
}

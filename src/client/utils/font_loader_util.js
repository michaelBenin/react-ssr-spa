import FontFaceObserver from 'fontfaceobserver';
import P from 'bluebird';

if (!window.Promise) {
  window.Promise = P;
}

export default class FontLoaderUtil {
  static loadFonts() {
    const font = new FontFaceObserver('AmbleLight');
    const font2 = new FontFaceObserver('Amble');
    const fontPromise = P.all([font.load(), font2.load()]);
    return fontPromise
      .then(function fontLoadSuccess() {
        document.documentElement.className += ' fonts-loaded';
      })
      .catch(function fontLoadFail(/* err */) {
        document.documentElement.className +=
          ' fonts-loaded fonts-loaded-error';
      });
  }
}

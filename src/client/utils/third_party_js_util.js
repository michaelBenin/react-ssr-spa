/* eslint-disable no-unused-vars, func-names, no-undef, prefer-rest-params, no-underscore-dangle  */
import scriptJS from 'scriptjs';
import P from 'bluebird';

export class ThirdPartyJs {
  // config here: https://analytics.google.com/analytics/web/#management/Settings/a45063514w75598220p78098335/%3Fm.page%3DPropertySettings/
  static loadGA(env) {
    // https://developers.google.com/analytics/devguides/collection/analyticsjs/
    /*
    ga.l = +new Date;
    ga('create', '', 'auto');
    ga('require', 'eventTracker');
    ga('require', 'cleanUrlTracker');
    ga('require', 'impressionTracker');
    ga('require', 'mediaQueryTracker');
    ga('require', 'outboundFormTracker');
    ga('require', 'outboundLinkTracker');
    ga('require', 'pageVisibilityTracker');
    ga('require', 'socialWidgetTracker');
    ga('require', 'urlChangeTracker');
    return scriptJS('https://www.google-analytics.com/analytics.js');
    */
  }

  static loadFB(env) {
    // https://developers.facebook.com/docs/plugins/like-button
    // return scriptJS('https://connect.facebook.net/en_US/sdk.js');
  }

  static loadTwitter(env) {
    // https://dev.twitter.com/web/tweet-button
    //  return scriptJS('https://platform.twitter.com/widgets.js');
  }

  static loadPinterest(env) {
    // https://developers.pinterest.com/docs/sdks/js/
    // return scriptJS('https://assets.pinterest.com/js/pinit.js');
  }

  static loadGoogleApi(env) {
    // https://developers.google.com/+/web/+1button/
    // return scriptJS('https://apis.google.com/js/client:platform.js');
  }

  static loadGoogleTag(env) {
    // https://support.google.com/dfp_premium/answer/1638622?hl=en
    // return scriptJS('https://www.googletagservices.com/tag/js/gpt.js');
  }

  static fbTracking(env) {
    /*
    // https://www.facebook.com/ads/manager/pixel/facebook_pixel/?act=1375631352670761&pid=p1
    if (window.fbq) {
      return false;
    }
    window.fbq = function () {
      window.fbq.callMethod ?
        window.fbq.callMethod.apply(window.fbq, arguments) : window.fbq.queue.push(arguments);
    };

    if (!window._fbq) {
      window._fbq = window.fbq;
    }
    window.fbq.push = window.fbq;
    window.fbq.loaded = !0;
    window.fbq.version = '2.0';
    window.fbq.queue = [];


    window.fbq('init', '');
    window.fbq('track', 'PageView');

    return scriptJS('https://connect.facebook.net/en_US/fbevents.js');
    */
  }

  static setThirdPartyGlobals(env) {
    window.ga =
      window.ga ||
      function() {
        (ga.q = ga.q || []).push(arguments);
      };

    window.fbAsyncInit = function facebookInitialized() {
      FB.init({
        appId: '',
        xfbml: true,
        version: 'v2.7'
      });
    };

    window.twttr = window.twttr || {};

    window.___gcfg = {
      lang: 'en',
      parsetags: 'explicit'
    };

    window.googletag = window.googletag || {};
    window.googletag.cmd = window.googletag.cmd || [];

    window.amzn_ps_tracking_id = '';
    window.amzn_ps_instance_id = '';
  }

  static loadAdSense(env) {
    (window.adsbygoogle = window.adsbygoogle || []).push({
      google_ad_client: '',
      enable_page_level_ads: true
    });
    // return scriptJS('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
  }

  static loadSentry(env) {
    /*
    if(env !== 'development') {
      return scriptJS('https://cdn.ravenjs.com/3.7.0/raven.min.js', function configureRaven() {
        window.Raven
          .config('')
          .install();
      });
    }
    */
  }

  static loadAmazonAdSystem(env) {
    // return scriptJS('https://ps-us.amazon-adsystem.com/scripts/US/studio.js');
  }
}

export function loadAllThirdPartyJs(env) {
  return P.all([
    // ThirdPartyJs.loadAdSense(env),
    // ThirdPartyJs.loadGA(env),
    // ThirdPartyJs.loadFB(env),
    // ThirdPartyJs.loadTwitter(env),
    // ThirdPartyJs.loadPinterest(env),
    // ThirdPartyJs.loadGoogleApi(env),
    // ThirdPartyJs.loadGoogleTag(env),
    // ThirdPartyJs.fbTracking(env),
    // ThirdPartyJs.loadDisqus(env),
    // ThirdPartyJs.loadSentry(env),
    // ThirdPartyJs.loadAmazonAdSystem(env)
  ]);
}

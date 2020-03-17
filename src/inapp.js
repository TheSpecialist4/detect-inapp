const findKey = require('lodash/findKey');

const BROWSER = {
  messenger: /\bFB[\w_]+\/(Messenger|MESSENGER)/,
  facebook: /\bFB[\w_]+\//,
  twitter: /\bTwitter/i,
  line: /\bLine\//i,
  wechat: /\bMicroMessenger\//i,
  puffin: /\bPuffin/i,
  miui: /\bMiuiBrowser\//i,
  instagram: /\bInstagram/i,
  chrome: /\bCrMo\b|CriOS|Android.*Chrome\/[.0-9]* (Mobile)?/,
  safari: /Version.*Mobile.*Safari|Safari.*Mobile|MobileSafari/,
  ie: /IEMobile|MSIEMobile/,
  firefox: /fennec|firefox.*maemo|(Mobile|Tablet).*Firefox|Firefox.*Mobile|FxiOS/,
  gsa: /(?:GSA)\/([0-9]+)\./i,
};

class InApp {

  ua = '';

  constructor(useragent) {
    this.ua = useragent;
  }

  get browser(): string {
    return findKey(BROWSER, regex => regex.test(this.ua)) || 'other';
  }

  get isMobile(): boolean {
    return /(iPad|iPhone|Android|Mobile)/i.test(this.ua) || false;
  }

  get isDesktop(): boolean {
    return !this.isMobile;
  }

  get isInApp(): boolean {
    const rules = [
      'WebView',
      '(iPhone|iPod|iPad)(?!.*Safari\/)',
      'Android.*(wv|\.0\.0\.0)',
      '(?:GSA)\/([0-9]+)\.',
    ];
    const regex = new RegExp(`(${rules.join('|')})`, 'ig');
    console.log('matching!!');
    return Boolean(this.ua.match(regex));
  }
}

module.exports = InApp;

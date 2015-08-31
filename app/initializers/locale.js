import Ember from 'ember';
import ENV from 'hiperkocka/config/environment';

var LocaleInitializer = {

  name: 'locale',

  initialize: function(registry, application) {
    var locale = localStorage.locale || ENV.APP.defaultLocale;
    Ember.set(application, 'locale', locale);
    moment.locale(locale);
  }
};

export default LocaleInitializer;
import Ember from 'ember';
import ENV from 'nak-ui/config/environment';
import getLocales from 'ember-cli-i18n-locales/utils/get-locales';

var LocaleItemComponent = Ember.Component.extend({

  tagName: 'li',

  layoutName: 'locale-item',

  classNameBindings: ['isCurrent'],

  isCurrent: function() {
    return this.get('locale') === (localStorage.locale || ENV.APP.defaultLocale);
  }.property('locale'),

  countryFlagCode: function() {
    var locale = this.get('locale');
    if(locale === 'en') {
      return 'gb';
    }
    return locale;
  }.property('locale'),

  click: function() {
    this.send('changeLang');
  },

  actions: {
    changeLang: function() {
      var locale = this.get('locale');
      if(!getLocales().contains(locale)) {
        locale = ENV.APP.defaultLocale;
      }
      localStorage.locale = locale;
      window.location.reload();
    }
  }

});

export default LocaleItemComponent;
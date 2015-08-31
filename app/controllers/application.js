import Ember from 'ember';
import getLocales from 'ember-cli-i18n-locales/utils/get-locales';
import ENV from 'hiperkocka/config/environment';

var ApplicationController = Ember.Controller.extend({

  locales: function() {
    return getLocales();
  }.property(),

  now: moment(),

  backThen: moment('1987-12-26'),

  actions: {

    logoff: function() {
      console.log('logoff');
    }

  }

});

export default ApplicationController;
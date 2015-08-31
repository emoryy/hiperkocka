import Ember from 'ember';
import ENV from 'hiperkocka/config/environment';
import AuthenticatorBase from 'simple-auth/authenticators/base';
import { raw } from 'ic-ajax';
import { request } from 'ic-ajax';
import { getMessagesFrom } from 'hiperkocka/utils/message-utils';

var Authenticator = AuthenticatorBase.extend({

  authEndpoint: ENV['simple-auth'].authEndpoint,

  restore: function(credentials) {
    var _this = this;

    return new Ember.RSVP.Promise(function(resolve, reject) {

      if (!Ember.isEmpty(credentials.token)) {
        resolve(credentials);
        // raw({
        //   url:  _this.get('authEndpoint'),
        //   type: 'POST',
        //   data: JSON.stringify({
        //     secretId: credentials.token
        //   }),
        //   headers: {
        //     "X-Auth-Token": credentials.token
        //   },
        //   dataType: "text"
        // }).then(function(result) { // {response, textStatus, jqXHR}
        //   Ember.Logger.debug('AUTH: restore success, result:', result);
        //   resolve(credentials);
        // }, function(response) {
        //   Ember.Logger.debug('AUTH: restore fail, response:', response);
        //   reject(getMessagesFrom(response.jqXHR));
        // });
      } else {
        reject();
      }
    });

  },

  authenticate: function(credentials) {
    var _this = this;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      raw({
        url:  _this.get('authEndpoint'),
        type: 'POST',
        data: JSON.stringify(credentials),
      }).then(function(result) { // {response, textStatus, jqXHR}
        Ember.run(function() {
          Ember.Logger.debug('AUTH: authenticate success, jqXhr:', result.jqXHR);
          resolve({
            token: result.jqXHR.getResponseHeader('X-Auth-Token'),
            userName: credentials.userName
          });
        });
      }, function(response) {
        Ember.run(function() {
          Ember.Logger.debug('AUTH: authenticate fail, response:', response);
          reject(getMessagesFrom(response.jqXHR));
        });
      });
    });
  },

  invalidate: function() {
    var _this = this;

    return new Ember.RSVP.Promise(function(resolve) {
      Ember.$.ajax({
        url:  _this.get('authEndpoint'),
        type: 'DELETE'
      }).always(function() {
        resolve();
      });
    });
  }

});

export default Authenticator;
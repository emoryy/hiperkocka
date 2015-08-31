import Ember from 'ember';
import AuthorizerBase from 'simple-auth/authorizers/base';

var Authorizer = AuthorizerBase.extend({

  authorize: function(jqXHR, requestOptions) {
    if(!this.get('session.isAuthenticated')) {
      return;
    }

    var token = this.get('session.secure.token');
    if(!Ember.isEmpty(token)) {
      jqXHR.setRequestHeader('X-Auth-Token', token);
    }
  }

});

export default Authorizer;
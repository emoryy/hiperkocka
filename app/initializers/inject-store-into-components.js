import Ember from 'ember';
import ENV from 'hiperkocka/config/environment';

export default {

  name: 'inject-store-into-components',
  after: 'store',

  initialize: function(registry, application) {
    application.inject('component', 'store', 'store:main');
  }
};
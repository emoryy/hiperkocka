import Ember from 'ember';
import ENV from 'hiperkocka/config/environment';
import CodeTables from 'hiperkocka/code-tables';

export default {

  name: 'inject-store-into-components',
  after: 'store',

  initialize: function(registry, application) {
    application.inject('component', 'store', 'store:main');
  }
};
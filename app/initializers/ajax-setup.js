import Ember from 'ember';
import ENV from 'hiperkocka/config/environment';

var AjaxInitializer = {

  name: 'ajax-setup',

  initialize: function(registry, application) {
    Ember.$.ajaxSetup({
      dataType: 'json',
      contentType: 'application/json'
    });
  }

};

export default AjaxInitializer;
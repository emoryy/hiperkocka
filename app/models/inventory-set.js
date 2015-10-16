import Ember from 'ember';
import DS from 'ember-data';
import { request } from 'ic-ajax';
import ENV from 'hiperkocka/config/environment';
import SimpleSet from 'hiperkocka/models/simple-set';

export default DS.Model.extend({

  setId: DS.attr(),

  set: function() {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      request(
        ENV.APP.REBR_API_BASE + 'get_set', {
          data: {
            key: ENV.APP.REBR_API_KEY,
            format: 'json',
            set_id: this.get('setId')
          }
        }
      ).then(function(result) {
        console.log(result.get('firstObject'));

        resolve(SimpleSet.create(result.get('firstObject')));
      });
    }.bind(this));
  }.property('setId'),

  parts: DS.hasMany('part-of-set', { async: true, dependent: 'destroy' }),

  missingTypes: function() {
    var parts = this.get('parts');
    var retVal = 0;
    parts.forEach(function(part) {
      if(part.get('quantity') !== part.get('quantityHave')) {
        retVal++;
      }
    });
    return retVal;
  }.property('parts.@each.quantityHave', 'parts.@each.quantity'),

  missingQuantity: function() {
    var parts = this.get('parts');
    var retVal = 0;
    parts.forEach(function(part) {
      retVal += (part.get('quantity') - part.get('quantityHave'));
    });
    return retVal;
  }.property('parts.@each.quantityHave', 'parts.@each.quantity'),

});
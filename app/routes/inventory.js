import Ember from 'ember';
import { request } from 'ic-ajax';
import ENV from 'hiperkocka/config/environment';
import Part from 'hiperkocka/models/part';

export default Ember.Route.extend({

  model: function(params) {
    var _this = this;
    console.log('setId is: ' + params.id);
    return new Ember.RSVP.Promise(function(resolve, reject) {
      _this.store.find('inventory-set').then(function(sets) {
        var inventorySet = sets.findBy('setId', params.id);
        if(inventorySet) {
          console.log('found InventorySet');
          console.log(inventorySet);
          resolve(inventorySet);
        } else {
          request(
            ENV.APP.REBR_API_BASE + 'get_set_parts', {
              data: {
                key: ENV.APP.REBR_API_KEY,
                format: 'json',
                set: params.id
              }
            }
          ).then(function(result) {
            var data = result[0];
            console.log('creating InventorySet');
            var partModels = data.parts.map(function(part) {
              return _this.store.createRecord('part-of-set', {
                partId: part.part_id,
                quantityHave: 0,
                partData: part
              });
            });
            var newInventorySet = _this.store.createRecord('inventory-set', {
              setId: params.id,
              parts: partModels
            });
            console.log(newInventorySet);
            resolve(newInventorySet);

          }, function(error) {
            // request error
            reject(error);
          });
        }
      }, function(error) {
        reject(error);
        // not found
      });
    });
  },

  actions: {

  }
});
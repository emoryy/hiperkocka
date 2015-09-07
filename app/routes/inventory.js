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
            var saveNewPart = function(partData) {
              var part = _this.store.createRecord('part', {
                id: partData.part_id+"C"+partData.ldraw_color_id,
                // element_id: partData.element_id,
                part_id: partData.part_id,
                ldraw_color_id: partData.ldraw_color_id,
                type: partData.type,
                part_name: partData.part_name,
                color_name: partData.color_name,
                part_img_url: partData.part_img_url,
                element_img_url: partData.element_img_url,
              });
              part.save();
              return part;
            };
            _this.store.find('part').then(function(parts){
              var savedPartsIndex = localStorage['index-parts'];
              var indexExists = !!savedPartsIndex;
              var partModels = data.parts.map(function(partData) {
                var partKey = partData.part_id+"C"+partData.ldraw_color_id;

                var quantity = Number.parseInt(partData.qty);
                var part;
                if(!indexExists || savedPartsIndex.indexOf(partKey) === -1) {
                  part = saveNewPart(partData);
                } else {
                  part = parts.findBy('id', partKey);
                  // part = _this.store.find('part', partKey );
                }
                return _this.store.createRecord('part-of-set', {
                  quantityHave: 0,
                  quantity: quantity,
                  part: part
                });
              });

              console.log('creating InventorySet');

              var newInventorySet = _this.store.createRecord('inventory-set', {
                setId: params.id,
                parts: partModels
              });
              console.log(newInventorySet);
              resolve(newInventorySet);
            });

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
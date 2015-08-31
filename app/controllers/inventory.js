import Ember from 'ember';

export default Ember.Controller.extend({

  isDirty: function() {
    var model = this.get('model');
    return model.hasDirtyAttributes || model.get('parts').findBy('hasDirtyAttributes').get('length') > 0;
  }.property('model.hasDirtyAttributes', 'model.parts.@each.hasDirtyAttributes'),

  viewMode: 'normal',

  parts: function() {
    if(this.get('missingOnly')) {
      return this.get('model.parts').filter(function(part) {
        return part.get('quantityHave') < part.get('partData.qty');
      });
    } else {
      return this.get('model.parts');
    }
  }.property('missingOnly', 'model.parts.@each.quantityHave'),

  actions: {

    save: function() {
      this.get('model.parts').forEach(function(part) {
        part.save();
      });
      this.get('model').save();
    },

    changePartQuantity: function(part, quantity) {
      part.set('quantityHave', quantity);
    },

    changePartQuantityDelta: function(part, delta) {
      var quantityHave = part.get('quantityHave');
      var quantity = part.get('partData.qty');
      var newQuantity = quantityHave + delta;
      if( newQuantity >= 0 && newQuantity <= quantity) {
        part.set('quantityHave', newQuantity);
      }
    },

    setViewMode: function(mode) {
      this.set('viewMode', mode);
    },

    toggleMissing: function() {
      this.toggleProperty('missingOnly');
    }

  }

});
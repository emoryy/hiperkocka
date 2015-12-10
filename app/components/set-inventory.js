import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ["set-inventory-component"],

  viewMode: 'normal',
  isViewModeNormal: Em.computed.equal('viewMode', 'normal'),

  parts: function() {
    if(this.get('missingOnly')) {
      return this.get('model.parts').filter(function(part) {
        return part.get('quantityHave') < part.get('quantity');
      });
    } else {
      return this.get('model.parts');
    }
  }.property('missingOnly', 'model.parts.@each.quantityHave'),

  actions: {

    save: function() {
      this.set('isSaving', true);
      this.set('done', 0);
      var promises = [];
      this.get('model.parts').forEach(function(part) {
        var partSave = part.save();
        partSave.then(function() {
          this.set('done', this.get('done')+1);
        }.bind(this));
        promises.pushObject(partSave);
      }.bind(this));
      promises.pushObject(this.get('model').save());
      Ember.RSVP.all(promises).then(function() {
        this.set('isSaving', false);
      }.bind(this));
    },

    changePartQuantity: function(part, quantity) {
      part.set('quantityHave', quantity);
    },

    changePartQuantityDelta: function(part, delta) {
      var quantityHave = Number.parseInt(part.get('quantityHave'));
      var quantity = Number.parseInt(part.get('quantity'));
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
    },

    toggleQuantity: function() {
      this.toggleProperty('missingQuantity');
    },

    activateInput: function(part) {
      var input = Ember.$('.'+part.get('id'));
      input.select();
      input.focus();
    }

  }

});
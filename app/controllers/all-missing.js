import Ember from 'ember';

export default Ember.Controller.extend({


  viewMode: 'compact',
  isViewModeNormal: Em.computed.equal('viewMode', 'normal'),

  actions: {


    setViewMode: function(mode) {
      this.set('viewMode', mode);
    },

    toggleMissing: function() {
      this.toggleProperty('missingOnly');
    },

    toggleQuantity: function() {
      this.toggleProperty('missingQuantity');
    },

  }

});
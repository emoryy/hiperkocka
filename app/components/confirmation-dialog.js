import Ember from 'ember';

var ConfirmationComponent = Ember.Component.extend({

  isShowingModal: false,

  titleIcon: "question-circle",
  titleText: "",
  bodyText: "",
  declineText: "Mégsem",
  confirmText: "Igen",

  triggerElement: function() {
    return this.$('.trigger');
  }.property(),

  actions: {

    toggleModal: function() {
      this.toggleProperty('isShowingModal');
    },

    confirm: function() {
      this.set('value', true);
      this.sendAction('confirmActionName', this.get('confirmParam'));
      this.set('isShowingModal', false);
    },

    decline: function() {
      this.set('value', false);
      if(this.get('declineActionName')){
        this.sendAction('declineActionName', this.get('declineParam'));
      }
      this.set('isShowingModal', false);
    }

  }

});

export default ConfirmationComponent;
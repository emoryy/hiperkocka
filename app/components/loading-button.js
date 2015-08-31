import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  buttonText: "Save",
  loadingText: "Loading...",
  isLoading: false,

  classNameBindings: ['disabled:btn-inactive'],

  click: function() {
    if(this.get('isLoading') || this.get('disabled')) {
      return;
    }
    this.sendAction('action');
  }

});
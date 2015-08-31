import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['checkbox-toggle'],
  classNameBindings: ['value:on:off', 'disabled:disabled'],

  iconOn: "check-square",
  iconOff: "square-o",

  click: function() {
    if(!this.get('disabled')) {
      this.toggleProperty('value');
    }
  }

});
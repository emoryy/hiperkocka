import Ember from 'ember';

export default Ember.Component.extend({

  type: 'text',

  tooltipText: '',

  format: 'YYYY.MM.DD.',

  isTextarea: Ember.computed.equal('type', 'textarea'),
  isDatetime: Ember.computed.equal('type', 'datetime'),
  isCheckbox: Ember.computed.equal('type', 'checkbox')

});
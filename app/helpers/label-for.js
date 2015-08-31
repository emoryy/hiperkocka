import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(value, tableName, ct, options) {
  return ct.labelFor(tableName, value);
});
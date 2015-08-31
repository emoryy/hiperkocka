import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(value, suffix) {
  if (Em.isEmpty(value)) { return " "; }
  var numOfDecimals = 2;
  var separator = " ";
  suffix = suffix.constructor === String ? " " + suffix : "";
  return value.toFixed(numOfDecimals).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + separator) + suffix;
});

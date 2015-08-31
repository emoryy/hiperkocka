import Ember from 'ember';

// tests if the value is falsy
export default Ember.Helper.helper(function([value]) {
  return !value;
});
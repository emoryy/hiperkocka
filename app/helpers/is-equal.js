import Ember from 'ember';
// tests if the two values are equal
export default Ember.Helper.helper(function([lhs, rhs]) {
  return lhs === rhs;
});

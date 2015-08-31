import Ember from 'ember';

export function extraAttr(storageAttrName) {
  return Ember.computed(storageAttrName, {
    get: function(key) {
      return JSON.parse(this.get(storageAttrName) || '{}')[key];
    },
    set: function(key, value) {
      var hash = JSON.parse(this.get(storageAttrName) || '{}');
      hash[key] = value;
      this.set(storageAttrName, JSON.stringify(hash));
      return value;
    }
  });
}
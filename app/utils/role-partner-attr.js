import Ember from 'ember';

export function rolePartnerAttr() {
  return Ember.computed('roles.@each', {
    get: function(key) {
      var role = this.get('roles').findBy('roleType', key.toUpperCase());
      if(role) {
        return role.get('partner');
      }
      return null;
    },
    set: function(key, value) {
      var role = this.get('roles').findBy('roleType', key.toUpperCase());
      if(!role) {
        role = this.store.createRecord('mars-role', {
          roleType: key.toUpperCase()
        });
        this.get('roles').pushObject(role);
      }
      role.set('partner', value);
      return value;
    }
  });
}

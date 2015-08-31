import DS from 'ember-data';

export default DS.Model.extend({

  setId: DS.attr(),

  parts: DS.hasMany('part-of-set', { async: true, dependent: 'destroy' })

});
import DS from 'ember-data';

export default DS.Model.extend({

  partId: DS.attr(),
  quantityHave: DS.attr(),
  partData: DS.attr(),

  inventorySet: DS.belongsTo('inventory-set'),

  needed: function() {
    return this.get('partData.qty') - this.get('quantityHave');
  }.property('partData.qty', 'quantityHave'),

  hasNoImage: Em.computed.equal('partData.part_img_url', '//img.rebrickable.com/img/ni.png')

});
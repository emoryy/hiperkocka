import DS from 'ember-data';

export default DS.Model.extend({

  partId: DS.attr(),
  quantityHave: DS.attr(),
  quantity: DS.attr(),
  partData: DS.attr(),
  part: DS.belongsTo('part', { async: true }),


  inventorySet: DS.belongsTo('inventory-set', { async: true }),

  needed: function() {
    return this.get('part.quantity') - this.get('quantityHave');
  }.property('quantity', 'quantityHave'),

  quantityStatus: function() {
    var quantityHave = this.get('quantityHave');
    if(quantityHave === 0) {
      return 'none';
    }
    if(quantityHave === this.get('quantity')) {
      return 'all';
    }
    return 'partial';
  }.property('quantity', 'quantityHave'),

  hasNoImage: Em.computed.equal('part.part_img_url', '//img.rebrickable.com/img/ni.png')

});
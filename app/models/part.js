import DS from 'ember-data';
import Ember from 'ember';

var Part = DS.Model.extend({

  part_id: DS.attr(),
  ldraw_color_id: DS.attr(),
  type: DS.attr(),
  part_name: DS.attr(),
  color_name: DS.attr(),
  part_img_url: DS.attr(),
  element_id: DS.attr(),
  element_img_url: DS.attr(),

  dimensions: function() {
    var matched = (this.get('part_name')||" ").match(/((\d+(\/\d+)? (x|-) )+\d+(\/\d+)?|\d+L|Axle \d+)/g);
    return matched ? matched[0].replace(/ /g,'').replace(/Axle/g,'') : '';
  }.property('part_name')

});

export default Part;
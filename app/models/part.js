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

});

export default Part;
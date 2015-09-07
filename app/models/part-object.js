import DS from 'ember-data';
import Ember from 'ember';

var Part = Ember.Object.extend({

  part_id: '',
  qty: '',
  ldraw_color_id: '',
  type: '',
  part_name: '',
  color_name: '',
  part_img_url: '',
  element_id: '',
  element_img_url: ''

});

export default Part;
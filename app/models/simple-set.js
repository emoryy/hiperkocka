import DS from "ember-data";
import Ember from 'ember';

var SimpleSet = Ember.Object.extend({

  accessory: '',
  descr: '',
  img_big: '',
  img_sm: '',
  img_tn: '',
  kit: '',
  pieces: '',
  set_id: '',
  theme1: '',
  theme2: '',
  theme3: '',
  url: '',
  year: '',

  imageURL: function() {
    return "http://images.brickset.com/sets/images/%@.jpg".fmt(this.get('set_id'));
  }.property('set_id'),

});

export default SimpleSet;
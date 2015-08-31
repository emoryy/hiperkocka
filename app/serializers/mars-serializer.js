import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {

  serialize: function(record, options) {
    var json = this._super.apply(this, arguments); // Get default serialization
    if(record.id) {
      json.id = record.id;  // tack on the id
    }
    return json;
  },

});
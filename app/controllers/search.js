import Ember from 'ember';
import { request } from 'ic-ajax';
import ENV from 'hiperkocka/config/environment';
import SimpleSet from 'hiperkocka/models/simple-set';

var SearchController = Ember.ArrayController.extend({

  searchTerm: "",

  searchTermObserver: function() {
    Ember.run.debounce(this, this.search, 1000);
  }.observes('searchTerm'),

  search: function() {
    var _this = this;
    var searchTerm = this.get('searchTerm');
    var terms = searchTerm.split(',');
    console.log('searching');

    this.set('model', Ember.A());
    terms.forEach(function(term) {
      request(
        ENV.APP.REBR_API_BASE + 'search', {
          data: {
            key: ENV.APP.REBR_API_KEY,
            format: 'json',
            type: 'S',
            query: term
          }
        }
      ).then(function(result){
        _this.get('model').pushObjects(result.results.map(function(resultItem) {
          return SimpleSet.create(resultItem);
        }));
      });
    });
  },

  actions: {
  }
});

export default SearchController;
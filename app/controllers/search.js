import Ember from 'ember';
import { request } from 'ic-ajax';
import ENV from 'hiperkocka/config/environment';
import SimpleSet from 'hiperkocka/models/simple-set';

var SearchController = Ember.ArrayController.extend({

  searchTerm: "",

  searchTermObserver: function() {
    Ember.run.debounce(this, this.search, 1000);
  }.observes('searchTerm'),

  info: 'searching...',

  search: function() {
    var _this = this;
    var searchTerm = this.get('searchTerm');
    this.set('model', Ember.A());

    if(Ember.isEmpty(searchTerm)) {
      return;
    }
    var terms = searchTerm.split(',');
    this.set('isLoading', true);
    var promises = [];
    terms.forEach(function(term) {
      var search = request(
        ENV.APP.REBR_API_BASE + 'search', {
          data: {
            key: ENV.APP.REBR_API_KEY,
            format: 'json',
            type: 'S',
            query: term
          }
        }
      );
      promises.pushObject(search);
      search.then(function(result){
        _this.get('model').pushObjects(result.results.map(function(resultItem) {
          return SimpleSet.create(resultItem);
        }));
      });
    });

    Ember.RSVP.all(promises).then(function() {
      _this.set('isLoading', false);
    });
  },

  actions: {
  }
});

export default SearchController;
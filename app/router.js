import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {

  this.resource('search', { path: "search" }, function() {
  });
  this.resource('inventory', { path: "inventory/:id" }, function() {
  });
  this.resource('collection', { path: "collection" }, function() {
  });

});

export default Router;

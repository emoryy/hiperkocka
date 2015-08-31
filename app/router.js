import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {

  this.resource('search', { path: "kereses" }, function() {
  });
  this.resource('inventory', { path: "elemlista/:id" }, function() {
  });

});

export default Router;

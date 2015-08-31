import Ember from 'ember';
// import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend({
  beforeModel: function(transition) {
    this._super(transition);
  },

  actions: {

    logout: function() {
      // this.transitionTo('index');
      this.get('session').invalidate();
    },

    transitionAndScrollToTop: function(routeName) {
      this.transitionTo(routeName);
      Ember.$("html, body").animate({ scrollTop: 0 }, 500);
    },

    transitionTo: function(routeName, model) {
      this.transitionTo(routeName, model);
      Ember.$("html, body").animate({ scrollTop: 0 }, 500);
    }

  }
});
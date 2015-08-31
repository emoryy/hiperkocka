import Ember from 'ember';
import OnScroll from 'nak-ui/mixins/on-scroll';

var MessagesComponent = Ember.Component.extend(OnScroll, {

  classNames: ["messages"],

  messages: [],

  offset: 75,

  dockedObserver: function() {
    if(this.get('docked')) {
      this.$().addClass('docked');
    } else {
      this.$().removeClass('docked');
    }
  }.observes('docked'),

  scrolled: function() {
    var offset = this.get('offset');
    if (Ember.$(window).scrollTop() >= Ember.$(document).height() - Ember.$(window).height() - offset) {
      this.set('docked', true);
    } else {
      this.set('docked', false);
    }
  },

  actions: {

    clearMessages: function() {
      this.get('messages').forEach(function(message) {
        this.send('close', message);
      }.bind(this));
    },

    close: function(message) {
      var uuid = message.get('uuid');
      var elem = Ember.$('#'+uuid);
      elem.removeClass('fadeSInRight');
      elem.addClass('lightSpeedOut');
      elem.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        this.get('messages').removeObject(message);
      }.bind(this));
    }

  }

});

export default MessagesComponent;
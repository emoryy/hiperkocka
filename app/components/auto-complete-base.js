/*
 * https://github.com/toranb/ember-cli-auto-complete
 */

import Ember from "ember";

var htmlSafe = Ember.String.htmlSafe;

export default Ember.Component.extend({

  layoutName: "components/auto-complete-base",

  focusOutEvent: null,

  highlightIndex: -1,

  escapedChars: [40, 38, 13],

  visibility: "display:none;",

  suggestionsVisible: false,

  inputClass: '',

  inputClazz: Ember.computed(function() {
    return "typeahead text-input " + this.get('inputClass');
  }),

  suggestionsVisibleObserver: function() {
    if(!this.get('suggestionsVisible')) {
      this.set('highlightIndex', -1);
      this.set('selectableSuggestion', null);
      this.get('suggestions').forEach(function(suggestion) {
        Ember.set(suggestion, 'highlight', false);
      });
    }

  }.observes('suggestionsVisible'),

  keyUp: function(event) {
    if(event.keyCode === 27) {
      this.set("suggestionsVisible", false);
    } else if(this.escapedChars.indexOf(event.keyCode) === -1){
      this.set("suggestionsVisible", true);
      this.set("inputVal", Ember.$(event.target).val());
    }
  },

  focusIn: function() {
    if(!this.get('suggestionsVisible')) {
      this.set('suggestionsVisible', true);
    }
  },

  focusOut: function() {
    clearTimeout(this.get('focusOutEvent'));
    var self = this;
    var func = function() {
      if(self.isDestroyed) {
        return;
      }
      self.set("suggestionsVisible", false);
      if(!self.get("selectedFromList")) {
        var value = this.get("selectedValue");
        var optionsToMatch = this.get("optionsToMatch");
        if (optionsToMatch && optionsToMatch.indexOf(value) === -1) {
          self.set("inputVal", "");
          self.set("selectedValue", "");
        }
      }
    };
    this.set('focusOutEvent', Ember.run.later(this, func, 200));
  },

  keyDown: function(event) {
    if(this.get("suggestionsVisible")) {
      if (event.keyCode === 40) {
        this.highlight("down");
      } else if(event.keyCode === 38) {
        this.highlight("up");
      } else if(event.keyCode === 13 || event.keyCode === 9) {
        if(!Ember.isBlank(this.selectableSuggestion)) {
          this.send("selectItem", this.selectableSuggestion);
          this.set("suggestionsVisible", false);
        } else {
          var value = this.get("selectedValue");
          var optionsToMatch = this.get("optionsToMatch");
          if (optionsToMatch && optionsToMatch.indexOf(value) >= 0) {
            this.set("selectedFromList", true);
            this.set("suggestionsVisible", false);
          }
        }
      }
    } else {
      this.set("suggestionsVisible", true);
      if (event.keyCode === 40) {
        this.highlight("down");
      }
    }
  },

  highlight: function(direction) {
    var suggestions = this.get('suggestions');
    var delta = direction === "down" ? 1 : -1;
    var highlightIndex = this.get('highlightIndex');
    var newHighlightIndex = highlightIndex + delta;
    if(newHighlightIndex < 0) {
      newHighlightIndex = 0;
    }
    if(newHighlightIndex > suggestions.length - 1) {
      newHighlightIndex = suggestions.length - 1;
    }
    var currentResult = suggestions.objectAt(highlightIndex);
    if(currentResult) {
      Ember.set(currentResult, 'highlight', false);
    }
    var nextResult = suggestions.objectAt(newHighlightIndex);
    Ember.set(nextResult, 'highlight', true);
    this.set('selectableSuggestion', nextResult);
    this.set('highlightIndex', newHighlightIndex);
  },

  actions: {
    selectItem: function(item){
      var valueProperty = this.get("valueProperty");
      this.set("selectedFromList", true);
      this.set("selectedValue", Ember.get(item, valueProperty));

      this.sendAction('selectItem', item);
    }
  }

});

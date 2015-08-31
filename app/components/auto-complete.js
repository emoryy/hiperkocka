import AutoComplete from "nak-ui/components/auto-complete-base";
import Ember from 'ember';

export default AutoComplete.extend({

  valueProperty: "label",

  suggestions: function() {
    var inputVal = this.get("inputVal") || "";
    return this.get("options").filter(function(item) {
      return Ember.get(item, "label").toLowerCase().indexOf(inputVal.toLowerCase()) > -1;
    });
  }.property("inputVal", "options.@each"),

  // optionsToMatch: function() {
  //   var caseInsensitiveOptions = [];
  //   this.get("options").forEach(function(item) {
  //     var value = Ember.get(item, "value");
  //     caseInsensitiveOptions.push(value);
  //     caseInsensitiveOptions.push(value.toLowerCase());
  //   });
  //   return caseInsensitiveOptions;
  // }.property("options.@each")

});
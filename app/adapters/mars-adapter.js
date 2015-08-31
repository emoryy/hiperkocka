import DS from 'ember-data';
import ENV from 'hiperkocka/config/environment';
import Ember from 'ember';

export default DS.RESTAdapter.extend({
  host: ENV.APP.MARS_HOST,

  /**
     Called by the store in order to fetch a JSON array for
     the records that match a particular query.
     The `findQuery` method makes an Ajax (HTTP GET) request to a URL computed by `buildURL`, and returns a
     promise for the resulting payload.
     The `query` argument is a simple JavaScript object that will be passed directly
     to the server as parameters.
     @private
     @method query
     @param {DS.Store} store
     @param {DS.Model} type
     @param {Object} query
     @return {Promise} promise
   */
  query: function(store, type, query) {
    var url = this._buildURL(type.modelName, 'search');
    return this.ajax(url, 'POST', { data: query });
  },

  marsNormalizeErrorResponse: function (status, headers, payload) {
    if (payload && typeof payload === "object") {
      if(payload.errors) {
        return payload.errors;
      }
      var errors = [];
      Object.keys(payload).forEach(function(key){
        var prop = payload[key];
        if(prop.meta && prop.meta.validationResult.messages) {
          errors.pushObjects(prop.meta.validationResult.messages.map(function(message) {
            return {
              status: message.level === "ERROR" ? "Hiba:" : "",
              title: message.text,
              details: message.code
            };
          }));
        }
      });
      if(errors.length) {
        return errors;
      }
    }
    return [{
      status: "" + status,
      title: "The backend responded with an error",
      details: "" + payload
    }];
  },

  handleResponse: function (status, headers, payload) {
    if (this.isSuccess(status, headers, payload)) {
      return payload;
    }
    // else if (this.isInvalid(status, headers, payload)) {
    //   return new ember$data$lib$adapters$errors$$InvalidError(payload.errors);
    // }

    var errors = this.marsNormalizeErrorResponse(status, headers, payload);

    return new DS.AdapterError(errors);
  },

});
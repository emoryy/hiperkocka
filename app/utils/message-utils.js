import Ember from 'ember';

export function getMessagesFrom(object) {

  if(object instanceof Ember.Object) {
    console.log("isEmber");
  }

  // already parsed
  if(object.errors) {
    return object.errors.map(function(error) {
      return {
        severity: 'ERROR',
        description: error.status + ' ' + error.title
      };
    });
  }

  // xhr
  if(object.responseText) {
    return JSON.parse(object.responseText).messages || [];
  }

  // xhr no responsetext
  if(object.status || object.statusText) {
    return [{
      severity: "ERROR",
      description: object.status + " " + object.statusText
    }];
  }

  // default error
  return [{
    severity: "ERROR",
    description: "unknown error"
  }];
}
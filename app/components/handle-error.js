import Ember from 'ember';
import { getMessagesFrom } from 'nak-ui/utils/message-utils';

export default Ember.Component.extend({

  actionName: 'showMessage',

  errorObserver: function() {
    var messages = getMessagesFrom(this.get('error'));
    this.sendAction('actionName', messages);
  }.observes('error')
});
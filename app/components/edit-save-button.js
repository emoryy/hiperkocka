import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  isLoading: false,
  // isEditing: false,
  // saveDisabled: false,
  editingDisabled: false,

  isEditingText: "Mentés",
  notEditingText: "Szerkesztés",
  cancelText: "Mégsem",
  loadingText: "Folyamatban...",

  cancelAction: 'cancel',
  saveAction: 'save',

  actions: {

    cancel: function() {
      this.set('isEditing', false);
      this.sendAction('cancelAction');
    },

    edit: function() {
      if(!this.get('editingDisabled')) {
        this.set('isEditing', true);
      }
    },

    save: function() {
      if(!this.get('saveDisabled') && !this.get('isSaving')) {
        this.sendAction('saveAction');
      }
    }
  }

});
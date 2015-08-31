import Ember from 'ember';

var DateTimePicker = Ember.Component.extend({

  classNames: ["datetime-picker"],

  classNameBindings:['disabled:disabled'],

  disabled: false,

  format: 'YYYY.MM.DD.',

  icons: {
    time: 'btn btn-minor btn-icon-only fa fa-clock-o',
    date: 'btn btn-minor btn-icon-only fa fa-calendar',
    up: 'btn btn-minor btn-icon-only fa fa-chevron-up',
    down: 'btn btn-minor btn-icon-only fa fa-chevron-down',
    previous: 'btn btn-minor btn-icon-only fa fa-chevron-left',
    next: 'btn btn-minor btn-icon-only fa fa-chevron-right',
    today: 'btn btn-minor btn-icon-only fa fa-dot-circle-o',
    clear: 'btn btn-minor btn-icon-only fa fa-trash-o',
    close: 'btn btn-minor btn-icon-only fa fa-times'
  },

  maxDateTodayObserver: function() {
    if(this.get('maxDateToday')) {
      this.set('maxDate', moment());
    }
  }.observes('maxDateToday')

});

export default DateTimePicker;
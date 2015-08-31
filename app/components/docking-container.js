import Ember from 'ember';
import OnScroll from 'nak-ui/mixins/on-scroll';

var DockingContainer = Ember.Component.extend(OnScroll, {

  classNames: ["docking-container"],

  top: 0, // vertical position of the dock on the screen normally
  offset: 0, // where docking begins relative to top edge of container

  docked: false,
  onlyClassChange: false,

  didInsertElement: function() {
    // var top = parseInt(this.$().css('top'), 10);
    var dockingContent = this.$('.docking-content');
    var top = dockingContent.offset().top;
    this.set('top', top);
    this._super();
  },

  dockedObserver: function() {
    // console.log('dockedObserver ' + this.get('docked'));
    var dockingContent = this.$('.docking-content');
    var offset = this.get('offset');
    var onlyClassChange = this.get('onlyClassChange');
    if(this.get('docked')) {

      // copy the height of the docked content to the outer placeholder div
      var height = dockingContent.height();
      this.$().css({height: height});

      dockingContent.addClass('docked');
      if(!onlyClassChange) {
        dockingContent.css({
          'position': 'fixed',
          'top': offset
        });
      }
    } else {
      dockingContent.removeClass('docked');
      if(!onlyClassChange) {
        dockingContent.css({
          'position': 'relative',
          'top': 0,
          // 'top': top - vPos,
        });
      }
    }
  }.observes('docked'),

  scrolled: function() {
    var top = this.get('top');
    var vPos = this.get('scrollParent').scrollTop();
    var offset = this.get('offset');

    if (vPos + offset >= top) {
      this.set('docked', true);
    } else {
      this.set('docked', false);
    }
  }

});

export default DockingContainer;
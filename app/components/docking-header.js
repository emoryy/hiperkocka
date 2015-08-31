import Ember from 'ember';
import OnScroll from 'nak-ui/mixins/on-scroll';

var DockingHeader = Ember.Component.extend(OnScroll, {

  classNames: ["docking-header-container"],

  moduleHeader: function() {
    return this.$(".module-header");
  }.property(),

  POS: 113-(36+2), // module-header - (menu item height + 2 space)

  scrolled: function() {
    var vPos = this.$().parent().scrollTop();

    var moduleHeader = this.get('moduleHeader');
    if (vPos >= this.POS) {
      moduleHeader.css({
        'position': 'fixed',
        'top': -this.POS+47, // + top menu height
      });
    } else {
      moduleHeader.css({
        'position': 'relative',
        'top': 0,
      });
    }
    moduleHeader.css({
      'background-position': '0 ' + Math.min(vPos, this.POS)+'px'
    });
  }

});

export default DockingHeader;
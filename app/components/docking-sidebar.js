import Ember from 'ember';
import OnScroll from 'nak-ui/mixins/on-scroll';

var DockingSidebar = Ember.Component.extend(OnScroll, {

  classNames: ["docking-sidebar-container"],

  sidebar: function() {
    return this.$(".sidebar");
  }.property(),

  POS: 113-38,

  scrolled: function() {
    var vPos = this.get('scrollParent').scrollTop();
    var sidebar = this.get('sidebar');
    if (vPos >= this.POS) {
      sidebar.css({
        'position': 'fixed',
        'top': -this.POS + 180,
        'left': 940
      });
    } else {
      sidebar.css({
        'position': 'absolute',
        'top': 0,
        'left': 920
      });
    }
  }

});

export default DockingSidebar;
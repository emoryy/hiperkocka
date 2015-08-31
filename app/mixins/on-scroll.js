import Ember from 'ember';

var OnScrollMixin = Ember.Mixin.create({

  scrollParent: function() {
    var scrollParentSelector = this.get('scrollParentSelector');
    return scrollParentSelector ? Ember.$(scrollParentSelector) : this.$(window);
  }.property('scrollParentSelector'),

  guid: function() {
    return Ember.guidFor(this.$()[0]);
  }.property(),

  didInsertElement: function() {
    var _this = this;
    var onScroll = _this.scrolled.bind(_this);
    var scrollParent = this.get('scrollParent');
    var guid = this.get('guid');
    scrollParent.on('touchmove.%@'.fmt(guid), onScroll);
    scrollParent.on('scroll.%@'.fmt(guid), onScroll);

    this.scrolled();
  },

  willDestroyElement: function() {
    var guid = this.get('guid');

    var scrollParent = this.get('scrollParent');
    scrollParent.off('scroll.%@'.fmt(guid));
    scrollParent.off('touchmove.%@'.fmt(guid));
  },
});

export default OnScrollMixin;